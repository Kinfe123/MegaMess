"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { revalidatePath } from "next/cache";


export type FormData = {
    name: string,
    userId: string,
    fileUrl: string,

}

export async function uploadFile(userId: string  , fileUrl: string, data:FormData) {
   try {
    const user = await getCurrentUser()
   console.log(userId , fileUrl , data)
   if(!user) {
    return new Response('Unauthorized' , {status:400})
   }
   const addFile = await prisma.file.create({
      data: {
        userId: userId,
        name: data.name,
        fileUrl: fileUrl
      },
      select: {
        id: true,
      }
   })
   revalidatePath('/dashboard');
   if(addFile.id) {
    return {status:'success' , id:addFile.id}
   }else{
    return {status: "error"}
   }
   }catch(err) {
    return {status: 'error'}
   }

   

}