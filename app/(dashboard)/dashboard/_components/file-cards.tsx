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
type fileProps = {
    file: Promise<File[]>;
}

const FileCards = ({ file }: { file: File }) => {


    return (
        <Card>
            <CardHeader>
                <CardTitle>{file.name}</CardTitle>
                <CardDescription>
                    You are currently on the prime broooo!!
                </CardDescription>
            </CardHeader>
            <CardContent>{file.name}</CardContent>
        </Card>
    )


}

export default FileCards