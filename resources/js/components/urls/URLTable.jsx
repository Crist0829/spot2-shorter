import { Copy, Edit, Eye, Redo, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import URLEditDialog from "./URLEditDialog";

const URLTable = ({ urls }) => {
    const handleDeleteUrl = (urlId) => {
        const op = confirm("¿Estás seguro que deseas eliminar este link");
        if (op) router.delete(route("urls.delete", urlId));
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("El link se copió correctamente", {
            duration: 3000,
            closeButton: true,
        });
    };

    const handleRegenerateUrl = (urlId) => {
        router.put(route("urls.regenerate", urlId));
    };

    const isFuture = (datetime) => {
        if (!datetime) return false;
        const now = new Date();
        const d = new Date(datetime);
        return d > now;
      }

    const [openEdit, setOpenEdit] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState(null);

    return (
        <>
            <URLEditDialog
                open={openEdit}
                setOpen={setOpenEdit}
                url={selectedUrl}
            />

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                URL
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                NUEVA URL
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ESTADO
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                VISITAS
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                FECHA EXPIRACIÓN
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                EXPIRACIÓN POR NRO VISITAS
                            </th>

                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ACCIONES
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {urls.map((url) => (
                            <tr key={url.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {url.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {url.url}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {`${import.meta.env.VITE_BASE_URL}/short/${
                                        url.code
                                    }`}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    {url.actived ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Activo
                                        </span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-white">
                                            Inactivo
                                        </span>
                                    )}
                                </td>
                                <td className="text-center py-4 whitespace-nowrap text-sm text-gray-900">
                                    {url.visits.length}
                                </td>
                                <td className="text-center py-4 whitespace-nowrap text-sm text-gray-900">
                                    {<span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            isFuture(url.expiration_time)
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-400 text-white"
                                        }`}
                                    >
                                        {url.expiration_time}
                                    </span>}
                                </td>

                                <td className="text-center py-4 whitespace-nowrap text-sm text-gray-900">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            url.expiration_clicks == null ||
                                            url.expiration_clicks >
                                                url.visits.length
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-400 text-white"
                                        }`}
                                    >
                                        {url.expiration_clicks}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex gap-2">
                                        <Button className="rounded-2xl"
                                            variant="ghost"
                                            onClick={() =>
                                                handleCopy(
                                                    `${
                                                        import.meta.env
                                                            .VITE_BASE_URL
                                                    }/short/${url.code}`
                                                )
                                            }
                                        >
                                            <Copy />
                                        </Button>
                                        <Button className="rounded-2xl"
                                            onClick={() =>
                                                handleRegenerateUrl(url.id)
                                            }
                                        >
                                            <Redo />
                                        </Button>
                                        <Button className="rounded-2xl"
                                            variant="secondary"
                                            onClick={() => {
                                                setSelectedUrl(url);
                                                setOpenEdit(true);
                                            }}
                                        >
                                            <Edit />
                                        </Button>
                                        <Button className="rounded-2xl"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDeleteUrl(url.id)
                                            }
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default URLTable;
