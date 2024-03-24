import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

import { Badge } from "@/components/ui/badge"
import { GitBranchIcon, GitCommitIcon, MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Logs } from "@prisma/client"
const LogsDisplay = ({ log }: { log: Logs }) => {
    return (
        <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-transparent">
            <div className="p-2 grid gap-1 flex-1">
                <div className="font-medium">{log.id.slice(0, 6)}</div>
                <div className="text-gray-500 dark:text-gray-400">
                    Production
                    <Badge className="bg-white dark:bg-transparent" variant="outline">
                        Current
                    </Badge>
                </div>
            </div>
            <Separator className="my-2 lg:hidden" />
            <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-start gap-2">
                    {log.status === 'GRANTED' ? (
                        <div>
                            <span className="inline-flex w-3 h-3 bg-green-400 rounded-full translate-y-1" />
                            Viewed
                            <div>
                                <div className="text-gray-500 dark:text-gray-400">{log.responseTime}/1000 s</div>
                            </div>
                        </div>
                    ) : <div>
                        <span className="inline-flex w-3 h-3 bg-red-400 rounded-full translate-y-1" />
                        Denied
                        <div>
                            <div className="text-gray-500 dark:text-gray-400">{log.responseTime}/1000 s</div>
                        </div>
                    </div>}


                </div>
            </div>
            <Separator className="my-2 lg:hidden" />
            <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2">
                    <GitBranchIcon className="w-4 h-4" />
                    main
                </div>
                <div className="flex items-center gap-2">
                    <GitCommitIcon className="w-4 h-4" />
                    <span className="line-clamp-1">fix: auth issues for third-party integration</span>
                </div>
            </div>
            <Separator className="my-2 lg:hidden" />
            <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">17m ago by shadcn</div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="absolute top-4 right-4" size="sm" variant="ghost">
                        <MoreHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Deployment</DropdownMenuItem>
                    <DropdownMenuItem>Redeploy</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>Rollback</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default LogsDisplay