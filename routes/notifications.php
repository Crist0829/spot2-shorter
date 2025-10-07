<?php

use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications');
    Route::get('/notifications/{id}', [NotificationController::class, 'show'])->name('notifications.show');
    Route::patch('/notifications/{id}/read-unread', [NotificationController::class, 'markAsReadOrUnread'])->name('notifications.markAsReadOrUnread');
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
    Route::delete('/notifications-all-read', [NotificationController::class, 'deleteAllRead'])->name('notifications.deleteAllRead');
    Route::patch('all-notifications-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');

});
