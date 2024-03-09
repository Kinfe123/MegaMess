
'use client'
import React, { Suspense, use } from 'react'
import { type Favorite, type File } from '@prisma/client'
import { MoreHorizontal } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import FuzzyOverlay from '@/components/fuzzy'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button'
import { Clock, FileIcon } from 'lucide-react'
import { timeAgo } from '@/lib/utils'
import { FileShareBtn } from './share-file'
import { FileDeleteBtn } from '@/app/files/f/[...id]/_components/delete-popup'
import EditFileForm from './edit-popup'
import { FavBtn } from './fav-popup'
import { VisiblityBtn } from '@/app/files/f/[...id]/_components/visiblity-popup'
import { Icons } from '@/components/shared/icons'
import { Hint } from '@/components/hint'
import Link from 'next/link'
type fileProps = {
    file: Promise<File[]>;
}

const FileCards = ({ file, favved }: { file: File, favved: Promise<Favorite[]> }) => {
    const promise = use(favved)
    const isFav = promise.filter((f) => f.fileId === file.id)
    console.log(file.visiblity.toLowerCase())
    const IconVisibility = Icons[file.visiblity.toLowerCase()]
    const hintTexts = {
        'PRIVATE': 'File is not shared with anyone',
        'PUBLIC': 'File is shared for anyone',
        'EMAIL': 'File is shared based on email'
    }
    const hintText = hintTexts[file.visiblity]
    return (
        <Card
            key={file.id}
            className="overflow-hidden cursor-pointer  rounded-xl relative  bg-gradient-to-tr from-purple-400/10 via-transparent to-transparent"
        >

            <FuzzyOverlay />

        <Link href={`/dashboard/file/${file.id}`}>
            <CardHeader className="grid grid-cols-[1fr_10px] items-start gap-4 space-y-0 relative">
                <div className="space-y-3">
                    <CardTitle>{file.name}</CardTitle>

                    <CardDescription>{file.description}</CardDescription>
                </div>
            </CardHeader>
        </Link>

            <CardContent>
                <div className="absolute top-2 right-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">

                            <EditFileForm file={file} />
                            <Separator className='w-full my-1' />
                            <FileShareBtn file={file} />
                            <Separator className='w-full my-1' />
                            <FavBtn fav={!!isFav.length} fileId={file.id} fileOwner={file.userId} />
                            <Separator className='w-full my-1' />
                            <VisiblityBtn file={file} />
                            <DropdownMenuSeparator />

                            <DropdownMenuSeparator />

                            <FileDeleteBtn fileId={file.id} />
                            <DropdownMenuShortcut className='absolute right-2 bottom-4'>⌘⌫</DropdownMenuShortcut>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex space-x-4 text-sm text-muted-foreground">

                    <div className="flex items-center">
                        <FileIcon className="mr-1 h-3 w-3 font-bold text-sm" />
                        {file.size}
                    </div>
                    <br />
                </div>

                <div className="flex mt-2 justify-between text-muted-foreground">
                    <div className="flex items-center space-x-1 rounded-md bg-transparent text-secondary-foreground ">

                        <Separator orientation="vertical" className="h-[20px]" />
                    </div>
                    <div className="absolute flex justify-center  items-center gap-1 text-xs text-muted-foreground bottom-4 right-3">
                        <Clock className='w-3 h-3' /><p>{timeAgo(file.createdAt)}</p>
                    </div>
                    <div className='absolute left-6 bottom-3'>
                        <Hint label={hintText} >
                            <IconVisibility className='w-4 h-4' />

                        </Hint>
                    </div>
                </div>
            </CardContent>
        </Card>
    )


}

export default FileCards