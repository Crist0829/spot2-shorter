import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { getFlashAvailableMessage } from "@/helpers/Helpers"
import useRegisterServiceWorker from "@/hooks/useRegisterServiceWorker"
import useNotificationState from "@/stores/notifications.store"
import { usePage } from "@inertiajs/react"
import { useEffect } from "react"

export default function Authenticated({ user, children }) {

  const { flash, auth } = usePage().props
  const notifications = auth.user.unread_notifications
  const areThereNotifications = Array.isArray(notifications)
  const updateUnReadNotification = useNotificationState(
    (state) => state.updateUnReadNotification
  )


  console.log(auth.user)

  useEffect(() => {
    getFlashAvailableMessage(flash)
  }, [flash])

  useEffect(() => {
    if (
      !window.Echo.private("notifications.user." + auth.user.id).subscription
        .subscribed
    ) {
      window.Echo.private("notifications.user." + auth.user.id)
      window.Echo.private("notifications.user." + auth.user.id).notification(
        (newNotification) => {
          const newNotifications = [...notifications, newNotification]
          updateUnReadNotification(newNotifications)
        }
      )
    }
  }, [auth])

  useRegisterServiceWorker({ auth })

  return (
    <SidebarProvider>
      <AppSidebar userRoles={user.roles} />
      <Toaster closeButton richColors position="top-center" />
      <main className="flex flex-1">
        <div className="self-start">
          <SidebarTrigger />
        </div>
        <div className="flex-col flex-1 justify-center">{children}</div>
      </main>
    </SidebarProvider>
  )
}
