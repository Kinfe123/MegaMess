import { DashboardShell } from "@/components/dashboard/shell"
import { DashboardHeader } from "@/components/dashboard/header"

export const metadata = {
    title: "Teams",
    description: "Manage sharing file in a team"
}

export default async function TeamPage() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Teams" text='Manage sharing file with in a team' />
        
            <h1>This page is under development - hit us up on <Link to='https://github.com/Kinfe123/mega-mess'>github</Link> to contribute more </h1>
        </DashboardShell>
    )
}
  
