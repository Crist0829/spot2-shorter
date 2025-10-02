import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Link, Users } from "lucide-react"
import React from "react"

const SidebarMenuForUser = ( userRoles ) => {
  const MenusForRole = [
    {
      roleId: 1,
      menus: [
        <SidebarMenuItem key="usuarios" className="px-2">
          <SidebarMenuButton className="bg-stone-100/70 text-lg">
          <Users className="mr-2 h-4 w-4"/> Usuarios 
          </SidebarMenuButton>
        </SidebarMenuItem>,
      ],
    },
    {
      roleId: 2,
      menus: [
        <SidebarMenuItem key="mis-urls" className="px-2">
          <SidebarMenuButton className="bg-stone-100/70 text-lg">
          <Link className="mr-2 h-4 w-4" /> Mis Urls
          </SidebarMenuButton>
        </SidebarMenuItem>,
      ],
    },
  ]
  const allowedMenus = userRoles.flatMap((role) => {
    const found = MenusForRole.find((menu) => menu.roleId === role.id)
    return found ? found.menus : []
  })

  return <>{allowedMenus}</>
}

export default SidebarMenuForUser
