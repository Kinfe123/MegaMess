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
                    company:"MegaMess"
                }
            })
        }catch(err){

        }


    }catch(err) {
        throw new Error('Error has occured' , err)
    }
}