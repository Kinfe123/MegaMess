import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export const metadata = {
    title: "Favourite",
    description: "Manage your favourite.",
  }
  



  export async function FavouritePage() {
    const user = await getCurrentUser()
    if(!user) {
        redirect('/login')
    }
    return (
        <div>


        </div>
    )

}