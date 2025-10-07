<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{



    public function __construct(protected NotificationService $notificationService){}


    public function index(Request $request)
    {
        $notifications = $this->notificationService->getUserNotifcations(auth()->user()->id, $request->all());
        return Inertia::render('Notifications', ['notifications' => $notifications]);
    }
    
    public function markAsReadOrUnread($id)
    {
        $response = $this->notificationService->markAsReadOrUnread($id, auth()->user()->id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }

   
    public function destroy($id)
    {
        $response = $this->notificationService->destroy($id, auth()->user()->id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }

   
    public function markAllAsRead()
    {
        $response = $this->notificationService->markAllAsRead(auth()->user()->id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }

    public function deleteAllRead()
    {
        $response = $this->notificationService->deleteAllRead(auth()->user()->id);
        session()->flash($response["error"] ? 'not_success' : 'success', $response["message"]);
    }
}
