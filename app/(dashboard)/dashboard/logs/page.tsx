import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { LogsAnalytics } from "@/components/logs-analytics"

export const Logs = () => {
    return (
        <DashboardShell>
        <DashboardHeader heading="Logs Analytics" text="Explore all the logs and everything around you" />
        <LogsAnalytics />
       
        </DashboardShell>
    )
}

export default Logs