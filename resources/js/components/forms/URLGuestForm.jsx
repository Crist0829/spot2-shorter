import { LinkIcon, Scissors } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { useForm } from "@inertiajs/react";



const URLGuestForm = () => {


    const {data, setData, post, errors, processing} = useForm({
        url : ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
        post(route('urls.createFromGuest'))
    }

    return (
        <form onSubmit={handleSubmit} className="my-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                <Label>URL: </Label>
                <Input
                    className="rounded-2xl"
                    id="url"
                    name="url"
                    onChange={(e) => setData("url", e.target.value)}
                />
                <Button className="rounded-2xl" type="submit" disabled={processing}> Acortar <Scissors/> </Button>
            </div>
        </form>
    )
}

export default URLGuestForm
