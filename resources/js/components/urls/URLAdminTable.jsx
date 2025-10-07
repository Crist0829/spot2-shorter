import { Copy, Edit, Eye, Redo, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import URLEditDialog from "./URLEditDialog";
import URLAdminEditDialog from "./URLAdminEditDialog";

const URLAdminTable = ({ urls }) => {

    const handleDeleteUrl = (urlId) => {
        const op = confirm("¿Estás seguro que deseas eliminar este link");
        if (op) router.delete(route("admin.urls.delete", urlId));
    };


    const handleRegenerateUrl = (urlId) => {
        router.put(route("admin.urls.regenerate", urlId));
    };

    
    const getAnalysisStatus = (status) => {
        switch(status){
            case 'pending':
                return 'Pendiente';
            case 'safe' : 
                return 'Seguro';
            case 'error':
                return 'Error'
            case 'malicious': 
                return 'Dañino'
            default:
                return 'Sin Análisis'
        }
    }

    const [openEdit, setOpenEdit] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState(null);

    return (
        <>
            <URLAdminEditDialog
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
                                ESTADO DEL ANALISIS
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                USUARIO
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
                                    {`${import.meta.env.VITE_APP_URL}/s/${
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
                                    {getAnalysisStatus(url.analysis.status.name)}
                                </td>
                                <td className="text-center py-4 whitespace-nowrap text-sm text-gray-900">
                                    {url.user != null ? `${url.user.id} ${url.user.name}` : 'Invitado'}
                                </td>

                               

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex justify-center gap-2">
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

export default URLAdminTable;
