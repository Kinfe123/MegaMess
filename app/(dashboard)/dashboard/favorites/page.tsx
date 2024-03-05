import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { files } from "@/lib/fille"


export const metadata = {
    title: "Favourite",
    description: "Manage your favourite.",
}

export default async function FavouritePage() {
    const user = await getCurrentUser()
    if (!user) {
        redirect('/login')
    }
    const result = files(user.id)
    
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Favorites"
                text="Manage account and website Favorites."
            />
            <div className="grid gap-10">
                    
            </div>
        </DashboardShell>
    )

}