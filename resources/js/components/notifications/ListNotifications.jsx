import useNotificationState from "@/stores/notifications.store"
import { router } from "@inertiajs/react"
import ItemNotification from "./ItemNotification"

function ListNotifications() {
  const notifications = useNotificationState((state) => state.allNotification)
  const notificationsRead = notifications.filter((n) => n.read_at).length
  const notificationsUnRead = useNotificationState(
    (state) => state.qtUnReadNotification
  )



  return (
    <div className="flex flex-col my-3 gap-2 w-full">
      <div className="flex justify-between">
        {notificationsUnRead > 0 && (
          <small
            onClick={() => router.patch(route("notifications.markAllAsRead"))}
            className="underline underline-offset-2 cursor-pointer"
          >
            Marcar todas como leídas
          </small>
        )}
        {notificationsRead > 0 && (
          <small
            onClick={() => router.delete(route("notifications.deleteAllRead"))}
            className="underline underline-offset-2 cursor-pointer"
          >
            Eliminar leídas
          </small>
        )}
      </div>
      <ul className="space-y-4 w-full">
        {notifications.map((noti) => (
          <ItemNotification
            key={`li_notification_${noti.id}`}
            notification={noti}
          />
        ))}
      </ul>
    </div>
  )
}

export default ListNotifications
