import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { favFiles, files } from "@/lib/fille"
import { Suspense } from "react"
import FavCard from "../_components/fav-card"
import EmptyBox from "../_components/empty-box"
import { FileSkeleton } from "../loading"
import FileCards from "../_components/file-cards"
export const metadata = {
  title: "Favourite",
  description: "Manage your favorite.",
}

export default async function FavouritePage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }
  const result = favFiles(user.id)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Favorites"
        text="Manage your favorites."
      />
      <div>

        {!(await result).length && (
          <Suspense fallback={<>Loading..</>}>
            <EmptyBox userId={user.id} title={'Favoite'} />
          </Suspense>
        )}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          <Suspense fallback={<FileSkeleton/>}>
            {(await result).map((file) => {
              return (
                <FavCard file={file} userId={user?.id} />

              )
            })}

          </Suspense>
        </div>
      </div>
    </DashboardShell>
  )


}

const FavWrappr = async ({id}: {id: string}) => {
  const result = await favFiles(id)
  if(!result.length) {
    return (
      <div className="flex justify-start items-startt">
        <p>There is no favorited files</p>
      </div>
    )
  }  
  return (
    <div>
      {result.map((res) => {
        return (
          
           <Suspense fallback={<FileSkeleton />}>

             <FavCard file={res} userId={id} />

           </Suspense> 
        )
      })}
    </div>
  )
}