import { CalendarDateRangePicker } from "./_components/date-picker";
import { Overview } from "./_components/overview";
import { RecentSales } from "./_components/recent-shares";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fileByUserId, fileLogbyUser, totalDownload } from "@/lib/file-info";
import { getCurrentUser } from "@/lib/session";
import { Suspense } from "react";
import CardDisplay from "./_components/card-display";
import { Download, FileIcon, Key, PipetteIcon } from "lucide-react";
import { getAllApiKey } from "@/actions/api-key-actions";

export default async function page() {
  const user = await getCurrentUser()
  const files = fileByUserId(user?.id! ?? "")
  const fileLogs = fileLogbyUser()
  const fileDownloads = fileByUserId(user?.id ?? "")
  const apikeys = getAllApiKey()
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi {user?.name + " " ?? ''} , Welcome back 👋
          </h2>
          <div className="hidden md:flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Suspense fallback={<CardSkeleton />}>

                <CardDisplay file={files} title="Total Files" icon={
                  <FileIcon className="text-white/50 group-hover:opacity-100  opacity-50 transform transition-opacity duration-300 absolute bottom-[-35px] w-32 h-32 font-thin  right-[-30px] " />
                } description={''} />
              </Suspense>
              <Suspense fallback={<CardSkeleton />}>

                <CardDisplay file={fileLogs} title="Total Logs" icon={
                  <PipetteIcon className="text-white/50 group-hover:opacity-100  opacity-50 transform transition-opacity duration-300 absolute bottom-[-35px] w-32 h-32 font-thin  right-[-30px] " />
                } description={''} />
              </Suspense>

              <Suspense fallback={<CardSkeleton />}>

                <CardDisplay file={fileDownloads} title="Total Downloads" icon={
                  <Download className="text-white/50 group-hover:opacity-100  opacity-50 transform transition-opacity duration-300 absolute bottom-[-25px] w-32 h-32 font-thin  right-[-30px] " />
                } description={''} />
              </Suspense>

              <Suspense fallback={<CardSkeleton />}>
                {/* @ts-ignore */}
                <CardDisplay file={apikeys} title="Total APIKeys  " icon={
                  <Key className="text-white/50 group-hover:opacity-100  opacity-50 transform transition-opacity duration-300 absolute bottom-[-25px] w-32 h-32 font-thin  right-[-30px] " />
                } description={''} />
              </Suspense>
              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscriptions
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card> */}
              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card> */}
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}

const CardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="w-48 h-6" />
        </CardTitle>
        {/* <Skeleton className="w-10 h-7 my-1" /> */}
      </CardHeader>
      <CardContent>
        <Skeleton className="w-20 h-5 my-1" />
        <Skeleton className="w-32 h-4" />

      </CardContent>
    </Card>
  )
}

