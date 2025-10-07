import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { getFlashAvailableMessage } from "@/helpers/Helpers"
import useRegisterServiceWorker from "@/hooks/useRegisterServiceWorker"
import useNotificationState from "@/stores/notifications.store"
import { router, usePage } from "@inertiajs/react"
import { Info } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"

export default function Authenticated({ user, children }) {

  const { flash, auth } = usePage().props
  const notifications = auth.user.unread_notifications
  const areThereNotifications = Array.isArray(notifications)
  const updateUnReadNotification = useNotificationState(
    (state) => state.updateUnReadNotification
  )
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
            toast.info(newNotification.data.title, {
                duration: 3000,
                closeButton: true,
                icon: <Info/>, 
              })
          router.reload()
        }
      )
    }
  }, [])

  useEffect(() => {

    if (Array.isArray(auth.user.unread_notifications)) 
      updateUnReadNotification(auth.user.unread_notifications)
    
    if (Array.isArray(auth.user.read_notifications)) 
        updateUnReadNotification(auth.user.read_notifications)
      
  }, [auth.user.unread_notifications, auth.user.read_notifications])

  useRegisterServiceWorker({ auth })

  return (
    <SidebarProvider>
      <AppSidebar userRoles={user.roles} />
      <Toaster closeButton richColors position="bottom-right" />
      <main className="flex flex-1">
        <div className="self-start">
          <SidebarTrigger />
        </div>
        <div className="flex-col flex-1 justify-center">{children}</div>
      </main>
    </SidebarProvider>
  )
}
