import { Edit, FileStack, Lock, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import EditUserDialog from "./EditUserDialog";
import UpdatePasswordDialog from "./UpdatePasswordDialog";
import UserRolesDialog from "./UserRolesDialog";

const UsersTable = ({ users }) => {
    const handleDeleteUser = (userId) => {
        const op = confirm("¿Estás seguro que deseas eliminar este usuario");
        if (op) router.delete(route("users.delete", userId));
    };

    const { auth } = usePage().props;

    /* const handleRegenerateUrl = (urlId) => {
        router.put(route("urls.regenerate", urlId));
    }; */

    const [openEdit, setOpenEdit] = useState(false);
    const [openPass, setOpenPass] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openRoles, setOpenRoles] = useState(false);
    const [selectedUserRoles, setSelectedUserRoles] = useState(null);

    return (
        <>
            {
                <>
                <EditUserDialog
                    open={openEdit}
                    setOpen={setOpenEdit}
                    user={selectedUser}
                />

                <UpdatePasswordDialog open={openPass}
                    setOpen={setOpenPass}
                    user={selectedUser}/>

                <UserRolesDialog open={openRoles}
                    setOpen={setOpenRoles}
                    user={selectedUserRoles}/>
                
                </>

            }

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                NOMBRE
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                EMAIL
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
                        {users.map(
                            (user) =>
                                user.id != auth.user.id && (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.actived ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Activo
                                                </span>
                                            ) : (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-400 text-white">
                                                    Inactivo
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-2 py-4 whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <Button className="rounded-2xl"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setOpenPass(true);
                                                    }}
                                                >
                                                    <Lock />
                                                </Button>
                                                <Button className="rounded-2xl"
                                                    variant="secondary"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setOpenEdit(true);
                                                    }}
                                                >
                                                    <Edit />
                                                </Button>
                                                <Button className="rounded-2xl"
                                                    onClick={() => {
                                                        setSelectedUserRoles(user);
                                                        setOpenRoles(true);
                                                    }}
                                                >
                                                    <FileStack />
                                                </Button>
                                                <Button className="rounded-2xl"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    <Trash />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UsersTable;
