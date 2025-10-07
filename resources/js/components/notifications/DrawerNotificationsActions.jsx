import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { BreadcrumbEllipsis } from "../ui/breadcrumb"
import { EyeIcon, EyeOff, Trash2 } from "lucide-react"
import { router } from "@inertiajs/react"
import useNotificationState from "@/stores/notifications.store"

const DrawerNotificationsActions = ({ notification }) => {
  function handleUnReadOrReadNotifiaction(notifcationId) {
    router.patch(route("notifications.markAsReadOrUnread", notifcationId))
  }

  const updateAllNotification = useNotificationState(
    (state) => state.updateAllNotification
  )
  const allNotifications = useNotificationState(
    (state) => state.allNotification
  )

  function handleDeleteNotification(notificationId) {
    router.delete(route("notifications.destroy", { id: notificationId }), {
      onSuccess: () => {
        const updated = allNotifications.filter((n) => n.id !== notificationId)
        updateAllNotification(updated)
      },
    })
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <BreadcrumbEllipsis className="rotate-90" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{notification.data.title}</DrawerTitle>
        </DrawerHeader>
        <div className="mx-auto w-full max-w-sm">
          <ul className="flex flex-col gap-3 px-4 pt-3 pb-10">
            <li className="flex gap-2">
              <Button
                onClick={() => handleDeleteNotification(notification.id)}
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <Trash2 width={20} /> Eliminar notificación
              </Button>
            </li>
            <li className="flex gap-2">
              <Button
                onClick={() => handleUnReadOrReadNotifiaction(notification.id)}
                variant="outline"
                className="w-full justify-start gap-3 "
              >
                {!notification.read_at ? (
                  <>
                    <EyeIcon width={20} /> Marcar como leída
                  </>
                ) : (
                  <>
                    <EyeOff width={20} /> Marcar como no leída
                  </>
                )}
              </Button>
            </li>
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerNotificationsActions
