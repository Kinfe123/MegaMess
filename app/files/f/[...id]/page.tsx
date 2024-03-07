import { fileInfo, findUserByFile } from "@/lib/file-info"
import FallBack from "./_components/fallback"
import { UserAvatar } from "@/components/user-avatar"
import FileDescription, { FileDescriptionSkeleton } from "./_components/empty-box"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"
import { getCurrentUser } from "@/lib/session"

type FilePreviewProps = {
    params: {
        id: string[]
    }
}
const FilePreview = async ({ params }: FilePreviewProps) => {
    const fullUrl = fileInfo(params.id[0])
    const result = findUserByFile(fullUrl)
    const user = await getCurrentUser()
    if (!result) {
        return <FallBack />
    }


    return (
        <div className="container gap-10 max-w-5xl mt-[100px]  mx-auto flex justify-center items-center flex-col">
            <h1
                className="animate-fade-up text-center  text-balance font-urban text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
            >
                File Shared on  {" "} <br />
                <span className="text-gradient_indigo-purple font-extrabold">
                    Mega Mess
                </span>
            </h1>
            <Suspense fallback={<AvatarSkeleton />}>
                <UserAvatar promise={result} />
            </Suspense>
            <Suspense fallback={<FileDescriptionSkeleton />}>
                <FileDescription file={result} />
            </Suspense>




        </div>
    )
}

export default FilePreview


const AvatarSkeleton = () => {
    return (
        <>
            <div className="flex gap-2">

                <Skeleton className="w-14 h-14 rounded-full" />
                <div className="flex gap-1 flex-col justify-center   items-start">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-28" />

                </div>

            </div>
        </>
    )
}
