import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save, Scissors } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

const URLEditDialog = ({ open, setOpen, url }) => {
    const { data, setData, put, errors, processing, reset } = useForm({
        url: "",
        expiration_time: "",
        expiration_clicks: "",
        actived: false,
    });

    function toDateInputValue(datetime) {
        if (!datetime) return "";
        const d = new Date(datetime);
        if (isNaN(d)) return "";
        return d.toISOString().split("T")[0];
      }

      useEffect(() => {
        if (url) {
          setData({
            url: url.url || "",
            expiration_time: toDateInputValue(url.expiration_time),
            expiration_clicks: url.expiration_clicks || "",
            actived: Boolean(url.actived),
          });
          return;
        }
        reset();
      }, [url, setData, reset]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url) return;
        put(route("urls.update", url.id), {
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-xl w-full">
                <DialogTitle>Editar Link</DialogTitle>
                <form onSubmit={handleSubmit} className="my-4 flex flex-col">
                    <div className="flex flex-col my-2">
                        <Label className="my-1 mx-2">Link: </Label>
                        <Input
                            className="rounded-2xl"
                            value={data.url}
                            onChange={(e) => setData("url", e.target.value)}
                        />
                        <p className="my-1 mx-2 text-sm text-red-500">
                            {errors.url}
                        </p>
                    </div>

                    <div className="flex flex-col my-2">
                        <Label className="my-1 mx-2">
                            Fecha de expiración:
                        </Label>
                        <Input
                            className="rounded-2xl"
                            type="date"
                            value={data.expiration_time || ""}
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
                            Expiración por número de visitas:
                        </Label>
                        <Input
                            className="rounded-2xl"
                            type="number"
                            value={data.expiration_clicks}
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

                    <Button
                        className="rounded-2xl my-6"
                        type="submit"
                        disabled={processing}
                    >
                        Guardar <Save />
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default URLEditDialog;
