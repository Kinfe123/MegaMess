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
import { uploadFile, type FormData } from "@/actions/file-actions"
import FilePage from "./file-display"
import FuzzyOverlay from "@/components/fuzzy"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

type UserProps = {
    userId: string,
}
const FileForm = ({ userId }: UserProps) => {
    console.log('THe user is : ', userId)
    const [isPending, startTransition] = useTransition()
    const [fileDataOnly, setFileDataOnly] = useState({
        fileUrl: '',
        
    })
    const uploadFileById = uploadFile.bind(null , userId , fileDataOnly.fileUrl)
    const handleParentUpdate = (newVal) => {
        console.log('THe file is here; ', newVal)
        setFileDataOnly({ ...fileDataOnly, fileUrl: newVal })
    }
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(fileSchema),
        defaultValues: {
            name: "",
            description:''
         

        },
    })
    const onSubmit = handleSubmit(data => {
        startTransition(async () => {
            console.log("Iam heere : " , data)
              const { status } = await uploadFileById(data); 
              console.log('the result is: ' , status)  
              if (status !== "success") {
                toast({
                  title: "Something went wrong.",
                  description: "There is an error while uploading file.",
                  variant: "destructive",
                })
              } else {
                toast({
                  description: "You have uploaded the file",
                })
              }
        });

    });
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
            <DialogContent className="sm:max-w-[500px] relative overflow-hidden mt-[-500px] bg-gradient-to-tr from-purple-400/15 via-transparent to-transparent/70">
                <DialogHeader>
                    <DialogTitle>Upload a file</DialogTitle>
                    <DialogDescription>
                        Feed a mess and we will handle the rest
                    </DialogDescription>



                </DialogHeader>
                <FuzzyOverlay />
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">

                            <Label htmlFor="name" className="text-right">
                                Name for file
                            </Label>


                            <Input
                                id="name"
                                size={32}
                                className="col-span-3"
                                {...register("name")}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">

                            <Label htmlFor="name" className="text-right">
                                Descriptions
                            </Label>


                            <Input
                                id="description"
                                size={32}
                                className="col-span-3"
                                {...register("description")}
                            />
                        </div>





                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Upload A File
                            </span>
                        </div>
                        <div className="flex justify-center items-center">
                            <FilePage updateData={handleParentUpdate} />
                        </div>
                    </div>
                    <DialogFooter>
                        <button
                            className={cn(buttonVariants(), 'flex justify-center items-center mx-auto')}
                            disabled={isPending}
                            type="submit"

                        >
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default FileForm