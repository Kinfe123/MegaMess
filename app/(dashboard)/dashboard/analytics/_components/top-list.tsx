import { Separator } from "@/components/ui/separator";
import { fileById } from "@/lib/file-info"
import { FilesIcon } from "lucide-react"

const TopLists = async ({ fileId }: { fileId: Record<string, number> }) => {
    const keys = Object.keys(fileId);
    const id = keys[0];
    const file = await fileById(id)
    return (
        <div className="flex items-center w-full">
            <FilesIcon />
            <div className="ml-4 space-y-1 w-3/4">
                <p className="text-sm font-medium leading-none">{file?.name}</p>
                <p className="text-sm text-muted-foreground">
                    {file?.description}
                </p>
            </div>
            <div className="ml-auto font-medium ">{fileId[id]} xp    </div>

        </div>
    )
}


export default TopLists
