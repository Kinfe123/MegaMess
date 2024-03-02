'use client'


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MultiFileDropzone } from "./file-upload"
import { Icons } from "@/components/shared/icons"
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import type { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { fileSchema } from "@/lib/validations/file"
import { uploadFile , type FormData } from "@/actions/create-file"
import FilePage from "./file-display"

type UserProps = {
    userId: string,
}
const FileForm = ({ userId }:UserProps) => {
    console.log('THe user is : ' , userId)
    const [isPending, startTransition] = useTransition()
    const [fileDataOnly , setFileDataOnly] = useState({
        fileUrl: '',
        size: 0,
    })
    const handleParentUpdate = (newVal) => {
        console.log('THe file is here; ' , newVal)
        setFileDataOnly({...fileDataOnly  , fileUrl: newVal})
      }
    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm<FormData>({
        resolver: zodResolver(fileSchema),
        defaultValues: {
          name: "",
          fileUrl: "",
          userId: userId || ''
            
        },
      })
    const onSubmit = () => {

    }
    return (
        <Dialog>
            {/* {<p className="flex    mx0-auto tracking-normal text-muted-foreground justify-center items-center mt-10 ">You have already applied for the job!</p> } */}
            <DialogTrigger asChild>
                {/* {jobApplied.includes(jobId) && (<Button variant="outline" size='lg' className="bg-gray-800 text-white   transition ease-in-out duration-150 dark:bg-white  dark:text-black" disabled={true}>Applied</Button>) } */}


                <Button
                    variant="outline"
                    size="lg"
                    className="bg-gray-800 my-5 mb-10 text-white  ml-auto flex justify-center items-center   transition ease-in-out duration-150 dark:bg-white  dark:text-black"
                //   disabled={applied}
                >
                    Upload File
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Upload a file</DialogTitle>
                    <DialogDescription>
                        Feed a mess and we will handle the rest 
                    </DialogDescription>
                </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">

                            <Label htmlFor="name"  className="text-right">
                                First Name
                            </Label>

                            <Input
                               id="name"
                               size={32}
                                className="col-span-3"
                                {...register("name")}
                            />
                    </div>
                 

                
                    

                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Upload A File
                        </span>
                    </div>
                    <div className="flex justify-end items-end">
                        <FilePage updateData={handleParentUpdate} />
                    </div>
                </div>
                <DialogFooter>
                    <button
                        className={cn(buttonVariants())}
                        disabled={isPending}
                       
                    >
                        {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                        Submit
                    </button>
            </DialogFooter>
                </form>
        </DialogContent>
    </Dialog >
    )
}

export default FileForm