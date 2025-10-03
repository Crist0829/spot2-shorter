import React from "react";
import Guest from "@/Layouts/GuestLayout";
import URLGuestForm from "@/components/forms/URLGuestForm";
import { LinkIcon } from "lucide-react";
import URLGuestTable from "@/components/tables/URLGuestTable";

const Home = ({ urls, flash }) => {
    console.log(urls);

    return (
        <Guest>
            <div className="w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-2xl">
                <h1 className="text-lg font-semibold flex items-center gap-2">
                    Acortar Link{" "}
                    <LinkIcon className="w-4 h-4 text-muted-foreground" />
                </h1>
                <h2 className="text-sm text-gray-800 flex items-center gap-2 mb-8">
                    Puedes acortar hasta 5 Links como invitado
                </h2>

                <URLGuestForm />
            </div>
            {urls.length > 0 && (
                <div className="w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-2xl">
                    <h1 className="text-lg font-semibold flex items-center gap-2">
                        Links Acortados
                        <LinkIcon className="w-4 h-4 text-muted-foreground" />
                    </h1>
                    <h2 className="text-sm text-gray-800 flex items-center gap-2 mb-8">
                        Listado de links acortadoss
                    </h2>

                    <URLGuestTable urls={urls}/>
                </div>
            )}
        </Guest>
    );
};

export default Home;
