"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { formatFileSize } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { Convergence } from "next/font/google";


export type FormData = {
  name: string,
  description?: string,

}

export async function uploadFile(userId: string, fileUrl: string, fileSize: number, data: FormData) {
  try {
    const user = await getCurrentUser()
  
    if (!user) {
      return new Response('Unauthorized', { status: 400 })
    }
    const fileSizeFormated = formatFileSize(fileSize)
    const addFile = await prisma.file.create({
      data: {
        userId: userId,
        name: data.name,
        fileUrl: fileUrl,
        size: fileSizeFormated,
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


export const getFileOwner = async  (id: string) => {
  
  const fileOwner = await prisma.file.findFirst({
    where: {
      id: id as string,

    }
  })
  console.log('The file owner is : ' , fileOwner)
  return fileOwner

}
export const fileFav = async (id: string , fileId: string) => {
    try {
      const user = await getCurrentUser()
      const otherUser = await prisma.user.findFirst({
        where: {
          id: id,
        }
      })
     // we dont need to check for the existense at since the user might want to put his own file as fav
      const favAdd = await prisma.favorite.create({
          data: {
            fileId: fileId,
            favoritingId: otherUser?.id as string,
            favoriterId: user?.id as string,
          
          },
          include: {
            favoriter:true,
            favoriting: true,
          }
      })
      revalidatePath("/dashboard")
      revalidatePath("/dashboard/favorites")
      if(favAdd) {
        return favAdd
      }else {
        throw new Error("Failed while adding to fav")
      }
    }catch(err) {
      console.log("#[ERROR]: " , err)
    }
}

export const fileUnFav = async (id: string , fileId: string) => {
  try {
    const user = await getCurrentUser()
    const otherUser = await prisma.user.findFirst({
      where: {
        id: id,
      }
    })
   // we dont need to check for the existense at since the user might want to put his own file as fav
   const existFav = await prisma.favorite.findFirst({
    where: {
      favoritingId: otherUser?.id as string,
      favoriterId: user?.id as string,
    }
   })
    const favAdd = await prisma.favorite.delete({
        where: {
            id: existFav?.id,    
        
        },
        
    })
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/favorites")
    if(favAdd) {
      return favAdd
    }else {
      throw new Error("Failed while adding to fav")
    }
  }catch(err) {
    console.log("#[ERROR]: " , err)
  }
}