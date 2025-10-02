import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getFlashAvailableMessage } from "@/helpers/Helpers";
import { useEffect } from "react";

export default function Authenticated({ user, header, children, flash }) {

    useEffect(() => {
        getFlashAvailableMessage(flash);
    }, [flash]);

    return (
        <SidebarProvider>
            <AppSidebar userRoles={user.roles} />
            <Toaster closeButton richColors position="top-center" />
            <main className="flex flex-1">
                <div className="self-start">
                    <SidebarTrigger />
                </div>
                <div className="flex flex-1 justify-center">{children}</div>
            </main>
        </SidebarProvider>
    );
}
