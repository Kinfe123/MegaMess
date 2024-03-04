'use client'
import { fileDelete } from "@/actions/file-actions"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
export function FileDeleteBtn({fileId }: {fileId: string }) {
    const [pending , startTransition] = useTransition()
    const handleClick = () => {
        startTransition(() => {
            fileDelete(fileId).then((file: {status: string , name: string | undefined}) =>  toast({
                title: "Deleted Successfully.",
                description: `The file - ${file.name} has successfully deleted!`,
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <p className='relative inline cursor-pointer ml-2 '>Delete</p>
            
        </AlertDialogTrigger>
        <AlertDialogContent className='bg-gradient-to-br from-purple-400/10 rounded-md  via-transparent to-transparent/5'>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. May be on the feature we might add it on trash but for now it will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button disabled={pending} variant={'default'} onClick={handleClick}>
                
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  