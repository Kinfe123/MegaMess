
import { env } from "@/env.mjs"
import { SiteConfig } from "@/types"
import Hero from "./_components/hero";

export default async function IndexPage() {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/mickasmt/next-saas-stripe-starter",
    {
      ...(env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every hour
      next: { revalidate: 3600 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));


  return (
    <>
      <section className="space-y-6 pb-12 pt-16 lg:py-28">

        <Hero />
        

      </section>
    </>
  )
}

