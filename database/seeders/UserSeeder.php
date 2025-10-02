<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $user = User::create([
            "name" => "admin", 
            "email" => "admin@example.com", 
            "password" => Hash::make(env('APP_USER_ADMIN_PASSWORD', 'password'))
        ]);

        $roleUser = RoleUser::create([
            "user_id" => $user->id, 
            "role_id" => Role::ROLE_ADMIN
        ]);

    }
}
