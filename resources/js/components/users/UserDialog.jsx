import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Scissors, UserPlus } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { Switch } from "../ui/switch";

const UserDialog = ({ triggerLabel = "Abrir" }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        actived: true,
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
        post(route("users.create"), {
            onSuccess : () => reset()
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="rounded-2xl">
                    {triggerLabel} <UserPlus />{" "}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl w-full">
                <DialogTitle>Acortar Link</DialogTitle>
                <form onSubmit={submit}>
                    <div>
                        <Label htmlFor="name" className="ml-2">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            type="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full rounded-2xl"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <p className="my-2 text-xs text-red-700">
                            {errors.email}
                        </p>
                    </div>

                    <div className="mt-4">
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
                            onChange={(e) => setData("email", e.target.value)}
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
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <p className="my-2 text-xs text-red-700">
                            {errors.password_confirmation}
                        </p>
                    </div>

                    <div className="my-4">
                        <label className="flex items-center">
                            <Switch
                                checked={data.actived}
                                onCheckedChange={(checked) =>
                                    setData("actived", checked)
                                }
                            />

                            <span className="ms-2 text-sm text-gray-600">
                                Activo
                            </span>
                        </label>
                        <p className="my-1 mx-2 text-sm text-red-500">
                            {errors.actived}
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
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserDialog;
