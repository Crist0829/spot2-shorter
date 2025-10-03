import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/icons/GoogleIcon";

export default function Register() {
    const { data, setData, post, processing, errors, reset, isDirty } = useForm({
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

            <div className="w-full sm:max-w-md md:ml-56  mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-2xl">
                <div className="flex flex-col">
                <h1 className="text-xl font-bold text-center">Registrate</h1>
                    <h1 className="text-sm text-gray-600 mb-6 text-center">
                        Crea una cuenta y disfruta los beneficios
                    </h1>
                    <form onSubmit={submit}>
                        <div>
                            <Label htmlFor="name" className="ml-2">Nombre</Label>
                            <Input
                                id="name"
                                type="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full rounded-2xl"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <p className="my-2 text-xs text-red-700">
                                {errors.email}
                            </p>
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="email" className="ml-2">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-2xl"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <p className="my-2 text-xs text-red-700">
                                {errors.email}
                            </p>
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="password" className="ml-2">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-2xl"
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
                            <Label htmlFor="password_confirmation" className="ml-2">
                                Confirmar contraseña
                            </Label>

                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full rounded-2xl" 
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <p className="my-2 text-xs text-red-700">
                                {errors.password_confirmation}
                            </p>
                        </div>

                        <div className="mt-6 mb-4">
                            <Button
                                className="w-full rounded-2xl"
                                disabled={processing}
                            >
                                Registrarse
                            </Button>
                        </div>

                                <hr className=" border-t border-gray-300"/>

                        <div className="mt-4">
                            <Button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 rounded-2xl"
                                disabled={isDirty || processing}
                                onClick={() => {
                                    window.location.href = route("auth.google");
                                }}
                            >
                                Registrarse con Google <GoogleIcon width={20} />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
