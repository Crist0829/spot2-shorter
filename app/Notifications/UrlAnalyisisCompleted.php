<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\PusherPushNotifications\PusherChannel;
use NotificationChannels\PusherPushNotifications\PusherMessage;

class UrlAnalyisisCompleted extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public string $analysisResult)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [PusherChannel::class, 'database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => "Se analizó un link cargado",
            'body' => "El resultado fue " . $this->analysisResult,
            'link' => env('APP_URL') . '/urls'
        ];
    }


    public function toBroadcast($notifiable)
    {
        return (new BroadcastMessage([
            "data" => [
                'title' =>  "Se analizó un link cargado",
                'body' => "El resultado fue " . $this->analysisResult,
            ]
        ]))->onQueue('broadcasts');
    }

    public function toPushNotification($notifiable)
    {
        return PusherMessage::create()
            ->platform('web')
            ->title('Se analizó un link cargado')
            ->body("El resultado fue " . $this->analysisResult)
            ->link( env('APP_URL') . '/urls');
    }


}
