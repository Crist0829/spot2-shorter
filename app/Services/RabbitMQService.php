<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQService
{
    protected $connection;
    protected $channel;
    protected $publishQueue;
    protected $consumeQueue;

    public function __construct()
    {
        $this->connection = new AMQPStreamConnection(
            config('services.rabbitmq.host'),
            config('services.rabbitmq.port'),
            config('services.rabbitmq.user'),
            config('services.rabbitmq.password')
        );

        $this->channel = $this->connection->channel();
        $this->publishQueue = config('services.rabbitmq.queue_to_analyze');
        $this->consumeQueue = config('services.rabbitmq.queue_results');
    }

    public function publish(array $data)
    {

        $this->channel->queue_declare($this->publishQueue, false, true, false, false);
        $message = new AMQPMessage(json_encode($data), ['delivery_mode' => 2]);
        $this->channel->basic_publish($message, '', $this->publishQueue);
    }

    public function consume(callable $callback)
    {
        $this->channel->queue_declare($this->consumeQueue, false, true, false, false);

        $this->channel->basic_consume(
            $this->consumeQueue,
            '',
            false,
            false,
            false,
            false,
            function ($msg) use ($callback) {
                try {
                    $data = json_decode($msg->body, true);
                    $callback($data);
                    $msg->ack();
                } catch (\Throwable $e) {
                    Log::error('RabbitMQ consumer error: '.$e->getMessage());
                    $msg->nack(false, true); // requeue message
                }
            }
        );

        while ($this->channel->is_consuming()) {
            $this->channel->wait();
        }
    }

    public function close()
    {
        $this->channel->close();
        $this->connection->close();
    }

    public function __destruct()
    {
        $this->close();
    }
}
