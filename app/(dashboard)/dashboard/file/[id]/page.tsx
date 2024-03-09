import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Separator } from "@/components/ui/separator"
import { TabModified, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tab-modified"

type PropsParams = {
    params: {
        id: string
    }
}

export const metadata = {
    title: "File Detail ",
    description: "Explore in details about your file"
}

const FileDetail = ({ params }: PropsParams) => {
    const fileId = params.id
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
                <TabsContent value="billing" className="flex flex-col max-w-[76rem] ">
                </TabsContent>
            </TabModified>
        </DashboardShell>
    )
}
export default FileDetail