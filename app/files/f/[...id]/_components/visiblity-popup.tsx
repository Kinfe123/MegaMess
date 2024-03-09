'use client'
import React, { useState } from 'react'
import { type File } from '@prisma/client'
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
export function VisiblityBtn({ file }: { file: File }) {
    console.log('the file visibiltity is : ', file)
    const typeOfVisiblity = ['PUBLIC', 'EMAIL', 'PRIVATE']
    const defaultVal = typeOfVisiblity.indexOf(file.visiblity)
    const [dropType, setDropType] = useState(0)
    const [eachEmail, setEachEmail] = useState('')
    const [emails, setEmails] = useState<string[]>([])
    const [pending, startTransition] = useTransition()

    //   const isFav = fileId === 
    const handleClick = () => {

        startTransition(() => {
            fileVisiblity(file.id, typeOfVisiblity[dropType]).then((data) => {
                toast({
                    title: "Visibility Changed",
                    description: `${file.name} File visibility is changed to ${typeOfVisiblity[dropType]}`
                })

            }).catch((err) => {
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
                    <AlertDialogTitle>Change the visiblity of the file - [STILL in dev]</AlertDialogTitle>
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
                    <Button disabled={pending} variant={'default'} onClick={handleClick}>

                        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Continue</Button>
                </AlertDialogFooter>
            </AlertDialogContent>



        </AlertDialog>
    )
}

export const SelectVisiblity = () => {


}