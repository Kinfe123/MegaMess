import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { type File } from "@prisma/client"
import { Suspense } from "react";
import { BodySkeleton } from "../page";
type FilePromiseProps = {
    file: Promise<({ user: { image: string | null; name: string | null; }; } & File) | null>

};
const FileDescription = async ({ file }: FilePromiseProps) => {
    const files = await file

    return (
        <>

            <EmptyPlaceholder className="bg-gradient-to-tr from-purple-400/10 rounded-md  via-transparent to-transparent/5 w-full flex justify-start ">
                <EmptyPlaceholder.Icon name="post" />
                <Suspense fallback={<BodySkeleton />}>

                    <EmptyPlaceholder.Title className="font-heading text-3xl"> <span className='text-gradient_indigo-purple font-extrabold'>{files?.name}</span></EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                        {files?.description}
                    </EmptyPlaceholder.Description>
                    <div className='flex justify-center items-center mx-auto'>


                    </div>
                </Suspense>
            </EmptyPlaceholder>


        </>
    )
}

export default FileDescription