<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class Rabbit extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'App\Services\RabbitMQService';
    }
}
