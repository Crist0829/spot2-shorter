<?php

namespace Database\Factories;

use App\Models\Url;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Carbon\Carbon;

class UrlFactory extends Factory
{
    protected $model = Url::class;

    public function definition()
    {
        return [
            'url' => $this->faker->url(),
            'code' => Str::random(5),
            'user_id' => null, 
            'ip' => $this->faker->ipv4(),
            'expiration_time' => Carbon::now()->addDays(7),
            'expiration_clicks' => 5,
            'actived' => now(),
        ];
    }
}
