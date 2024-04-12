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
      <div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          <Suspense fallback={<CardSkeleton />}>
            {(await result).map((file) => {
              return (
                <FileCards file={file} favved={favByFileId(file.id)} fileOwner={getFUllUserById(file.id)} pinned={pinFile(file.id , file.pinned!)} />

              )
            })}

          </Suspense>
        </div>
      </div>
    </DashboardShell>
  )
}
