import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      preview: false,
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Documentation",
      preview: false,
      items: [
        {
          title: "Introduction",
          href: "/docs/documentation",
        },
        {
          title: "API Keys",
          href: "/docs/api-keys",
          disabled: false,
        },
        {
          title: "Teams",
          href: "/docs/teams",
        },
        // {
        //   title: "Code Blocks",
        //   href: "/docs/documentation/code-blocks",
        // },
        // {
        //   title: "Style Guide",
        //   href: "/docs/documentation/style-guide",
        // },
      ],
    },
    // {
    //   title: "Blog",
    //   preview: false,
    //   items: [
    //     {
    //       title: "Introduction",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Build your own",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Writing Posts",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //   ],
    // },
    // {
    //   title: "Dashboard",
    //   preview: false,
    //   items: [
    //     {
    //       title: "Introduction",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Layouts",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Server Components",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Authentication",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Database with Prisma",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "API Routes",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //   ],
    // },
  ],
}
