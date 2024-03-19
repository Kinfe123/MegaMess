import { ApiKeys } from "@/components/api-keys"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Separator } from "@/components/ui/separator"
import ApiKeyForm from "./_components/api-key-form"
import { getCurrentUser } from "@/lib/session"
import { apikeyById } from "@/actions/api-key-actions"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import APIKeyCard, { KeyIcon } from "./_components/api-key-card"
import { ExternalLink } from "lucide-react"

const APIKey = async () => {
    const user = await getCurrentUser()
    if (!user) {
        return null
    }
    const apiKeys = await apikeyById(user.id)
    return (
        <DashboardShell>
            <DashboardHeader heading="API Keys" text="Create an APIkey and build app on top of it.">
                <ApiKeyForm userId={user.id} />

            </DashboardHeader>
            <div className='flex gap-2'>
                Docs <ExternalLink className="w-3 h-3" />

            </div>
            <Separator />

            {!apiKeys.length && (
                <Suspense fallback={<Skeleton className="w-50 h-7" />}>

                    <div className="flex justify-center items-center mt-10">
                        <h1>You dont have any api key created so far</h1>

                    </div>
                </Suspense>
            )}
            {apiKeys.length && (
                <Suspense fallback={<ApiKeySkeleton/> }>
                    {apiKeys.map((apikey) => {
                        return (
                            <APIKeyCard apiKey={apikey}/>
                        )
                    })}

                </Suspense>
            )}
            {/* <ApiKeys /> */}
        </DashboardShell>

    )
}

export default APIKey


const ApiKeySkeleton = () => {
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
                <KeyIcon className="w-8 h-8" />
                <div className="grid gap-1">
                    <CardTitle><Skeleton className='w-14 h-5' /></CardTitle>
                    <CardDescription><Skeleton className="w-24 h-10" /></CardDescription>
                </div>

            </CardHeader>


        </Card>
    )
}