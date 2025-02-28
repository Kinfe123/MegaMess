# MegaMess
Easy and user friendly file sharing platform along with analytics 


## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **User Management:** [Clerk](https://clerk.com)
- **ORM:** [Prisma ORM](https://prisma.io)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Email:** [React Email](https://react.email)
- **Content Management:** [Contentlayer](https://www.contentlayer.dev)
- **File Uploads:** [EdgeStore](https://uploadthing.com)
- **Cache and Rate limiting:** [Upstash](https://upstash.com)
## Features

- [x] File Upload using our custom uploaders
- [x] File Visibility . i.e public , private, as well email based 
- [x] Invitation email for any user to collab on the file 
- [x] Restrict access for email not in email lists
- [x] Sending Request to view any file to file owners and sending email  once it gets approved 
- [x] Email based notifications about core actions like visibility change , api revoke , team member addition 
- [x] Adding any public file as well email based access file to your favorite list 
- [x] Edit and Delete your file at anypoints in time - [x] since it will be cascaded 
- [x] Unique shareable links for each file for public to view it or your emails based access users 
- [x] Each file analytics reports with ingested email
- [x] API key 
- [x] Logs analytics
- Teams [still in dev]  
- Stripe Implementation based on the pricing model[still in dev]  


## Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/Kinfe123/MegaMess.git
   ```

2. Change the dir

   ```bash
   cd MegaMess
   ```

3. Install dependencies using pnpm

   ```bash
   pnpm install
   ```

4. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

5. Start the development server

   ```bash
   pnpm run dev
   ```

## How do I deploy this?

Follow the deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Contributing

Contributions are welcome! Please open an issue if you have any questions or suggestions. Your contributions will be acknowledged. See the [contributing guide](./CONTRIBUTING.md) for more information.

That's why this existed but i am using turbo just in case :)
