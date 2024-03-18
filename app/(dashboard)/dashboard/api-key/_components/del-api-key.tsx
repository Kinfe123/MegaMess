'use client'
import { deleteApiKey } from "@/actions/api-key-actions"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Loader, Loader2 } from "lucide-react"
import { useTransition } from "react"
const DeleteBtnApiKey = ({id}: {id:string}) => {
    const [pending, startTransition] = useTransition()
    const handleClick = () => {
        startTransition(() => {
            deleteApiKey(id).then((apiKy) => toast({
                title: "Deleted Successfully.",
                description: `The api key has successfully deleted!`,
            })).catch((err) => {
                toast({
                    title: "Something went wrong.",
                    description: "There is an error while deleting the file.",
                    variant: "destructive",
                })
            })
        })
    }

    return (
            <Button onClick={handleClick} disabled={pending} size="sm" variant="outline">
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete
            </Button>


    )

}
export default DeleteBtnApiKey