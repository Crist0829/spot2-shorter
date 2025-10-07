import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link as ILink, User, Users } from "lucide-react";
import React from "react";
import { Link } from "@inertiajs/react";

const SidebarMenuForUser = (userRoles) => {
    const MenusForRole = [
        {
            roleId: 1,
            menus: [
                <SidebarMenuItem key="usuarios" className="px-2">
                    <SidebarMenuButton asChild>
                    <Link href={route("users.index")}><User className="mr-2 h-4 w-4" /> Usuarios</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>,
                 <SidebarMenuItem key="urls" className="px-2">
                 <SidebarMenuButton asChild>
                 <Link href={route("admin.urls.index")}><ILink className="mr-2 h-4 w-4" />Links</Link>
                 </SidebarMenuButton>
             </SidebarMenuItem>,
            ],
        },
        {
            roleId: 2,
            menus: [
                <SidebarMenuItem key="mis-urls" className="px-2">
                    <SidebarMenuButton asChild>
                        <Link href={route("urls.index")}><ILink className="mr-2 h-4 w-4" /> Mis Links</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>,
            ],
        },
    ];
    const allowedMenus = userRoles.flatMap((role) => {
        const found = MenusForRole.find((menu) => menu.roleId === role.id);
        return found ? found.menus : [];
    });

    return <>{allowedMenus}</>;
};

export default SidebarMenuForUser;
