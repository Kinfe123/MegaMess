import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { generateApiKey } from "@/lib/utils"

export function ApiKeys() {
  return (
    <div className="flex flex-col w-full min-h-screen">
     
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="flex flex-col gap-8 min-h-[calc(100vh-_theme(spacing.16))]">
          <div className="grid gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <KeyIcon className="w-8 h-8" />
                <div className="grid gap-1">
                  <CardTitle>Project Access</CardTitle>
                  <CardDescription>API key for accessing project endpoints</CardDescription>
                </div>
                <div className="flex flex-row items-center gap-2 ml-auto">
                  <Button size="sm">Copy</Button>
                  <Button size="sm" variant="outline">
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">Created 2 days ago</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <KeyIcon className="w-8 h-8" />
                <div className="grid gap-1">
                  <CardTitle>Website Access</CardTitle>
                  <CardDescription>API key for accessing website endpoints</CardDescription>
                </div>
                <div className="flex flex-row items-center gap-2 ml-auto">
                  <Button size="sm">Copy</Button>
                  <Button size="sm" variant="outline">
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">Created 1 day ago</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <KeyIcon className="w-8 h-8" />
                <div className="grid gap-1">
                  <CardTitle>App Access</CardTitle>
                  <CardDescription>API key for accessing app endpoints</CardDescription>
                </div>
                <div className="flex flex-row items-center gap-2 ml-auto">
                  <Button size="sm">Copy</Button>
                  <Button size="sm" variant="outline">
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-gray-500 dark:text-gray-400">Created 3 days ago</span>
                </div>
              </CardContent>
            </Card>
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


function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function KeyIcon(props) {
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
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  )
}


function CalendarIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}
