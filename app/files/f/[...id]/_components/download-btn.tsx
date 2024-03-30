'use client'

import { Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { fileDownload } from "@/actions/file-actions"
const DownloadBtn = ({fileId , fileUrl}: {fileId: string , fileUrl: string}) => {
    const [pending , startTransition] = useTransition()
    const handleClick = () => {
        startTransition(() => {
            fileDownload(fileId).then((res) => console.log("THe re is: " , res)).catch(err => console.log(err))

        })
    }
    
    return (
        <Link href={fileUrl}>

        <Button variant='default' onClick={handleClick}>
            <Download className="w-4 h-4 mr-2" />
            View & Download
        </Button>
    </Link>
    )
}

export default DownloadBtn