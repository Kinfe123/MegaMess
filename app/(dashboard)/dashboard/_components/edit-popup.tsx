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
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { type File } from "@prisma/client"
import { fileSchema } from "@/lib/validations/file"
import { fileEdit, uploadFile, type FormData } from "@/actions/file-actions"
import FilePage from "./file-display"
import FuzzyOverlay from "@/components/fuzzy"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

type UserProps = {
    file: File
}
const EditFileForm = ({ file }: UserProps) => {
    const [isPending, startTransition] = useTransition()
    const [fileDataOnly, setFileDataOnly] = useState({
        fileUrl: file.fileUrl,

    })
    const editFileById = fileEdit.bind(null, file.id, fileDataOnly.fileUrl)
    const handleParentUpdate = (newVal) => {
        setFileDataOnly({ ...fileDataOnly, fileUrl: newVal })
    }
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(fileSchema),
        defaultValues: {
            name: file.name,
            description: file.description! ?? ''


        },
    })
    const onSubmit = handleSubmit(data => {
        startTransition(async () => {
            const { status } = await editFileById(data);
            console.log('the result is: ', status)
            if (status !== "success") {
                toast({
                    title: "Something went wrong.",
                    description: "There is an error while updating the file.",
                    variant: "destructive",
                })
            } else {
                toast({
                    description: "You have updated the file",
                })
            }
        });

    });
    return (
        <Dialog>
            <DialogTrigger asChild>


                <p className="cursor-pointer ml-2">Edit</p>

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

                            <div className="flex flex-col col-span-3 gap-2 justify-center items-end w-full">

                            <Input
                                id="name"
                                size={32}
                                className="col-span-3"
                                {...register("name")}
                            />
                            {errors?.name && (
                                <p className="px-1 text-xs col-span-3 text-center ml-auto text-red-600">{errors.name.message}</p>
                            )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">

                            <Label htmlFor="name" className="text-right">
                                Descriptions
                            </Label>
                            <div className="flex flex-col col-span-3 gap-2 justify-center items-end w-full">

                            <Textarea id="desciption" className="col-span-3" {...register("description")} placeholder="Type your message here." />
                            {errors?.name && (
                                <p className="px-1 text-xs col-span-3 text-center ml-auto text-red-600">{errors.name.message}</p>
                            )}
                            </div>

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
                            Update
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default EditFileForm