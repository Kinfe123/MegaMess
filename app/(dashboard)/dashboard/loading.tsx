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
    <DashboardShell className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
     
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
    
    </DashboardShell>
  )
}