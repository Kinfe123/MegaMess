
import { env } from "@/env.mjs"
import { SiteConfig } from "@/types"
import Hero from "./_components/hero";

export default async function IndexPage() {

  return (
    <>
      <section className="space-y-6 pb-12 pt-16 lg:py-28">

        <Hero />


      </section>
    </>
  )
}

