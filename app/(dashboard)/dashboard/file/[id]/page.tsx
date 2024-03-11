import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Separator } from "@/components/ui/separator"
import { CardSkeleton } from "@/components/shared/card-skeleton"
import { TabModified, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tab-modified"
import Waitlists from "./_components/waitlists"
import { Suspense } from "react"
import { waitlistEmailUsers } from "@/lib/file-info"
import { Building } from "lucide-react"
import SettingFile from "./_components/setting-file"

type PropsParams = {
    params: {
        id: string
    }
}

export const metadata = {
    title: "File Detail ",
    description: "Explore in details about your file"
}

const FileDetail = async  ({ params }: PropsParams) => {
    const fileId = params.id
    const users = await waitlistEmailUsers(fileId)
    const TABS = ['Waitlists', 'Analytics', 'Settings']

    return (
        <DashboardShell>
            <DashboardHeader heading="Analytics & Privillages" text="Explore in depth analytics and exploration about your files" />
            <TabModified defaultValue={TABS[0].toLowerCase()}>
                {TABS.map((tab) => {
                    return (<TabsList>
                        <TabsTrigger value={tab.toLowerCase()}>{tab}</TabsTrigger>
                    </TabsList>)

                })}
                <Separator className="w-full mb-4 mt-[-3px]" />
                <TabsContent value="waitlists" className="flex flex-col max-w-[76rem] ">
                    <Suspense fallback={<WaitlistSkeleton />}>
                           <Waitlists fileId={fileId} users={users}/>

                    </Suspense>
                </TabsContent>
                <TabsContent value="analytics" className="flex flex-col max-w-[76rem] ">
                    <Suspense fallback={<WaitlistSkeleton />}>
                            <div className="h-full flex justify-center items-center">
                                <h1 className="flex gap-2 justify-center items-center"><Building className="w-4 h-4"/>We are currently under construction :) Stay tuned till it released</h1>

                            </div>
                    </Suspense>
                </TabsContent>
                <TabsContent value="settings" className="flex flex-col max-w-[76rem] ">
                    <Suspense fallback={<WaitlistSkeleton />}>
                    <div className="h-full flex justify-center items-center">
                                <SettingFile />

                            </div>

                    </Suspense>
                </TabsContent>
            </TabModified>
        </DashboardShell>
    )
}
export default FileDetail

const WaitlistSkeleton = () => {
    return (
      <DashboardShell>
      
        <div className="flex flex-col gap-4 w-full">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </DashboardShell>
    )
  }