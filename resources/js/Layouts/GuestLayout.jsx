import React, { useEffect } from "react";
import Logo from "@/../images/logo.png";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { getFlashAvailableMessage } from "@/helpers/Helpers";

export default function Guest({ children }) {

    const {flash} = usePage().props

    useEffect(() => {
            getFlashAvailableMessage(flash);
        }, [flash]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Toaster closeButton richColors position="top-center" />
            <header className="w-full">
                <div className="mx-auto px-4 py-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2">
                    <div className="w-full sm:w-auto flex items-center gap-4 justify-center sm:justify-start">
                        <Link href="/" className="flex items-center">
                            <img src={Logo} alt="Logo" className="h-16 my-4" />
                        </Link>
                        <div className="hidden sm:block text-sm text-gray-600">
                            Acorta URLs rápido y comparte con confianza
                        </div>
                    </div>

                    <div className="w-full sm:w-auto text-gray-700 flex flex-col sm:flex-row items-center sm:justify-end gap-3">
                        <p className="text-sm text-gray-700 hidden sm:block">
                            ¿Ya tienes una cuenta?
                        </p>

                        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                            <Link
                                href="/login"
                                className="w-full sm:w-auto"
                                aria-label="Ingresar"
                            >
                                <Button className="w-full sm:w-auto rounded-2xl" variant="secondary">
                                    Ingresar
                                </Button>
                            </Link>

                            <div className="hidden sm:flex items-center px-1 text-sm text-gray-500">
                                ó
                            </div>

                            <Link
                                href="/register"
                                className="w-full sm:w-auto"
                                aria-label="Registrate"
                            >
                                <Button className="w-full sm:w-auto rounded-2xl">
                                    Registrate
                                </Button>
                            </Link>
                        </div>

                        <div className="block sm:hidden text-xs text-center text-gray-600 mt-1">
                            Ingresa o registrate para acceder a más
                            características
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 py-6">
                <div className="w-full sm:max-w-4xl">{children}</div>
            </main>

            <footer className="w-full">
                <div className="mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-gray-500 max-w-xs text-center sm:text-left">
                        Este proyecto es un challenge técnico para spot2, su uso
                        es solamente para fines internos no comerciales y el uso
                        del logo y el nombre es solo para fines ilustrativos.
                        <br />
                        <strong className="font-bold text-gray-800">Autor: Cristian Jiménez</strong>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400">
                        <Link href="/terms" className="hover:underline">
                            Términos
                        </Link>
                        <Link href="/privacy" className="hover:underline">
                            Privacidad
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
