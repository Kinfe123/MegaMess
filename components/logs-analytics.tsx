
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function LogsAnalytics() {
  return (
    <div className="flex flex-col w-full min-h-screen">
  
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-transparent flex-1 flex-col gap-4 p-4 md:gap-8 md:pr-10 dark:bg-transparent">
        
        <div className="grid gap-6 max-w-6xl w-full mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <Input className="bg-white md:flex-1 dark:bg-transparent" placeholder="Search deployments..." type="search" />
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="pl-3 flex-1 text-black  bg-white justify-start" variant="outline">
                    <CalendarClockIcon className="mr-2 h-4 w-4 shrink-0" />
                    Select Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto p-0">
                  <Calendar mode="range" numberOfMonths={2} />
                </PopoverContent>
              </Popover>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-white dark:bg-transparent" variant="outline">
                    Status
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem checked>Ready</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="border rounded-lg bg-purple-900/5 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,176,225,0.12),rgba(255,255,255,0))]  text-card-foreground overflow-hidden grid gap-4 lg:gap-px ">
            <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-transparent">
              <div className="p-2 grid gap-1 flex-1">
                <div className="font-medium">AdIqWrked</div>
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
                  <span className="inline-flex w-3 h-3 bg-green-400 rounded-full translate-y-1" />
                  <div>
                    Ready
                    <div className="text-gray-500 dark:text-gray-400">2m 35s</div>
                  </div>
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
            <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-transparent">
              <div className="p-2 grid gap-1 flex-1">
                <div className="font-medium">PMVpfLNj</div>
                <div className="text-gray-500 dark:text-gray-400">Preview</div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-start gap-2">
                  <span className="inline-flex w-3 h-3 bg-green-400 rounded-full translate-y-1" />
                  <div>
                    Ready
                    <div className="text-gray-500 dark:text-gray-400">1m 23s</div>
                  </div>
                </div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2">
                  <GitBranchIcon className="w-4 h-4" />
                  max/logging
                </div>
                <div className="flex items-center gap-2">
                  <GitCommitIcon className="w-4 h-4" />
                  <span className="line-clamp-1">feat: implement action logging</span>
                </div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">32m ago by maxleiter</div>
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
            <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-transparent">
              <div className="p-2 grid gap-1 flex-1">
                <div className="font-medium">YP47Kdjb</div>
                <div className="text-gray-500 dark:text-gray-400">Preview</div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-start gap-2">
                  <span className="inline-flex w-3 h-3 bg-red-400 rounded-full translate-y-1" />
                  <div>
                    Failed
                    <div className="text-gray-500 dark:text-gray-400">4m 22s</div>
                  </div>
                </div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2">
                  <GitBranchIcon className="w-4 h-4" />
                  shadcn/history-sidebar
                </div>
                <div className="flex items-center gap-2">
                  <GitCommitIcon className="w-4 h-4" />
                  <span className="line-clamp-1">feat: implement history sidebar</span>
                </div>
              </div>
              <Separator className="my-2 lg:hidden" />
              <div className="p-2 grid gap-1 flex-1">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">1 day ago by shadcn</div>
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
          </div>
        </div>
      </main>
    </div>
  )
}


function FrameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  )
}


function CalendarClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h5" />
      <path d="M17.5 17.5 16 16.25V14" />
      <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
    </svg>
  )
}


function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function GitBranchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  )
}


function GitCommitIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <line x1="3" x2="9" y1="12" y2="12" />
      <line x1="15" x2="21" y1="12" y2="12" />
    </svg>
  )
}


function MoreHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}
