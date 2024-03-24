import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { LogsAnalytics } from "@/components/logs-analytics"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fileLogbyUser } from "@/lib/file-info"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const Logs = async () => {
    const userId = await fileLogbyUser()

    
    return (
        <DashboardShell>
        <DashboardHeader heading="Logs Analytics" text="Explore all the logs and everything around you" />
        <Suspense fallback={<LogsSkeleton />}>
        <LogsAnalytics />

        </Suspense>
       
        </DashboardShell>
    )
}

export default Logs


const LogsSkeleton = () => {
    return (
        <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4">
            <div className="grid gap-1">
                <CardTitle><Skeleton className='w-14 h-5' /></CardTitle>
                <CardDescription><Skeleton className="w-24 h-10" /></CardDescription>
            </div>

        </CardHeader>


    </Card>
    )
}