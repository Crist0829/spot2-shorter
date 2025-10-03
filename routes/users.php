<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;




Route::middleware('auth')->group(function (){
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::post('users', [UserController::class, 'create'])->name('users.create');
    Route::put('users/{user_id}', [UserController::class, 'update'])->name('users.update');
    Route::put('users/password/{user_id}', [UserController::class, 'updatePassword'])->name('users.updatePassword');
    Route::put('users/{user_id}/{role_id}', [UserController::class, 'assignOrRemoveRole'])->name('users.assignOrRemoveRole');
    Route::delete('users/{user_id}', [UserController::class, 'delete'])->name('usersdelete');
});


