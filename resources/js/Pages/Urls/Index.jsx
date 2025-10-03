import URLDialog from "@/components/urls/URLDialog";
import URLTable from "@/components/urls/URLTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Index = ({ auth, urls }) => {

    console.log(urls)

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Mis URLs
        </h2>
      }
    >
      <Head title="Mis Links" />

      <section className="mx-auto px-4">
        <h1 className="text-center text-3xl sm:text-4xl font-bold my-8 text-gray-800">
          Links acortados
        </h1>

        <div className="flex justify-end mb-6">
          <URLDialog 
            triggerLabel="Acortar link"
          
          >
            <p className="text-sm text-gray-600">
              Acá podés meter cualquier contenido adicional o un formulario.
            </p>
          </URLDialog>
        </div>

        {urls.length > 0 ? (
          <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
            <URLTable urls={urls} />
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <h2 className="text-lg font-medium text-gray-500">
              Aún no has acortado links
            </h2>
          </div>
        )}
      </section>
    </Authenticated>
  );
};

export default Index;
