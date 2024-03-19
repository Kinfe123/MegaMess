import { getUserByApiKey } from "@/actions/api-key-actions"

export async function GET(req: Request) {
    const headers =  req.headers
    
   

    const apikey =  headers.get('api-key')
    try {
        const user = await getUserByApiKey(apikey)
        return new Response(JSON.stringify(user) , {status:200})

    }catch(err) {

        return new Response('Not FOund' , {status:400})
    }
     
} 