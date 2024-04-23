import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"

import { favByFileId, files } from "@/lib/fille"
import { Suspense } from "react"
import FileCards from "./_components/file-cards"
import FileForm from "./_components/upload-form"
import EmptyBox from "./_components/empty-box"
import { FileSkeleton } from "./loading"
import { getFUllUserById } from "@/lib/user"
import { CardSkeleton } from "@/components/shared/card-skeleton"
import { findPin, pinFile } from "@/actions/file-actions"
import { Separator } from "@/components/ui/separator"
export const metadata = {
  title: "File Dashboard",
  description: "Let us push the file to mess world"
}

export default async function DashboardPage() {

  const user = await getCurrentUser()


  if (!user) {
    redirect("/login")
  }
  const result = files(user.id)



  return (
    <DashboardShell>
      <DashboardHeader heading="Upload & Share File" text="Create and a huge mess and lets handle the rest.">
        <FileForm userId={user.id} />
      </DashboardHeader>

      {!(await result).length && (
        <Suspense fallback={<FileSkeleton />}>
          <EmptyBox userId={user.id} title={'Files'} />
        </Suspense>
      )}
      <div className="flex flex-col gap-5">

            <TrailFileWrapper />
             <TrailFileWrapperUnPin />

      </div>
    </DashboardShell>
  )
}


const pinnedFileDisplay = () => {
  return (
    <div className="flex flex-col justify-center items-start">
      <h1 className=''>Pinned File</h1>
      <div>

      </div>

    </div>
  )
}


const TrailFileWrapper = async () => {
  const user = await getCurrentUser()
  if (!user) {
    return null
  }
  const res = await files(user.id)
  const pinnedFilter = res.filter((r)=>r.pinned)
  if (!pinnedFilter.length) {
    return <div className="flex justify-start items-start">
      <p className=""></p>
    
    </div>
  }
  return (
    <div className="w-full">
    <h1 className='text-2xl md:text-3xl '>Pinned File</h1>
  
  
      <Separator className='my-2' />
       <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5 lg:grid-cols-3">
      {res.map((r) => {
        if(r.pinned) {
          
          return (
            <Suspense fallback={<CardSkeleton/>}>
              <FileCards favved={favByFileId(r.id)} file={r} pinned={pinFile(r.id, r.pinned ?? false)} fileOwner={getFUllUserById(r.id)} />
            </Suspense>
          )
        }
      })}
      </div> 

    </div>
  )
}


const TrailFileWrapperUnPin = async () => {
  const user = await getCurrentUser()
  if (!user) {
    return null
  }
  const res = await files(user.id)

  const unppinedFilter = res.filter((r) => !r.pinned)
  if (!unppinedFilter.length) {
    return <div className="flex justify-start items-start">
      <p className=""></p>
    
    </div>
  }
  
  return (
    <div>

      <h1 className='text-2xl md:text-3xl font-heading '>Unpinned File</h1>
      <Separator className='my-2' />
      
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5 lg:grid-cols-3">
      {res.map((r) => {
        if(!r.pinned) {

          return (
            <Suspense fallback={<CardSkeleton />}>
              <FileCards favved={favByFileId(r.id)} file={r} pinned={pinFile(r.id, r.pinned ?? false)} fileOwner={getFUllUserById(r.id)} />
            </Suspense>
          )
        }
      })}
    </div>
    </div>
  )
}