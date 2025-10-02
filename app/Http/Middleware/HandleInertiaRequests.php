<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $request->user() ? $request->user()->roles : $request->user();
        $flashKeys = ['success', 'not_success'];
        // Captura el valor de las variables de sesión y toma el mensaje si existe
        $flash = collect($flashKeys)->mapWithKeys(function ($key) {
            return [$key => fn() => request()->session()->pull($key)];
        })->all();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],

            'flash' => $flash
        ];
    }
}
