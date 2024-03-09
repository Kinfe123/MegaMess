import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"

type PropsParams = {
    params: {
        id: string
    }
}

export const metadata = {
    title: "File Detail ",
    description: "Explore in details about your file"
  }
  
const FileDetail = ({params}: PropsParams) => {
    const fileId = params.id

    return (
          <DashboardShell>
            <DashboardHeader heading="Analytics & Privillages" text="Explore in depth analytics and exploration about your files"/>

           
        </DashboardShell>
    )
}
export default FileDetail