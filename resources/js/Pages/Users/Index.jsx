import UserDialog from "@/components/users/UserDialog";
import UsersTable from "@/components/users/UsersTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Index = ({ auth, users, roles }) => {

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Administrar usuarios
        </h2>
      }
    >
      <Head title="Usuarios" />

      <section className="mx-auto px-4">
        <h1 className="text-center text-3xl sm:text-4xl font-bold my-8 text-gray-800">
          Usuarios
        </h1>

        <div className="flex justify-end mb-6">
          <UserDialog
            triggerLabel="Agregar usuario"
          
          >
            <p className="text-sm text-gray-600">
              Acá podés meter cualquier contenido adicional o un formulario.
            </p>
          </UserDialog>
        </div>

        {users.length > 0 ? (
          <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
            <UsersTable users={users} />
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <h2 className="text-lg font-medium text-gray-500">
              No aún no se han registrado usurios
            </h2>
          </div>
        )}
      </section>
    </Authenticated>
  );
};

export default Index;
