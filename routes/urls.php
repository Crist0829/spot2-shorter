<?php

use App\Http\Controllers\UrlAdminController;
use App\Http\Controllers\UrlController;
use Illuminate\Support\Facades\Route;


//---- Guest
Route::get('/', [UrlController::class, 'home'])->name('home');
Route::post('urls/guest', [UrlController::class, 'createFromGuest'])->name('urls.createFromGuest');
Route::delete('urls/guest/{url_id}', [UrlController::class, 'deleteFromGuest'])->name('urls.deleteFromGuest');

Route::get('short/{code}', [UrlController::class, 'redirect'])->name('urls.redirect');


Route::middleware('auth')->group(function (){
    Route::get('urls', [UrlController::class, 'index'])->name('urls.index');
    Route::post('urls', [UrlController::class, 'create'])->name('urls.create');
    Route::put('urls/{url_id}', [UrlController::class, 'update'])->name('urls.update');
    Route::put('urls/regenerate/{url_id}', [UrlController::class, 'regenerate'])->name('urls.regenerate');
    Route::delete('urls/{url_id}', [UrlController::class, 'delete'])->name('urls.delete');
});


Route::middleware('auth')->group(function (){
    Route::get('admin/urls', [UrlAdminController::class, 'index'])->name('admin.urls.index');
    //Route::post('admin/urls', [UrlAdminController::class, 'create'])->name('admin.urls.create');
    Route::put('admin/urls/{url_id}', [UrlAdminController::class, 'update'])->name('admin.urls.update');
    Route::put('admin/urls/regenerate/{url_id}', [UrlAdminController::class, 'regenerate'])->name('admin.urls.regenerate');
    Route::delete('admin/urls/{url_id}', [UrlAdminController::class, 'delete'])->name('admin.urls.delete');
});

