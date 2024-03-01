import { NavBar } from "@/components/layout/navbar"
import { SiteFooter } from "@/components/layout/site-footer"
import { marketingConfig } from "@/config/marketing"
import { getCurrentUser } from "@/lib/session"
import { Suspense } from "react"
import GradientImg from '../../public/gradient.png'
import Image from "next/image"
interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="absolute left-52 top-[-1050px] transform rotate-180 justify-center items-center flex">
        <Image src={GradientImg} alt="gradinet img" />

      </div>
      <Suspense fallback="...">
        <NavBar user={user} items={marketingConfig.mainNav} scroll={true} />
      </Suspense>
      <main className="flex-1">{children}</main>
    </div>
  )
}
