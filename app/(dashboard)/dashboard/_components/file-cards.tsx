'use client'

import React from 'react'
import { type File } from '@prisma/client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { CircleIcon, Clock, Dot, DotSquare, StarIcon, StarsIcon } from 'lucide-react'
import { timeAgo } from '@/lib/utils'
import { FileShareBtn } from './share-file'

type fileProps = {
    file: Promise<File[]>;
}

const FileCards = ({ file }: { file: File }) => {

    console.log('Files is : ' , file)
    return (

        <Card
            key={file.id}
            className="overflow-hidden rounded-xl relative  bg-gradient-to-tr from-purple-400/10 via-transparent to-transparent"
        >

            <FuzzyOverlay />

            <CardHeader className="grid grid-cols-[1fr_10px] items-start gap-4 space-y-0 relative">
                <div className="space-y-3">
                    <CardTitle>{file.name}</CardTitle>

                    <CardDescription>{file.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="absolute top-2 right-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                                <Dot className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                   <FileShareBtn file={file} />
                            <DropdownMenuItem>Add Favorite</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {/* <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Labels
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={task.label}>
                        {labels.map((label) => (
                          <DropdownMenuRadioItem
                            key={label.value}
                            value={label.value}
                        >
                            {label.label}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub> */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Delete
                                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex space-x-4 text-sm text-muted-foreground">

                    <div className="flex items-center">
                        <StarsIcon className="mr-1 h-3 w-3" />
                        20k
                    </div>
                    <br />
                </div>
                <div className="flex mt-2 justify-between text-muted-foreground">
                    <div className="flex items-center space-x-1 rounded-md bg-transparent text-secondary-foreground ">

                        <Separator orientation="vertical" className="h-[20px]" />
                    </div>
                    <div className="absolute flex justify-center  items-center gap-1 text-sm text-muted-foreground bottom-4 right-3">
                        <Clock className='w-3 h-3'/><p>{timeAgo(file.createdAt)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )


}

export default FileCards