import { CardSkeleton } from "@/components/shared/card-skeleton"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "./_components/date-picker"

export default function AnalyticsDashboard() {
    return (

        <div className="mt-10">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                    Hi , Welcome back 👋
                </h2>
                <div className="hidden md:flex items-center space-x-2">
                    <CalendarDateRangePicker />
                    <Button>Download</Button>
                </div>
            </div>
            <FileSkeleton />
        </div>
    )
}


export const FileSkeleton = () => {
    return (


        <DashboardShell className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3">

            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            {/* <CardSkeleton /> */}

        </DashboardShell>
    )
}