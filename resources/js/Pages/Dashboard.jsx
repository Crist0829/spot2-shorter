import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, flash }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            flash={flash}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <h1 className="text-center text-4xl my-6">Hola, {auth.user.name}</h1>
        </AuthenticatedLayout>
    );
}
