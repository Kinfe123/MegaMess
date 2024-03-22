import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"

export const LogsAnalytics = () => {
    return (
        <DashboardShell>
        <DashboardHeader heading="Logs Analytics" text="Explore all the logs and everything around you" />
        </DashboardShell>
    )
}

export default LogsAnalytics