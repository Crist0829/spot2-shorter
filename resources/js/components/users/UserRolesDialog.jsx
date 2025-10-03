import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
const UserRolesDialog = ({ open, setOpen, user }) => {
    const { roles } = usePage().props;

    const handleAssignOrRemoveRoleFromUser = (roleId) => {
        router.put(
            route("users.assignOrRemoveRole", {
                user_id: user.id,
                role_id: roleId,
            })
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-xl w-full">
                <DialogTitle>Roles de usuario</DialogTitle>
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
                                    ACCION
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {roles.map((role) => (
                                <tr key={role.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {role.id}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {role.name}
                                    </td>

                                    {user && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.roles.find(
                                                (userRole) =>
                                                    userRole.id == role.id
                                            ) ? (
                                                <Button
                                                    onClick={() =>
                                                        handleAssignOrRemoveRoleFromUser(
                                                            role.id
                                                        )
                                                    }
                                                    variant="destructive"
                                                >
                                                    {" "}
                                                    <Trash />{" "}
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        handleAssignOrRemoveRoleFromUser(
                                                            role.id
                                                        )
                                                    }
                                                    variant="secondary"
                                                >
                                                    {" "}
                                                    <Plus />{" "}
                                                </Button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserRolesDialog;
