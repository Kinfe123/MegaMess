"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { revalidatePath } from "next/cache";


export type FormData = {
  name: string,
  description?: string,

}

export async function uploadFile(userId: string, fileUrl: string, data: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response('Unauthorized', { status: 400 })
    }
    const addFile = await prisma.file.create({
      data: {
        userId: userId,
        name: data.name,
        fileUrl: fileUrl,
        description: data.description,
      },
      select: {
        id: true,
      }
    })
    revalidatePath('/dashboard');
    if (addFile.id) {
      return { status: 'success', id: addFile.id }
    } else {
      return { status: "error" }
    }
  } catch (err) {
    return { status: 'error' }
  }



}

export const fileDelete = async (id: string) => {


  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response('Unauthorized', { status: 400 })
    }
    const deleteFile = await prisma.file.delete({
      where: {
        id: id,
      },
      select: {
        name: true,
      }
      
    })
    const name = deleteFile.name
    revalidatePath('/dashboard');
    if (deleteFile) {
      return { status: 'success', name }
    } else {
      return { status: "error" }
    }
  } catch (err) {
    return { status: 'error' }
  }



}


export const fileEdit = async  (id: string,fileUrl: string ,  data:FormData) => {
  try{
    const user = await getCurrentUser()
    if(!user) {
      return new Response("Unauthorized" , {status: 400})
    }
    const fileEdit = await prisma.file.update({
      where: {
        id: id,
      },
      data: {
        fileUrl: fileUrl,
        name: data.name,
        description: data.description

        
      },
      select: {
        name: true,

      }
    })

    const name = fileEdit.name
    revalidatePath("/dashboard")
    if(name){
      return {status: "success" , name}
    }else {
      return {status:"error" , name: null}
    }
    

  }catch(err) {
    return {status: "error"}
  }

}