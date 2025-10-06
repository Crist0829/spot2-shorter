import os
import json
import time
import pika
import requests
from dotenv import load_dotenv

load_dotenv()

RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "spot_rabbitmq")
RABBITMQ_PORT = int(os.getenv("RABBITMQ_PORT", "5672"))
RABBITMQ_USER = os.getenv("RABBITMQ_USER", "guest")
RABBITMQ_PASSWORD = os.getenv("RABBITMQ_PASSWORD", "guest")
QUEUE_TO_ANALYZE = os.getenv("RABBITMQ_QUEUE_TO_ANALYZE", "urls.to_analyze")
QUEUE_RESULTS = os.getenv("RABBITMQ_QUEUE_RESULTS", "urls.analysis_result")
GOOGLE_API_KEY = os.getenv("GOOGLE_SAFE_BROWSING_API_KEY")

def check_url_with_google_safe_browsing(url, url_id):
    endpoint = f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={GOOGLE_API_KEY}"

    payload = {
        "client": {"clientId": "spot-analyzer", "clientVersion": "1.0"},
        "threatInfo": {
            "threatTypes": [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE",
                "POTENTIALLY_HARMFUL_APPLICATION"
            ],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}],
        },
    }

    try:
        response = requests.post(endpoint, json=payload, timeout=10)
        data = response.json()
        return {
            "url": url,
            "safe": "matches" not in data,
            "id" : url_id, 
            "details": data.get("matches", []),
            "error": None
        }
    except Exception as e:
        return {"url": url, id : url_id,  "safe": False, "details": [], "error": str(e)}

def connect_with_retry(max_retries=10, delay=5):
    for attempt in range(max_retries):
        try:
            print(f"[+] Intentando conectar a RabbitMQ ({attempt + 1}/{max_retries})...")
            credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASSWORD)
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    host=RABBITMQ_HOST,
                    port=RABBITMQ_PORT,
                    credentials=credentials
                )
            )
            print("Conectado exitosamente a RabbitMQ.")
            return connection
        except pika.exceptions.AMQPConnectionError:
            print(f"[!] RabbitMQ no disponible, reintentando en {delay}s...")
            time.sleep(delay)
    raise Exception("No se pudo conectar con RabbitMQ tras varios intentos")

def callback(ch, method, properties, body):
    try:
        message = json.loads(body)
        url = message.get("url")
        url_id = message.get("id")

        print(f"Analizando URL: {url}")

        result = check_url_with_google_safe_browsing(url, url_id)
        print(f"Resultado: {result}")

        ch.basic_publish(
            exchange='',
            routing_key=QUEUE_RESULTS,
            body=json.dumps(result)
        )
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        print(f"Error procesando mensaje: {e}")

def main():
    connection = connect_with_retry()
    channel = connection.channel()

    channel.queue_declare(queue=QUEUE_TO_ANALYZE, durable=True)
    channel.queue_declare(queue=QUEUE_RESULTS, durable=True)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=QUEUE_TO_ANALYZE, on_message_callback=callback)

    print(f"Esperando URLs para analizar en la cola '{QUEUE_TO_ANALYZE}'...")
    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        print("\n Finalizando analizador...")
        channel.close()
        connection.close()

if __name__ == "__main__":
    main()
