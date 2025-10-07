import { getTimeAgo } from "@/helpers/getFormatDate"
import { router } from "@inertiajs/react"
import { ArrowUpRight } from "lucide-react"
import { VITE_APP_URL } from "@/config/constants"
import DrawerNotificationsActions from "./DrawerNotificationsActions"

const ItemNotification = ({ notification }) =>  {

  const classes = notification.read_at ? "" : "bg-primary/20"
  const timeAgo = notification.created_at
    ? getTimeAgo({ created_at: notification.created_at })
    : "Hace unos segundos"


  function handleClickOnNotification() {
    router.patch(
      route("notifications.markAsRead", notification.id),
      {},
      {
        onSuccess: () => {
          notification.data.link
            ? router.get(notification.data.link)
            : undefined
        },
      }
    )
  }

  return (
    <li
      className={` animate-fade-in-down relative p-2 border group hover:brightness-200 rounded ${classes}`}
    >
      <div className="flex justify-between mb-1">
        <small className="text-xs text-nowrap">{timeAgo}</small>
        {notification.data.link && (
          <ArrowUpRight className="rotate-12 group-hover:-rotate-12 transition-transform   size-4" />
        )}
      </div>

      <div className="flex items-center  gap-2">
        {/* un read indicator */}
        {notification.read_at == null && (
          <span
            className={`size-[7px] rounded-full ${
              notification.read_at ? "" : "bg-primary"
            }`}
          ></span>
        )}
        {/* Content */}
        <div
          onClick={() => handleClickOnNotification()}
          className={`flex items-center gap-5   ${
            notification.data.link && "cursor-pointer"
          }`}
        >
          {/* Si tiene imagen */}
          {notification.data.image_url && (
            <img
              className="size-14 group-hover:brightness-[0.4]   aspect-square rounded-md"
              src={VITE_APP_URL + notification.data.image_url}
            />
          )}

          {/* title and body */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-start gap-2 ">
              <h3
                className={` text-xs md:text-base ${
                  notification.data.link && "underline underline-offset-2"
                }`}
              >
                {notification.data.title}
              </h3>
            </div>

            <p className="font-medium text-xs md:text-base">
              {notification.data.body}
            </p>
          </div>
        </div>

        {/* actions */}
        <div className="ml-auto cursor-pointer">
          <DrawerNotificationsActions notification={notification} />
        </div>
      </div>
    </li>
  )
}

export default ItemNotification