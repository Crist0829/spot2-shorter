import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import Logo from "@/../images/logo.png";
import { Link, router } from "@inertiajs/react";
import { List, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import SidebarMenuForUser from "../helpers/SidebarMenuForUser";

export function AppSidebar({ userRoles }) {

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
                        <SidebarMenuButton>
                        <List className="mr-2 h-4 w-4" /> Dashboard 
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    {SidebarMenuForUser(userRoles)}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenuItem className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => router.post(route("logout"))}
                    >
                        Cerrar sesión <LogOut />
                    </Button>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    )
}
