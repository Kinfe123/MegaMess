import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

import { Badge } from "@/components/ui/badge"
import { GitBranchIcon, GitCommitIcon, MoreHorizontalIcon, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Logs } from "@prisma/client"
import { fileById } from "@/lib/file-info"
import { timeAgo } from "@/lib/utils"
import DeleteLogs from "./log-delete"
const LogsDisplay = async ({ log }: { log: Logs }) => {
    const file = await fileById(log.fileId)
    return (
        <div className="flex flex-col lg:flex-row border-b-[0.1px] border-white/10 bg-white text-sm p-2 relative dark:bg-transparent">
            <div className="p-2 grid gap-1 flex-1">
                <div className="font-medium">{log.id.slice(0, 10)}</div>
                <div className="text-gray-500 dark:text-gray-400">
                    Production
                    <Badge className="bg-white dark:bg-transparent" variant="outline">
                        {file?.name}
                    </Badge>
                </div>
            </div>
            <Separator className="my-2 lg:hidden" />
            <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-start gap-2">
                    {log.status === 'GRANTED' ? (
                        <div className="flex flex-col justify-center items-start">
                            <div className="flex">
                                <span className=" w-2 h-2 mr-2 flex justify-center tiems-center bg-green-400 rounded-full translate-y-1.5" />
                                <p>Viewed</p>

                            </div>
                            <div>
                                <div className="text-gray-500 dark:text-gray-400">{log.responseTime}     s</div>
                            </div>
                        </div>
                    ) :
                        log.status === 'REQUESTED' ? (
                            <div className="flex flex-col justify-center items-start">
                                <div className="flex">
                                    <span className=" w-2 h-2 mr-2 flex justify-center tiems-center bg-orange-400 rounded-full translate-y-1.5" />
                                    <p>Requested</p>

                                </div>
                                <div>
                                    <div className="text-gray-500 dark:text-gray-400">{log.responseTime}     s</div>
                                </div>
                            </div>
                        ) :
                            <div className="flex flex-col justify-center items-start">
                                <div className="flex">
                                    <span className=" w-2 h-2 mr-2 flex justify-center tiems-center bg-red-400 rounded-full translate-y-1.5" />
                                    <p>Denied</p>

                                </div>
                                <div>
                                    <div className="text-gray-500 dark:text-gray-400">{log.responseTime}     s</div>
                                </div>
                            </div>
                    }


                </div>
            </div>
            <Separator className="my-2 lg:hidden" />
            <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2">
                    <GitBranchIcon className="w-4 h-4" />
                    {file?.name! ?? ""}
                </div>
                <div className="flex items-center gap-2">
                    <GitCommitIcon className="w-4 h-4" />
                    <span className="">{log.description ?? ""}</span>
                </div>
            </div>
            <Separator className="my-2 lg:hidden" />
            <div className="p-2 grid gap-2 flex-1">
                <div className="flex justify-center ml-auto mr-20 items-center gap-2 text-gray-500 dark:text-gray-400">{timeAgo(log.createdAt)}</div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="absolute top-4 right-4" size="sm" variant="ghost">
                        <MoreHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                   
                    <DeleteLogs id={log.id}/>
                    <Separator />
                    <DropdownMenuItem disabled>Rollback</DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default LogsDisplay