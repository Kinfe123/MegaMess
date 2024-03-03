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
type fileProps = {
    file: Promise<File[]>;
}

const FileCards = ({ file }: { file: File }) => {


    return (
        <Card className='relative overflow-hidden bg-gradient-to-tr from-purple-400/15 via-transparent to-transparent/70"'>
             <FuzzyOverlay />
            <CardHeader>
                <CardTitle>{file.name}</CardTitle>
                <CardDescription>
                    You are currently on the prime broooo!!
                </CardDescription>
            </CardHeader>
            <CardContent >{file.name}</CardContent>
        </Card>
    )


}

export default FileCards