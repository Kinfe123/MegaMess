import { env } from "process"
import { prisma } from "./db"
import { getCurrentUser } from "./session"
import { PrismaPromise, type Logs } from "@prisma/client"

export const fileInfo = (id: string) => {
    const baseUrl = env.BASE_EDGESTORE_URL
    const fullUrl = `${baseUrl}/${id}`
    return fullUrl
}

export const findUserByFile =  async (fileUrl: string) => {
    // await new Promise((rs) => setTimeout(rs , 4000))
    const user = await prisma.file.findFirst({
        where: {
            fileUrl: fileUrl ?? ""
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


export const waitlistEmailUsers = async (fileId: string) => {
    const users = await prisma.waitlistEmail.findMany({
        where: {
            fileId: fileId,
        }
    })
    return users
}
export const fileById = async (fileId: string) => {
    const file = await prisma.file.findFirst({
        where: {
            id: fileId,
        }
    })
    return file

}
export const fileLogbyUser = async () => {
    const user = await getCurrentUser()
    const fileUsers = await prisma.file.findMany({
        where: {
            userId: user?.id,
        },
        
    })
    let promiseLogs: Promise<Logs[]>[] = []
    fileUsers.map((file) => {
        const log =  prisma.logs.findMany({
            where: {
                fileId: file.id,
            }
        })
        promiseLogs.push(log)

    })
    const resolveLogs = await Promise.all(promiseLogs)
    const filteredOne = resolveLogs.filter((res) => res.length !== 0)
    let fileFinished = []
    filteredOne.map((log) => {
        // @ts-ignore
        fileFinished.push(...log)
    })
    


    return fileFinished
    
}