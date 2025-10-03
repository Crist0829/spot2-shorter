<?php

namespace Tests\Feature;

use App\Models\Url;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UrlControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guest_can_create_url()
    {
        $response = $this->post(route('urls.createFromGuest'), [
            'url' => 'https://google.com',
        ]);
        $response->assertRedirect();
        $this->assertDatabaseHas('urls', ['url' => 'https://google.com']);
    }

    /** @test */
    public function authenticated_user_can_create_url()
    {
        $user = User::factory()->create();
        $this->actingAs($user)->post(route('urls.create'), [
            'url' => 'https://laravel.com',
            'actived' => true,
            'expiration_clicks' => null,
            'expiration_time' => null,
        ]);
        
        $this->assertDatabaseHas('urls', ['url' => 'https://laravel.com', 'user_id' => $user->id]);
    }

    /** @test */
    public function authenticated_user_can_update_url()
    {
        $user = User::factory()->create();
        $url = Url::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user)->put(route('urls.update', $url->id), [
            'url' => 'https://symfony.com',
            'actived' => false,
            'expiration_clicks' => 5,             
            'expiration_time' => now()->addHours(2), 
        ]);

        $this->assertDatabaseHas('urls', [
            'id' => $url->id,
            'url' => 'https://symfony.com',
        ]);
    }


    /** @test */
    public function authenticated_user_can_delete_url()
    {
        $user = User::factory()->create();
        $url = Url::factory()->create(['user_id' => $user->id]);
        $this->actingAs($user)->delete(route('urls.delete', $url->id));
        $this->assertDatabaseMissing('urls', ['id' => $url->id]);
    }

    /** @test */
    public function it_redirects_valid_url()
    {
        $url = Url::factory()->create([
            'url' => 'https://google.com',
            'actived' => now(),
            'expiration_time' => now()->addDays(2),
            'expiration_clicks' => 10
        ]);

        $response = $this->get(route('urls.redirect', $url->code));

        $response->assertRedirect('https://google.com');
    }
}
