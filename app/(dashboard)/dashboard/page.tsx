import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"
import { files } from "@/lib/fille"
import { Suspense } from "react"
import FileCards from "./_components/file-cards"
import FileForm from "./_components/upload-form"
import EmptyBox from "./_components/empty-box"
import { toSize } from "@/lib/utils"

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
        <Suspense fallback={<>Loading..</>}>
          <EmptyBox userId={user.id} />
        </Suspense>
      )}
      <div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          <Suspense fallback={<>loading...</>}>
            {(await result).map((file) => {
              return (
                <FileCards file={file} />

              )
            })}

          </Suspense>
        </div>
      </div>
    </DashboardShell>
  )
}
