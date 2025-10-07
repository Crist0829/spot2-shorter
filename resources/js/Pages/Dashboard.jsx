import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users, Link as LinkIcon, Scissors } from "lucide-react";

export default function Dashboard({ auth }) {
    const { roles } = auth.user;

    const roleCards = {
        1: {
            title: "Administrador",
            description: "Tienes acceso completo al sistema. Puedes administrar usuarios y gestionar links.",
            icon: <Users className="h-8 w-8 text-primary" />,
            actions: ["Administrar usuarios", "Administrar links"],
        },
        2: {
            title: "Usuario",
            description: "Puedes acortar y gestionar tus links personales de forma rápida y segura.",
            icon: <Scissors className="h-8 w-8 text-primary" />,
            actions: ["Acortar links"],
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <h1 className="text-center text-4xl my-8">
                Hola, {auth.user.name}
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
                {roles.map((role) => {
                    const roleInfo = roleCards[role.id];
                    if (!roleInfo) return null;

                    return (
                        <Card key={role.id} className="rounded-2xl shadow-md hover:shadow-lg transition">
                            <CardHeader className="flex items-center gap-3">
                                {roleInfo.icon}
                                <div>
                                    <CardTitle>{roleInfo.title}</CardTitle>
                                    <CardDescription>{roleInfo.description}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    {roleInfo.actions.map((action, index) => (
                                        <li key={index}>{action}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
}
