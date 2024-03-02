import authConfig from "@/auth.config"
import { getCurrentUser } from "@/lib/session"

export async function POST(req: Request) {
    try {
        const session = await getCurrentUser()
        if(!session) {
            return new Response("Unauthorized", { status: 403 })

        }
        const res = await req.json()
        

    }catch(err) {
        console.log('Error has occured' , err)
    }
}