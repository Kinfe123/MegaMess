'use client'
import { useTransition, useState } from "react"
import { fileEdit, type FormData } from "@/actions/file-actions"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { fileSchema } from "@/lib/validations/file"
import { type File } from "@prisma/client"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/shared/icons"
const FileEditForm = ({ file }: { file: File }) => {
    const [isPending, startTransition] = useTransition()

    const editFileById = fileEdit.bind(null, file.id, file.fileUrl)

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
        <form onSubmit={onSubmit}>
            <CardContent className="flex flex-col gap-4">
                <div className="grid gap-1">
                    <Label className="text-muted-foreground mb-2" htmlFor="name">
                        Name
                    </Label>
                    <Input
                        id="name"
                        className="w-full sm:w-[400px]"
                        size={32}
                        {...register("name")}
                    />
                    {errors?.name && (
                        <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
                    )}
                </div>
                <div className="grid gap-1">
                    <Label className="text-muted-foreground mb-2" htmlFor="name">
                        First Name
                    </Label>
                    <Input
                        id="description"
                        className="w-full sm:w-[400px]"
                        size={32}
                        {...register("description")}
                    />
                    {errors?.description && (
                        <p className="px-1 text-xs text-red-600">{errors?.description.message ?? ""}</p>
                    )}
                </div>

            </CardContent>
            <CardFooter>
                <button
                    type="submit"
                    className={cn(buttonVariants())}
                    disabled={isPending}
                >
                    {isPending && (
                        <Icons.spinner className="mr-2 size-4 animate-spin" />
                    )}
                    <span>{isPending ? "Saving" : "Save"}</span>
                </button>
            </CardFooter>

        </form>
    )

}
export default FileEditForm