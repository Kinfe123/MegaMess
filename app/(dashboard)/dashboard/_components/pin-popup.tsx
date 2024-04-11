'use client'
import React from 'react'
import { fileDelete, fileFav, fileUnFav, getFileOwner, makePins, pinFile } from "@/actions/file-actions"
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
import { Pin  , File} from '@prisma/client'

export function PinBtn({fileId , pinned}: {fileId: string , pinned: File | null}) {
    const [pending , startTransition] = useTransition()
    const handleClick = () => {
        startTransition(() => {
            pinFile(fileId , pinned?.pinned!).then((res) => {
                toast({
                    title: "Pin File",
                    description: "You have pinned file" 
                })
            }).catch((err) => {
                toast({
                    title: "Something went wrong",
                    description: "There is an error while pinning the file",
                    variant: "destructive"
                })
            })
        })
    }
    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={pending} onClick={handleClick} className="w-full py-[-20px] flex justify-start items-center" variant={'ghost'} size={'sm'}>
           {pinned ? "Un": ""}Pin {pending ? <Loader2 className="ml-auto w-3 h-3 animate-spin" /> : ""}
  
          </Button>
  
        </AlertDialogTrigger>
  
      </AlertDialog>
    )
}