import { ApiKeys } from "@/components/api-keys"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Separator } from "@/components/ui/separator"
import ApiKeyForm from "./_components/api-key-form"
import { getCurrentUser } from "@/lib/session"

const APIKey = async () => {
    const user = await getCurrentUser()
    if(!user) {
        return null
    }
    return (
        <DashboardShell>
            <DashboardHeader heading="API Keys" text="Create an APIkey and build app on top of it.">
            <ApiKeyForm userId={user.id} />
            
            </DashboardHeader>
            <Separator />
            <ApiKeys />
        </DashboardShell>

    )
}

export default APIKey