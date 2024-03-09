import { env } from "process"
import { prisma } from "./db"

export const fileInfo = (id: string) => {
    const baseUrl = env.BASE_EDGESTORE_URL
    const fullUrl = `${baseUrl}/${id}`
    return fullUrl
}

export const findUserByFile =  async (fileUrl: string) => {
    // await new Promise((rs) => setTimeout(rs , 4000))
    const user = await prisma.file.findFirst({
        where: {
            fileUrl: fileUrl
        },
        include: {
            user: {
                select: {
                    name:true,
                    image:true,
                    firstName:true,
                    lastName: true,
                    
                }
            }
        }
    })
    if(user){
        return user
    }else {
        return null
    }
}

export const fileIdByUrl = async (fileUrl: string) => {
    const fileId = await prisma.file.findFirst({
        where:{
            fileUrl: fileUrl
        }
    })
    return fileId?.id
}