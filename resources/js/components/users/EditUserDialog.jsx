import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { useEffect } from "react";

const EditUserDialog = ({ open, setOpen, user }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: "",
        email: "",
        actived : ""
    });

    useEffect(() => {
        if (user) {
            setData({
                name: user.name || "",
                email: user.email,
                actived: Boolean(user.actived),
            });
            return;
        }
        reset();
    }, [user, setData, reset]);

    const submit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-xl w-full">
                <DialogTitle>Actualizar información del usuario</DialogTitle>
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

                    <div className="my-6">
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
                            Actualizar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserDialog;
