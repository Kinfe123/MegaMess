"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { formatFileSize } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { Email, Visibility } from "@prisma/client";
import { type File } from "@prisma/client";
import { getUserById } from "@/lib/user";
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
export const uploadFromEndpoint = async (userId: string, name : string , description: string , fileUrl: string , size: string ) => {
      const fileUplpad = await prisma.file.create({
        data: {
          userId: userId,
          name: name,
          fileUrl: fileUrl,
          size: size,
          description: description,
        }
      })
    return fileUplpad
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
    throw new Error('Error has occured ', err)
    return {status: "error"}
  }

}


export const getFileOwner = async  (id: string) => {
  
  const fileOwner = await prisma.file.findFirst({
    where: {
      id: id as string,

    }
  })
  return fileOwner

}
export const fileFav = async (id: string , fileId: string) => {
    try {
      const user = await getCurrentUser()
      const otherUser = await prisma.user.findUnique({
        where: {
          id: id,
        }
      })
     // we dont need to check for the existense at since the user might want to put his own file as fav
      const favAdd = await prisma.favorite.create({
          data: {
            fileId: fileId,
            favoritingId: id,
            favoriterId: user?.id as string,
          
          },
          // include: {
          //   favoriter:true,
          //   favoriting: true,
          // }
      })
      revalidatePath("/dashboard")
      revalidatePath("/dashboard/favorites")
      revalidatePath('/files/f/*')
      if(favAdd) {
        return favAdd
      }else {
        throw new Error("Failed while adding to fav")
      }
    }catch(err) {
      console.log("#[ERROR]: " , err)
      throw new Error('Error has occured ', err)
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
      fileId: fileId,
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
    throw new Error('Error has occured ', err)
  }
}



const emailsGen = async(email: string , fileId ) => {
  const emails = await prisma.email.create({
    data: {
      email: email,
      fileId:fileId,
      

    }
  })
  return emails
}

type fileVisiblity = keyof typeof Visibility
export const fileVisiblity = async (fileId: string , visiblity:fileVisiblity , emails?: string[]) => {
  try {
    const user = await getCurrentUser()
    let visiblityFile:Partial<File> = {}
    if(visiblity === 'EMAIL') {
        let emailCollect: Promise<Email>[] = []
        emails?.map((email) => {
          const emailResult = emailsGen(email , fileId)
          emailCollect.push(emailResult)
        })
        const emailsResolved = await Promise.all(emailCollect)
        visiblityFile = await prisma.file.update({
        where: {
          id: fileId
        },
        data: {
          visiblity:visiblity,
        
        },
        
      })

    }else {

        visiblityFile = await prisma.file.update({
        where: {
          id: fileId
        },
        data: {
          visiblity:visiblity,
        },
        
      })
    }
    revalidatePath("/dashboard")
    return visiblityFile
    

  }catch(err) {
    console.log("#[ERROR]" , err)
    throw new Error('Error has occured ', err)
  }
}


export const allowedEmailForFile = async (fileId: string) => {
  try {
    const currentUser = await getCurrentUser()
    const checkAllowed = await prisma.email.findMany({
      where: {
        fileId: fileId, 
        email: currentUser?.email!,
      }
    })
    if(!!checkAllowed.length) return true;
    else return false
  }catch(err) {
    console.log('#[ERROR] ' , err)
    throw new Error('Error has occured ', err)
  }
}
export const allowedOwnerEmail = async (fileId: string) =>  {

  try {
    const currentUser = await getCurrentUser()
    const fileOwner = await getFileOwner(fileId)
    const user = await getUserById(fileOwner?.userId ?? "")
    if(currentUser?.email === user?.email) {
      return true
    }else {
      return false
    }
  }catch(err) {
    throw new Error('Error has occured ' , err)

  }
}


export const addWaitlist = async (email: string , fileId: string) => {
  try {
    const waitlist = await prisma.waitlistEmail.create({
      data: {
        fileId: fileId,
        email: email,
      }
    
    })
    return waitlist
  }catch(err) {
    console.log('#[ERROR] ' , err)
    throw new Error('Error has occured ', err)
     
  }
}


export const delWaitlist = async (fileId: string , email: string) => {
  try {
    const deleteUsers = await prisma.waitlistEmail.delete({
      where: {
        email_fileId: {

          fileId: fileId,
          email: email,
        }
      }
    
    })
    return deleteUsers
  }catch(err) {
    throw new Error('Error has occured ', err)
    console.log('#[ERROR] ' , err)

     
  }
}

export const allowEmail = async (fileId: string , email:string) => {
  try {
    const addAllow = await prisma.email.create({
      data : {
        fileId: fileId,
        email: email
      }
    })
     await prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        visiblity: 'EMAIL'
      }
    })
    await prisma.waitlistEmail.delete({
      where: {
        email_fileId: {
          email: email,
          fileId: fileId
        }
        
      }
    
    })
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/file")
    revalidatePath('/files/f/[id]' , 'page')
    return allowEmail
  }catch(err) {
    console.log('#[ERROR] ' , err)
    throw new Error('Error has occured ', err)

  }

}


export const createFeedback = async (fileId: string , data: FormData) => {
  try {
    if(!data.description) {
      throw new Response('Description is not provided ', {status:400})
      
      
    }
    const res = await prisma.feedbacks.create({
        data: {
          fileId,
          name:data.name,
          description: data.description,
        }
      })
      return res
  } catch(err) {
    console.log('#[ERROR] ' , err)
    throw new Error('Error has occured ', err)


  }
}