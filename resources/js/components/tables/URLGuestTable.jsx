import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { router } from "@inertiajs/react";



const URLGuestTable = ({ urls }) => {



    const handleDeleteUrl = (urlId) => {
        const op = confirm("¿Estás seguro que deseas eliminar este link")
        if(op) router.delete(route("urls.deleteFromGuest", urlId))
    }


    return (
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ACCIONES
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {urls.map((url) => {
                        return (
                            <tr key={url.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {url.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {url.url}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {`${import.meta.env.VITE_APP_URL}/short/${url.code}`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {url.actived ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Activo
                                    </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-green-800">
                                        Activo
                                    </span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Button variant="destructive" onClick={() => handleDeleteUrl(url.id)}><Trash/></Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default URLGuestTable;
