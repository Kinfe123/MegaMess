import { fileInfo, findUserByFile } from "@/lib/file-info"

type FilePreviewProps = {
    params: {
        id: string[]
    }
}
const FilePreview = async ({params}: FilePreviewProps) => {
    const fullUrl = fileInfo(params.id[0])
    const user = await findUserByFile(fullUrl)
    
    return (
        <div>
            hllo world
        </div>
    )
}

export default FilePreview