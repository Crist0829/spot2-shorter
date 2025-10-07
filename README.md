# 🚀 Proyecto Laravel - Spot Shorter

Este proyecto es una aplicación **Laravel 10 + React + Docker** que permite acortar URLs, analizarlas mediante un microservicio en Python, y recibir notificaciones en tiempo real.  
Puede ejecutarse de dos formas:  
1. **Localmente con PHP y Node.js instalados**  
2. **Usando Docker Compose** (recomendado para entornos consistentes)

---

## 📦 Requisitos previos

### Opción 1 - Entorno Local
- PHP >= 8.2  
- Composer  
- MySQL 8  
- Node.js >= 18  
- Redis (opcional, para caché o colas)  
- RabbitMQ (si usás el analizer)

### Opción 2 - Con Docker
- Docker >= 20.x  
- Docker Compose >= 1.29.x  

---

## ⚙️ Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Crist0829/spot2-shorter.git
   cd spot2-shorter
   ```

2. Copia el archivo `.env`:
   ```bash
   cp .env.example .env
   ```

3. Genera la APP_KEY:
   ```bash
   php artisan key:generate
   ```
   *(O desde el contenedor con `docker compose run --rm artisan key:generate`.)*

---

## ▶️ Correr en entorno local

1. Instala dependencias:
   ```bash
   composer install
   npm install && npm run dev
   ```

2. Configura la base de datos y corre migraciones:
   ```bash
   php artisan migrate --seed
   ```

3. Inicia el servidor:
   ```bash
   php artisan serve
   ```

👉 Accedé a `http://127.0.0.1:8000`

---

## 🐳 Correr con Docker

1. Levantá los servicios:
   ```bash
   docker compose -f docker-compose-local.yml up -d --build
   ```

   Esto levanta:
   - **Nginx** → `http://localhost`
   - **MySQL** → `localhost:3306`
   - **Redis** → `localhost:6379`
   - **RabbitMQ** → `http://localhost:15672`
   - **Analizer** → servicio Python que consume RabbitMQ
   - **Mailpit** → `http://localhost:8025`
   - **Adminer** → `http://localhost:8085`

2. Instalá dependencias dentro del contenedor:
   ```bash
   docker compose run --rm composer install
   docker compose run --rm npm install
   docker compose run --rm npm run build
   ```

3. Migraciones y seeders:
   ```bash
   docker compose run --rm artisan migrate --seed
   ```

4. Listo 🎉  
   Accedé a:
   ```
   http://localhost
   ```

---

## 🧠 Analizer (Microservicio Python)

El **Analizer** es un microservicio encargado de procesar y analizar las URLs acortadas (por ejemplo, validación, metadata, comportamiento HTTP, etc.).  
Está construido en Python y se comunica con Laravel mediante **RabbitMQ**.

### 🧩 Estructura
El servicio está en el directorio:
```
/analizer/
```

Archivo principal:
```
url_analyzer.py
```

### ⚙️ Flujo de trabajo

1. Laravel publica mensajes en la cola `url_analysis_queue` a través de RabbitMQ.  
2. El contenedor `analizer` escucha esa cola.  
3. Cuando llega una URL, el servicio Python la analiza y devuelve los resultados.  
4. Laravel recibe los resultados o los guarda en base de datos.

### 🔧 Configuración (en `docker-compose.yml`)
```yaml
analizer:
  build:
    context: ./analizer
  container_name: spot_analizer
  command: ["python", "url_analyzer.py"]
  depends_on:
    - rabbitmq
  networks:
    - spot_net
  restart: unless-stopped
```

---

## 🐇 RabbitMQ

RabbitMQ se utiliza como **broker de mensajería** para comunicar el backend Laravel con el Analizer.

### 📍 Acceso al panel
- **Desarrollo:** [https://rabbitmq-development.spot-shorter.click](https://rabbitmq-development.spot-shorter.click)  
- **Producción:** [https://rabbitmq.spot-shorter.click](https://rabbitmq.spot-shorter.click)  

### 🔑 Credenciales por defecto
```
Usuario: guest
Contraseña: guest
```

*(Podés cambiarlas en las variables de entorno o en el compose.)*

### 🧩 Variables relevantes (`.env`)
```
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
RABBITMQ_QUEUE=url_analysis_queue
```

### 🧰 Uso en Laravel
El proyecto usa una capa de servicio o job que envía mensajes a RabbitMQ, por ejemplo:

```php
RabbitMQ::publish('url_analysis_queue', [
    'url' => $shortenedUrl,
    'user_id' => auth()->id(),
]);
```

---

## 🔔 Notificaciones en tiempo real

Spot Shorter incluye un sistema de **notificaciones web en tiempo real**, usando:
- **Laravel Notifications + Broadcast**
- **Pusher** (WebSockets)
- **Laravel Echo** en el frontend React

### ⚙️ Configuración en `.env`
```
BROADCAST_DRIVER=pusher
PUSHER_APP_ID=xxxxxx
PUSHER_APP_KEY=xxxxxx
PUSHER_APP_SECRET=xxxxxx
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1
```

### 🧩 Flujo

1. Cuando ocurre un evento (ej. nueva URL analizada, mensaje, etc.), Laravel emite una notificación con:
   ```php
   Notification::send($user, new TestNotification());
   ```

2. Laravel la guarda en base de datos y la envía por **broadcast** vía Pusher.

3. El frontend escucha en tiempo real usando **Echo**:
   ```js
   window.Echo.private(`notifications.user.${userId}`)
     .listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (notification) => {
       console.log(notification)
     })
   ```

4. La UI muestra el contador de notificaciones no leídas y renderiza el listado dinámicamente.

---

## 📬 Servicios incluidos (Docker)

| Servicio  | Propósito | Puerto / URL |
|------------|------------|--------------|
| **Nginx** | Servidor web principal | http://localhost |
| **MySQL 8** | Base de datos | 3306 |
| **Redis** | Cache / Queues | 6379 |
| **RabbitMQ** | Mensajería interna | 15672 / 5672 |
| **Analizer** | Microservicio de análisis de URLs | interno |
| **Mailpit** | SMTP para testing | http://localhost:8025 |
| **Adminer** | UI de base de datos | http://localhost:8085 |

---

## 👤 Usuarios iniciales

Al ejecutar los seeders, se crean los roles y usuarios base:

| Rol | Permisos |
|------|-----------|
| **Administrador** | Gestiona usuarios y links |
| **Usuario** | Acorta URLs y visualiza métricas personales |

---

## 🧰 Comandos útiles (Docker)

```bash
# Migraciones y seeders
docker compose run --rm artisan migrate --seed

# Correr tests
docker compose run --rm artisan test

# NPM dev o build
docker compose run --rm npm run dev
docker compose run --rm npm run build
```

---

## ✅ Listo

Ya tenés tu entorno completo:
- 🖥️ Backend Laravel + React  
- 🐇 RabbitMQ  
- 🧠 Microservicio Analizer en Python  
- 🔔 Notificaciones en tiempo real  
- 🐳 Orquestado con Docker  

Podés acceder a los servicios desplegados y comenzar a trabajar 🚀