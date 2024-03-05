import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { files } from "@/lib/fille"
import { Suspense } from "react"
import FavCard from "../_components/fav-card"
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
             <div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          <Suspense fallback={<>loading...</>}>
            {(await result).map((file) => {
              return (
                <FavCard file={file} userId={user.id} />

              )
            })}

          </Suspense>
        </div>
      </div>
        </DashboardShell>
    )

}