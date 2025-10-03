import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Redo2 } from "lucide-react";
const UpdatePasswordDialog = ({ open, setOpen, user }) => {

    const { data, setData, put, processing, errors, reset } = useForm({
        password: "",
        password_confirmation: "",
    })


    const submit = (e) => {
        e.preventDefault();
        put(route("users.updatePassword", user.id));
        reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-xl w-full">
                <DialogTitle>Cambiar contraseña</DialogTitle>
                <form onSubmit={submit}>

                <div className="mt-4">
                        <Label htmlFor="password" className="ml-2">
                            Nueva contraseña
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

                    <div className="my-8">
                        <Button
                            className="w-full rounded-2xl"
                            disabled={processing}
                        >
                            Actualizar <Redo2/>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdatePasswordDialog
