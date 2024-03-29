import { transporter } from "@/lib/email-helper";

export async function GET(req:Request) {

}

export async function POST(req: Request) {
    try {
        const {email} = await req.json()
        try {

            const reqs = await transporter.sendMail({
                from:`KinfeMichael Tariku <${process.env.ADMIN_EMAIL}>`,
                to: email,
                template: 'email',
                subject: "This is supposed to be a test",
                context: {
                    name: 'Abebe',
                    company:"MegaMess"
                }
            })
            return new Response('It is working' , {status:200})
        }catch(err) {
            console.log('The error is caused is: ' , err)
        }
    }catch(err) {
        throw new Error("Faied to do so")
    }
}