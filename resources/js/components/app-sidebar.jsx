import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import Logo from "@/../images/logo.png"
import { Link, router } from "@inertiajs/react"
import { Bell, List, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import SidebarMenuForUser from "../helpers/SidebarMenuForUser"
import { usePusherStore } from "@/stores/pusher.store"
import useNotificationState from "@/stores/notifications.store"

export function AppSidebar({ userRoles }) {
  const beamsClient = usePusherStore((state) => state.beamsClient)
  const clearBeamsClient = usePusherStore((state) => state.clearBeamsClient)
  const qtUnReadNotification = useNotificationState(
    (state) => state.qtUnReadNotification
  )

  function handleLogout() {
    if (beamsClient) {
      beamsClient.stop().then(() => console.log("Beams client stopped"))
      clearBeamsClient()
    }

    router.post(route("logout"))
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuItem className="flex justify-center my-2">
          <div>
            <Link href={route("dashboard")}>
              <img src={Logo} alt="logo" />
            </Link>
          </div>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="">
          <SidebarMenuItem className="px-2">
            <SidebarMenuButton asChild>
              <Link href={route("dashboard")}><List className="mr-2 h-4 w-4" /> Dashboard</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {SidebarMenuForUser(userRoles)}
          <SidebarMenuItem className="px-2">
            <SidebarMenuButton  asChild>
              <Link href={route("notifications")} className="flex items-center relative">
              <div className="relative">
                <Bell className="h-5 w-5" />
                {qtUnReadNotification > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {qtUnReadNotification}
                  </span>
                )}
              </div>
              <span className="ml-2">Notificaciones</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem className="flex justify-center">
          <Button variant="ghost" onClick={handleLogout}>
            Cerrar sesión <LogOut />
          </Button>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}
