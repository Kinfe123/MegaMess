import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Separator } from "@/components/ui/separator"

const APIKey = () => {
    return (
        <DashboardShell>
            <DashboardHeader heading="API Keys" text="Create an APIkey and build app on top of it.">
            </DashboardHeader>
            <Separator />
        </DashboardShell>

    )
}

export default APIKey