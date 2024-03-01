import { env } from "@/env.mjs";
import { SiteConfig } from "types"

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "MegaMess ",
  description:
    "Easy and Privacy focuseed file sharing platform for file enthusiast",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/kinfishT",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "kinfetare83@gmail.com"
}
