import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

const URLDialog = ({ triggerLabel = "Abrir" }) => {
    const { data, setData, post, errors, processing, reset } = useForm({
        url: "",
        expiration_time: "",
        expiration_clicks: "",
        actived: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.urls.create"), {
            onSuccess : () => reset()
        })
        
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="rounded-2xl">
                    {triggerLabel} <Scissors />{" "}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl w-full">
            <DialogTitle>Acortar Link</DialogTitle>
                <form onSubmit={handleSubmit} className="my-4 flex flex-col">
                    <div className="flex flex-col my-2">
                        <Label className="my-1 mx-2">Link: </Label>
                        <Input
                            className="rounded-2xl"
                            id="url"
                            name="url"
                            onChange={(e) => setData("url", e.target.value)}
                        />
                        <p className="my-1 mx-2 text-sm text-red-500">
                            {errors.url}
                        </p>
                    </div>
                    <div className="flex flex-col my-2">
                        <Label className="my-1 mx-2">
                            Fecha de expiración:{" "}
                        </Label>
                        <Input
                            className="rounded-2xl"
                            id="url"
                            name="url"
                            type="date"
                            onChange={(e) =>
                                setData("expiration_time", e.target.value)
                            }
                        />
                        <p className="my-1 mx-2 text-sm text-red-500">
                            {errors.expiration_time}
                        </p>
                    </div>
                    <div className="flex flex-col my-2">
                        <Label className="my-1 mx-2">
                            Expiración por número de visitas:{" "}
                        </Label>
                        <Input
                            className="rounded-2xl"
                            id="url"
                            name="url"
                            type="number"
                            onChange={(e) =>
                                setData("expiration_clicks", e.target.value)
                            }
                        />
                        <p className="my-1 mx-2 text-sm text-red-500">
                            {errors.expiration_clicks}
                        </p>
                    </div>

                    <div className="my-2">
                        <label className="flex items-center">
                            <Switch
                                name="actived"
                                onCheckedChange={(e) => setData("actived", e)}
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Activo
                            </span>
                        </label>
                        <p className="my-1 mx-2 text-sm text-red-500">
                            {errors.actived}
                        </p>
                    </div>

                    <Button
                        className="rounded-2xl my-6"
                        type="submit"
                        disabled={processing}
                    >
                        {" "}
                        Acortar <Scissors />{" "}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default URLDialog;
