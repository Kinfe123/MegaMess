
import { env } from "@/env.mjs"
import { SiteConfig } from "@/types"
import Hero from "./_components/hero";
import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import PricingWrapper from "./_components/pricing-wrapper";
import { CoreFeatures } from "./_components/features";
import { GridPatterns } from "./_components/grid-pattern";
import Customers from "@/components/customers";
import Subscribers from "@/components/subscribers";
import { CTA } from "./_components/cta";
import { getCurrentUser } from "@/lib/session";

export default async function IndexPage() {
  
  const user = getCurrentUser()
  return (
    <>
      <section className="space-y-6 pb-12 pt-0 lg:py-10">
        <div className=" h-full z-50 w-full bg-transparent"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div></div>
        <div className="">
          <Hero />
        </div>
        <PricingWrapper />
        <CoreFeatures />
        <Customers />
        <Subscribers />
        <CTA user={user} />
      </section>
    </>
  )
}

