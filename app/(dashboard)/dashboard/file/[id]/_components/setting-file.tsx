'use client'

import { fileDelete } from "@/actions/file-actions";
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react";
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type File } from "@prisma/client";
export default function SettingFile({ fileId , file }: { fileId: string , file: File }) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const handleClick = () => {
    startTransition(() => {
      fileDelete(fileId).then((file: { status: string, name: string | undefined }) => {
        router.push("/dashboard")
        toast({
          title: "Deleted Successfully.",
          description: `The file - ${file.name} has successfully deleted!`,
        })
      }).catch((err) => {
        toast({
          title: "Something went wrong.",
          description: "There is an error while deleting the file.",
          variant: "destructive",
        })
      })
    })

  }
  return (
    <div className='flex flex-col w-full  mr-auto'>
      <div className="bg-transparent border-red-500/40 border-[0.001px]  shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-white">Delete A File</h3>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm text-gray-500">
              <p>
                This action is undone , which delete a file permanently from file storage and sharing dashboard
              </p>
            </div>
            <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
              <Button
                disabled={pending}
                onClick={handleClick}
                type="button"
                variant={'destructive'}
                className="inline-flex items-center rounded-md  px-3 py-2 text-sm font-semibold ml-auto text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete File
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
