<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{

    public function __construct(protected UserRepository $userRepository,
                                protected UserService $userService)
    {
        
    }
    

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->with(['redirect_uri' => env('GOOGLE_REDIRECT')])->redirect();

    }

    public function handleGoogleCallback()
    {

        $googleUser = Socialite::driver('google')->user();
        $user = $this->userRepository->getFirstByFilters([], [['email', '=', $googleUser->getEmail()]]);

        if(!$user){
            $user = $this->userService->create([
                "name" => $googleUser->getName(), 
                "email" => $googleUser->getEmail(),
                "actived" => now() 
            ]);
        } 

        $user = $this->userRepository->getFirstByFilters([], [['email', '=', $googleUser->getEmail()]]);

        Auth::login($user);
        return redirect()->intended(route('dashboard', absolute: false));

    }






}
