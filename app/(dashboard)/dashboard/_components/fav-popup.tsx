'use client'
import React from 'react'
import { fileDelete, fileFav, fileUnFav, getFileOwner } from "@/actions/file-actions"
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
import { use, useTransition } from "react"
import { toast } from "@/components/ui/use-toast"
import { Loader2, PieChartIcon } from "lucide-react"
export function FavBtn({ fileId, fileOwner  , fav}: { fileId: string, fileOwner: string , fav:boolean }) {
  const [pending, startTransition] = useTransition()
  //   const isFav = fileId === 
  
  const handleClick = () => {
    if(fav) {
      startTransition(() => {
        fileUnFav(fileOwner, fileId).then((file) => toast({
          title: "Favorite Removed.",
          description: `You have succesfully removed in your favoite lists!`,
        })).catch((err) => {
          toast({
            title: "Something went wrong.",
            description: "There is an error while deleting the file.",
            variant: "destructive",
          })
        })
      })

    }else {

      startTransition(() => {
        fileFav(fileOwner, fileId).then((file) => toast({
          title: "Favorite Added.",
          description: `You have succesfully added in your favoite lists!`,
        })).catch((err) => {
          toast({
            title: "Something went wrong.",
            description: "There is an error while deleting the file.",
            variant: "destructive",
          })
        })
      })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={pending} onClick={handleClick} className="w-full py-[-20px] flex justify-start items-center" variant={'ghost'} size={'sm'}>
         {fav ? "Un": ""}Favorite {pending ? <Loader2 className="ml-auto w-3 h-3 animate-spin" /> : ""}

        </Button>

      </AlertDialogTrigger>

    </AlertDialog>
  )
}
