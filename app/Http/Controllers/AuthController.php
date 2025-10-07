<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Repositories\RoleRepository;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{

    public function __construct(protected UserRepository $userRepository,
                                protected RoleRepository $roleRepository,
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

            $role = $this->roleRepository->getById(Role::ROLE_USER);
            $user = $this->userRepository->getFirstByFilters([], [['email', '=', $googleUser->getEmail()]]);
            $user->roles()->save($role);
        } 

        $token = $user->createToken('notifications_token', ['notifications'])->plainTextToken;
        $user->notifications_token = $token;
        $user->save();

        Auth::login($user);
        return redirect()->intended(route('dashboard', absolute: false));

    }






}
