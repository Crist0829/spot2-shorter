<?php 

namespace App\Services;

use App\Repositories\UserRepository;
use Exception;
use Illuminate\Support\Facades\Log;

class NotificationService {

    public function __construct(protected UserRepository $userRepository){}


    public function getUserNotifcations(string $userId, $data){
        $perPage = 10;
        $page = $data['page'] ?? 1;
        $user = $this->userRepository->getByIdOrFail($userId);
        $notifications = $user->notifications()->paginate($perPage, ["*"], 'page', $page);
        return $notifications;
    }

    public function markAsReadOrUnread(string $notificationId, string $userId)
    {
        $user = $this->userRepository->getByIdOrFail($userId);
        $notification = $user->notifications()->findOrFail($notificationId);
        if (is_null($notification->read_at)){
            $notification->markAsRead();
            return [
                "error" => false, 
                "status" => 200, 
                "message" => "La notificación se marcó como leída correctamente"
            ];
        }
        $notification->update(['read_at' => null]); 
        return [
            "error" => false, 
            "status" => 200, 
            "message" => "La notificación se marcḉo como no leída correctamente"
        ];
    }

    public function destroy($notificationId, $userId)
    {
        try {
            $user =  $this->userRepository->getByIdOrFail($userId);
            $notification = $user->notifications()->findOrFail($notificationId);
            $notification->delete();
            return [
                "error" => false, 
                "status"  => 200, 
                "message" => "La notificación se eliminó correctamente"
            ];
        } catch (Exception $e) {
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line' . $e->getLine());
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un problema eliminando la notificación, intentelo de nuevo más tarde"
            ];
        }
    }


    public function markAllAsRead($userId)
    {
        try {
            $user = $this->userRepository->getByIdOrFail($userId);
            $notifications = $user->unreadNotifications;
            foreach ($notifications as $notification) 
                $notification->markAsRead();
            
            return [
                "error" => false, 
                "status" => 200, 
                "message" => "Todas las notificaciones se marcaron como leídas correctamente"
            ];
        } catch (Exception $e) {
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line' . $e->getLine());
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un problema marcando como leídas las notificaciones, intentelo de nuevo más tarde"
            ];
        }
    }



    public function deleteAllRead($userId)
    {
        try {
            $user = $this->userRepository->getByIdOrFail($userId);
            $notifications = $user->readNotifications;
            foreach ($notifications as $notification) 
                $notification->delete();
                return [
                    "error" => false, 
                    "status" => 200, 
                    "message" => "Todas las notificaciones leídas se eliminaron correctamente"
                ];
           
        } catch (Exception $e) {
            Log::error($e->getMessage() . ' File: ' . $e->getFile() . ' Line' . $e->getLine());
            return [
                "error" => true, 
                "status" => 500, 
                "message" => "Ocurrió un problema eliminando las notificaciones, intentelo de nuevo más tarde"
            ];
        }
    }


}