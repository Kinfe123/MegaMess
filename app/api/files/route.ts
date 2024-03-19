import { getUserByApiKey } from "@/actions/api-key-actions"
import { uploadFile, uploadFromEndpoint } from "@/actions/file-actions"

export async function POST(req: Request) {
    const headers =  req.headers
    const res  = await req.json()
    console.log('The res : ' , res)
   

    const apikey =  headers.get('api-key')
    try {
        const user = await getUserByApiKey(apikey)
        if(!user) {
            throw new Error("No Such User with the API-KEY")
        }
        // const file = await uploadFromEndpoint(user.user.id ,   name , description ,  fileUrl , size )
        return new Response(JSON.stringify(user) , {status:200})

    }catch(err) {

        return new Response('Not FOund' , {status:400})
    }
     
} 