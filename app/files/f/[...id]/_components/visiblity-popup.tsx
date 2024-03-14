'use client'
import React, { useState } from 'react'
import { User, Visibility, type File } from '@prisma/client'
import { fileDelete, fileFav, fileUnFav, fileVisiblity, getFileOwner } from "@/actions/file-actions"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { EyeOff, Eye, Mail } from 'lucide-react'
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
import { Plus } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { Loader2, PieChartIcon } from "lucide-react"
import { Input } from '@/components/ui/input'
import { getFUllUserById, getUserByFileId } from '@/lib/user'

type fileVisiblity = keyof typeof Visibility
export function VisiblityBtn({ file , fileOwner}: { file: File , fileOwner: User | null | undefined }) {
    
    const typeOfVisiblity: fileVisiblity[] = ['PUBLIC', 'EMAIL', 'PRIVATE']
    const defaultVal = typeOfVisiblity.indexOf(file.visiblity)
    const [dropType, setDropType] = useState(0)
    const [eachEmail, setEachEmail] = useState('')
    const [emails, setEmails] = useState<string[]>([])
    const [pending, startTransition] = useTransition()
    const [emailClick , setEmailClick ] = useState(false)

    //   const isFav = fileId === 
    const handleClick = async () => {
        startTransition(async () => {
            if(typeOfVisiblity[dropType] === 'EMAIL') {
                setEmailClick(true)
                const fileUrl = file.fileUrl.split('/')
                const name = fileOwner?.name ?? "A MegaMesser"
                const req = await fetch('/api/email' , {
                    method: 'POST',
                    body: JSON.stringify({
                        email: emails,
                        subject: "Invitation to Access file on MegaMess",
                        link: `${process.env.NEXT_PUBLIC_APP_URL}/files/f/${fileUrl[fileUrl.length - 1]}`,
                        content: `${name} has invited you to access the file shared on MegaMess`,
                        linkHelper: "Click here to access the file"
                    })
                })
                setEmailClick(false)
            }
            fileVisiblity(file.id, typeOfVisiblity[dropType], emails).then((data) => {
                toast({
                    title: "Visibility Changed",
                    description: `${file.name} file visibility is changed to ${typeOfVisiblity[dropType]}`
                })

            }).catch((err) => {
                console.log('Error is :' , err)
                toast({
                    title: "Something went wrong",
                    description: "There is a problem while changing the visibility of the file",
                    variant: "destructive",



                })
            })


        })


        // THIS HANDLES THE 
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full py-[-20px] flex justify-start items-center" variant={'ghost'} size={'sm'}>
                    Visibility
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-gradient-to-br from-purple-400/10 rounded-md  via-transparent to-transparent/5'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Change the visiblity of the file </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will change your file visiblity, which may affect your audience
                    </AlertDialogDescription>
                </AlertDialogHeader>


                <Select defaultValue={`${defaultVal}`} onValueChange={(val) => setDropType(parseInt(val))}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Visibility" />
                    </SelectTrigger>
                    <SelectContent defaultValue={typeOfVisiblity[dropType]}>
                        <SelectGroup>
                            <SelectLabel>Visiblity</SelectLabel>
                            <SelectItem value="0"><span className='flex justify-center items-center gap-2'><Eye className='w-4 h-4 text-muted-foreground' /> Public</span></SelectItem>
                            <SelectItem value="1"><span className='flex justify-center items-center gap-2'><Mail className='w-4 h-4 text-muted-foreground' />  Email Based </span></SelectItem>
                            <SelectItem value="2"><span className='flex justify-center items-center gap-2'><EyeOff className='w-4 h-4 text-muted-foreground' />  Private </span></SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
                {dropType === 1 && (
                    <div className='flex flex-col gap-2'>
                        {emails.map(email => {
                            return (
                                <div className='flex gap-2 justify-start items-center'>
                                    <Mail className='w-3 h-3' />
                                    <p>{email}</p>

                                </div>
                            )
                        })}
                        <div className='flex justify-center items-center gap-2'>
                            <Input type='email' value={eachEmail} onChange={(e) => setEachEmail(e.target.value)} />
                            <Button onClick={() => {
                                setEmails([...emails, eachEmail])
                                setEachEmail('')
                            }}> Add </Button>
                        </div>
                    </div>
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button disabled={pending || emailClick} variant={'default'} onClick={handleClick}>

                        {(pending || emailClick) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Continue</Button>
                </AlertDialogFooter>
            </AlertDialogContent>



        </AlertDialog>
    )
}

export const SelectVisiblity = () => {


}