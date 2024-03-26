"use client"

import { useTransition } from "react"
import { Loader, Trash } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { logDeleteById } from "@/actions/log-actions"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
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
        <button disabled={pending} className="px-1 py-2 text-sm cursor-pointer hover:bg-primary/10 rounded-md mb-1 flex w-full justify-start items-center" onClick={handleDelete}>
            {pending ? <Loader className="w-3 h-3 animate-spin mr-1"/> : <Trash className="w-3 h-3 mr-1"/> }
            <span>Delete</span>
        </button>
    )
}

export default DeleteLogs