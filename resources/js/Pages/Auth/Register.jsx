import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="flex flex-col">
                <h1 className="text-xl font-bold">Registrate</h1>
                <h1 className="text-sm text-gray-600 mb-6">
                    Crea una cuenta y disfruta los beneficios
                </h1>
                <form onSubmit={submit}>
                    <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            type="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <p className="my-2 text-xs text-red-700">
                            {errors.email}
                        </p>
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <p className="my-2 text-xs text-red-700">
                            {errors.email}
                        </p>
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <p className="my-2 text-xs text-red-700">
                            {errors.password}
                        </p>
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password_confirmation">
                            Confirmar contraseña
                        </Label>

                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <p className="my-2 text-xs text-red-700">
                            {errors.password_confirmation}
                        </p>
                    </div>

                    <div className="my-8">
                        <Button
                            className="w-full rounded-2xl"
                            disabled={processing}
                        >
                            Registrar
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            ¿Ya estás registrado? Ingresar
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
