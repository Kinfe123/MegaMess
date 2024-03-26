import { useTransition } from "react"
import { Loader, Trash } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { logDeleteById } from "@/actions/log-actions"
import { toast } from "@/components/ui/use-toast"
const DeleteLogs = ({id}: {id: string}) => {
    const [pending , startTransition] = useTransition()
    const handleDelete = () => {
        startTransition(() => {
            logDeleteById(id).then((data) => {
                toast({
                    title: "Log Deleted!",
                    description: "You have sucessfully deleted the log"
                })
            }).catch((err) => {
                toast({
                    title:"Something went wrong",
                    description: "There is something went wrong while deleting the log",
                    variant:"destructive"
                })
            })

        })
    }
    return (
        <DropdownMenuItem onClick={handleDelete}>
            {pending ? <Loader className="w-3 h-3 animate-spin"/> : <Trash className="w-3 h-3"/> }
            <span>Delete</span>
        </DropdownMenuItem>
    )
}

export default DeleteLogs