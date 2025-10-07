import ListNotifications from "@/components/notifications/ListNotifications"
import { Button } from "@/components/ui/button"
import Message from "@/components/utils/Message"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import useNotificationState from "@/stores/notifications.store"
import { Head, router } from "@inertiajs/react"
import { useEffect } from "react"

const Notifications = ({ auth, notifications, unReadNotifications }) => {
  const data = notifications.data
  const next_page_url = notifications.next_page_url

  const updateAllNotification = useNotificationState(
    (state) => state.updateAllNotification
  )
  const unReadNotification = useNotificationState(
    (state) => state.unReadNotification
  )

  useEffect(() => {
    updateAllNotification(notifications.data ?? [])
    window.Echo.private("notifications.user." + auth.user.id).notification(
      (newNotification) => {
        router.reload()
      }
    )
  }, [unReadNotification])

  const oldNotifications = useNotificationState(
    (state) => state.allNotification
  )
  function handleGetMoreNotifications() {
    if (next_page_url) {
      router.get(
        next_page_url,
        {},
        {
          preserveScroll: true,
          preserveState: true,
          only: ["notifications"],
          onSuccess: ({ props }) => {
            const { data } = props.notifications.data
            updateAllNotification([...oldNotifications, ...data])
          },
        }
      )
    }
  }

  return (
    <>
      <Head title="Notificaciones" />
      <Authenticated user={auth.user}>
        <div className="page-to-observe flex flex-col items-center justify-center w-11/12 mx-auto max-w-[768px] pb-5">
          <section className="w-full">
            {data.length > 0 ? (
              <>
                <ListNotifications />
                <div className="flex justify-end w-full text-center">
                  {next_page_url ? (
                    <Button variant="link" onClick={handleGetMoreNotifications}>
                      Cargar más
                    </Button>
                  ) : (
                    <small className="inline-block m-2">
                      No hay más notificaciones
                    </small>
                  )}
                </div>
              </>
            ) : (
              <Message message={"No hay notificaciones nuevas"} />
            )}
          </section>
        </div>
      </Authenticated>
    </>
  )
}

export default Notifications
