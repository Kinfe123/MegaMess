import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { type File } from "@prisma/client"
import { timeAgo } from "@/lib/utils";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton";
type FilePromiseProps = {
    file: Promise<({ user: { image: string | null; name: string | null; }; } & File) | null>

};
const FileDescription = async ({ file }: FilePromiseProps) => {
    const files = await file

    return (
        <>

            <EmptyPlaceholder className="bg-gradient-to-tr from-purple-400/10 rounded-lg  via-transparent to-transparent/5 w-full flex justify-start ">
                <EmptyPlaceholder.Icon name="post" />

                <EmptyPlaceholder.Title className="font-heading text-3xl"> <span className='text-gradient_indigo-purple font-extrabold'>{files?.name}</span></EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                    {files?.description}
                </EmptyPlaceholder.Description>
                <div className='flex font-urban justify-start items-start flex-col  mx-auto f'>
                    <div className="flex gap-2 justify-center items-center">

                        <Check className="w-4 h-4" />  <p className='text-muted-foreground '>File created <span className='font-bold'> {timeAgo(files?.createdAt!)}</span></p>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <Check className="w-4 h-4" />      <p className='text-muted-foreground '>File modified <span className="font-bold"> {timeAgo(files?.updatedAt!)} </span></p>
                    </div>




                </div>
                    <div className="mt-4 flex justify-center items-center">
                        <Link href={files?.fileUrl!}>

                            <Button variant='default'>
                        <Download className="w-4 h-4 mr-2"/>
                                    View & Download
                            </Button>
                        </Link>

                    </div>
            </EmptyPlaceholder>


        </>
    )
}

export default FileDescription

export const FileDescriptionSkeleton = () => {
    return (

        <EmptyPlaceholder className="bg-gradient-to-tr from-purple-400/10 rounded-md  via-transparent to-transparent/5 w-full flex justify-start ">
            <EmptyPlaceholder.Icon name="post" />
            <div className="flex flex-col gap-2">
                <BodySkeleton />



            </div>

        </EmptyPlaceholder>

    )
}

export const BodySkeleton = () => {
    return (
        <>
            <div className="flex flex-col gap-5 mt-10">

                <Skeleton className="w-72 h-4 rounded-full" />
                <Skeleton className="w-72 h-4 rounded-full" />
                <Skeleton className="w-72 h-4 rounded-full" />
                <Skeleton className="w-72 h-4 rounded-full" />
                <Skeleton className="w-72 h-4 rounded-full" />


            </div>
        </>
    )
}