import { getUserByApiKey } from "@/actions/api-key-actions"
import { uploadFile, uploadFromEndpoint } from "@/actions/file-actions"
import { revalidatePath } from "next/cache"
import { useState } from "react"

export async function POST(req: Request) {
    const headers =  req.headers
    console.log("it touched" , headers)
    const res  =   await req.json()
    const {name  , fileUrl , description , size} = res
   

    const apikey =  headers.get('api-key')
    try {
        const user = await getUserByApiKey(apikey)
        if(!user) {
            throw new Error("No Such User with the API-KEY")
        }
        const file = await uploadFromEndpoint(user.user.id ,   name , description ,  fileUrl , size )
        if(file) {
            revalidatePath("/dashboard")
            return new Response(JSON.stringify(file) , {status:200})
        }else {
            return new Response("Failed while uploading the file" , {status:400})
        }

    }catch(err) {

        return new Response('Not FOund' , {status:400})
    }
     
} 