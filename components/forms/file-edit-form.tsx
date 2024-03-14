'use client'
import { useTransition , useState } from "react"
import { fileEdit , type FormData } from "@/actions/file-actions"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { fileSchema } from "@/lib/validations/file"
import { type  File } from "@prisma/client"
const FileEditForm = ({file}: {file: File}) => {
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
    return (
        <div>

        </div>
    )

}
export default FileEditForm