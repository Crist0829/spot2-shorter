<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(protected UserService $userService){}


    public function index(){
        $users = $this->userService->getAllUsers();
        $roles = $this->userService->getAllRoles();
        return Inertia::render('Users/Index', ["users" => $users, "roles" => $roles]);
    }


    public function create(Request $request){

        $request->validate([
            "name" => "required|min:4", 
            "email" => "required|email", 
            "password" => "required|confirmed",
            "actived" => "required|boolean"
        ]);

        $data = $request->only(['name', 'email', 'password', 'actived']);
        $response = $this->userService->create($request->all());
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
        
    }


    public function update(string $user_id, Request $request){

        $request->validate([
            "name" => "required|min:4", 
            "email" => "required|email", 
            "actived" => "required|boolean"
        ]);

        $data = $request->only(['name', 'email', 'actived']);
        $response = $this->userService->update($request->all(), $user_id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
        
    }
    
    public function updatePassword(string $user_id, Request $request){

        $request->validate([
            "password" => "required|min:6|confirmed", 
        ]);

        $response = $this->userService->updatePassword($request->password, $user_id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
        
    }


    public function assignOrRemoveRole(string $user_id, string $role_id){
        $response = $this->userService->assignOrRemoveRole($user_id, $role_id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }


}
