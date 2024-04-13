
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { type Logs } from "@prisma/client"
import LogsDisplay from "./log-display"
import LogMenu from "./log-menu"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { files } from "@/lib/fille"
import { PipetteIcon } from "lucide-react"

export function LogsAnalytics({ logs }: { logs: Logs[] }) {
  if (!logs) {
    return <div className="mt-10 font-urban text-2xl">Nothing yet</div>
  }
  return (
    <div className="flex flex-col w-full min-h-screen">

      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-transparent flex-1 flex-col gap-4 p-4 md:gap-8 md:pr-10 dark:bg-transparent">

        <div className="grid gap-6 max-w-6xl w-full mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <Input className="bg-white md:flex-1 dark:bg-transparent" placeholder="Search logs..." type="search" />
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
            
                  <LogMenu />

            </div>
          </div>
          <div className="border rounded-lg bg-purple-900/5 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,176,225,0.12),rgba(255,255,255,0))]  text-card-foreground overflow-hidden grid gap-4 lg:gap-px ">
            
            {
            logs.length>0?(
            logs.map((log) => {
              return (
                
                <LogsDisplay log={log} />
              )
            })
            ):
            (
              <EmptyLog/>
            )
          }


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




function EmptyLog(){
  
return (
  <EmptyPlaceholder className="relative bg-gradient-to-tr from-purple-400/10 rounded-lg  via-transparent to-transparent/5 w-full flex justify-start ">
  <PipetteIcon size={45}/>

  <EmptyPlaceholder.Title className="font-heading text-3xl"> 
    No logs found
  </EmptyPlaceholder.Title>
  <EmptyPlaceholder.Description>
    <span className="">Your logs will be recorded once you or someone attempts to read you file</span>
  </EmptyPlaceholder.Description>


</EmptyPlaceholder>

)
}