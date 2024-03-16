import { CardSkeleton } from "@/components/shared/card-skeleton"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"

export default function DashboardLoading() {
    return (
        <FileSkeleton />
    )
}


export const FileSkeleton = () => {
    return (
        <DashboardShell className="w-full">
            <DashboardHeader heading="Analytics & Privillages" text="Explore in depth analytics and exploration about your files" />

            <div className="gap-2 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y rounded-md">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </DashboardShell>
    )
}