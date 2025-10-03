<?php

namespace Tests\Unit;

use App\Models\Url;
use App\Models\User;
use App\Repositories\UrlRepository;
use App\Services\UrlService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class UrlServiceTest extends TestCase
{
    use RefreshDatabase;

    protected UrlService $urlService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->urlService = $this->app->make(UrlService::class);
    }

    /** @test */
    public function it_creates_a_url_for_authenticated_user()
    {
        $user = User::factory()->create();

        $data = [
            'url' => 'https://google.com',
            'actived' => true,
            'expiration_time' => Carbon::now()->addDays(2)->toDateString(),
            'user_id' => $user->id,
            'ip' => '127.0.0.1'
        ];

        $response = $this->urlService->create($data);

        $this->assertFalse($response['error']);
        $this->assertDatabaseHas('urls', [
            'url' => 'https://google.com',
            'user_id' => $user->id
        ]);
    }

    /** @test */
    public function it_updates_a_url()
    {
        $user = User::factory()->create();
        $url = Url::factory()->create(['user_id' => $user->id]);

        $data = [
            'url' => 'https://laravel.com',
            'expiration_time' => Carbon::now()->addDays(5)->toDateString(),
            'expiration_clicks' => 10,
            'actived' => true
        ];

        $response = $this->urlService->update($data, $url->id, $user->id);

        $this->assertFalse($response['error']);
        $this->assertDatabaseHas('urls', ['url' => 'https://laravel.com']);
    }

    /** @test */
    public function it_regenerates_url_code()
    {
        $user = User::factory()->create();
        $url = Url::factory()->create(['user_id' => $user->id, 'code' => 'AAAA']);

        $response = $this->urlService->regenerate($url->id, $user->id);

        $this->assertFalse($response['error']);
        $this->assertNotEquals('AAAA', $url->fresh()->code);
    }

    /** @test */
    public function it_deletes_a_url()
    {
        $user = User::factory()->create();
        $url = Url::factory()->create(['user_id' => $user->id]);

        $response = $this->urlService->delete($url->id, $user->id);

        $this->assertFalse($response['error']);
        $this->assertDatabaseMissing('urls', ['id' => $url->id]);
    }

    /** @test */
    public function it_validates_expired_url()
    {
        $user = User::factory()->create();
        $url = Url::factory()->create([
            'user_id' => $user->id,
            'expiration_time' => Carbon::now()->subDay(),
            'actived' => now()
        ]);

        $response = $this->urlService->validateUrlToRedirect($url->code);

        $this->assertTrue($response['error']);
        $this->assertEquals(400, $response['status']);
    }
}
