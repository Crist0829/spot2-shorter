import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div>

                <h1 className="text-xl font-bold">Iniciar sesión</h1>
                <h1 className="text-sm text-gray-600 mb-6">Accede con tu email y contraseña</h1>

                <form onSubmit={submit} >
                    <div>
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
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <p className="my-2 text-xs text-red-700">
                            {errors.password}
                        </p>
                    </div>

                    <div className="flex justify-between mt-6">
                        <div>
                        <label className="flex items-center">
                            <Switch
                                name="remember"
                                onCheckedChange={(e) => setData("remember", e)}
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Recordarme
                            </span>
                        </label>
                        </div>


                            {/* {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )} */}

                        <Link
                            href={route("register")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            ¿No tienes una cuenta? registrate
                        </Link>

                        {/* <PrimaryButton className="ms-4" >
                        Iniciar
                    </PrimaryButton> */}


                    </div>

                    

                    <div className="mt-7 mb-4">
                        <Button
                            variant=""
                            className="w-full rounded-2xl"
                            disabled={processing}
                            type="submit"
                        >
                            Iniciar sesión
                        </Button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
