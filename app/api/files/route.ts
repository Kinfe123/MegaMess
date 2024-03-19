import { getUserByApiKey } from "@/actions/api-key-actions"
import { uploadFile } from "@/actions/file-actions"

export async function GET(req: Request) {
    const headers =  req.headers
    const {name , description , fileUrl  , size} = await req.body
   

    const apikey =  headers.get('api-key')
    try {
        const user = await getUserByApiKey(apikey)
        const file = await uploadFile(user.id ,  fileUrl ,  )
        return new Response(JSON.stringify(user) , {status:200})

    }catch(err) {

        return new Response('Not FOund' , {status:400})
    }
     
} 