import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/icons/GoogleIcon";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset, isDirty } = useForm({
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
                <div className="mb-4 font-medium text-sm text-green-600 text-center">
                    {status}
                </div>
            )}

            <div className="w-full md:ml-56 sm:max-w-md px-6 py-6 bg-white shadow-md sm:rounded-2xl">
                <div>
                    <h1 className="text-xl font-bold text-center">Iniciar sesión</h1>
                    <h1 className="text-sm text-gray-600 mb-6 text-center">
                        Accede con tu email y contraseña
                    </h1>

                    <form onSubmit={submit}>
                        <div>
                            <Label htmlFor="email" className="ml-2">
                                Email
                            </Label>
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
                            <Label htmlFor="password" className="ml-2">
                                Contraseña
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-2xl"
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
                            <label className="flex items-center">
                                <Switch
                                    name="remember"
                                    onCheckedChange={(e) =>
                                        setData("remember", e)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Recordarme
                                </span>
                            </label>
                        </div>

                        <div className="mt-7 mb-4">
                            <Button
                                className="w-full rounded-2xl"
                                disabled={processing}
                                type="submit"
                            >
                                Iniciar sesión
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
                               Incia con Google <GoogleIcon width={20} />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
