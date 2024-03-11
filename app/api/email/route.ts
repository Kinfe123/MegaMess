import { transporter } from "@/lib/email-helper"

export async function POST(req: Request) {

    try {
        const {email , subject , link, linkHelper , content} = await req.json()
        try  {
            const reqs = await transporter.sendMail({
                from:`KinfeMichael Tariku <${process.env.ADMIN_EMAIL}>`,
                to: email,
                template: 'email',
                subject: subject,
                context: {
                    content: content,
                    linkHelper:linkHelper, 
                    link: link,
                    company:"MegaMess"
                }
            })
         return new Response('Sent!' ,{status: 2000})
        }catch(err){
        return new Response('Not Sent!' , {status:400})
        }


    }catch(err) {
        throw new Error('Error has occured' , err)
    }
}