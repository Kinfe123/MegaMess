import { notFound } from "next/navigation"

import { DashboardNav } from "@/components/layout/nav"
import { NavBar } from "@/components/layout/navbar"
import { SiteFooter } from "@/components/layout/site-footer"
import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import GradientImg from '../../../public/gradient.png'
import Image from 'next/image'
interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex relative min-h-screen flex-col space-y-0 ">
       <div className="absolute left-52 z-0 top-[-1050px] transform rotate-180 justify-center items-center flex">
        <Image src={GradientImg} alt="gradinet img" />

      </div>
      <NavBar user={user} items={dashboardConfig.mainNav} scroll={false} />

      <div className="container z-10 py-10 grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
