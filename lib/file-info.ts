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

            },
            orderBy: {
                createdAt: "desc",
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

export const fileByUserId = async(id: string) => {
  
    const files = await prisma.file.findMany({
        where: {
            userId: id,
        }
    })
    return files
}

export const totalDownload = async () => {
    const user = await getCurrentUser()
    const files = await prisma.file.findMany({
        where: {
            userId: user?.id
        }
    })
    let downloadFilter = files.map(f => f.downloads)
    let sums = downloadFilter.reduce((prev , curr) => prev + curr)
    return sums    

}
export const topFiles = async () => {
    const user = await getCurrentUser()
    const files = await prisma.file.findMany({
        where: {
            userId:user?.id

        },
        include: {
            logs: true,
            viewers: true,
            feedbacks:true,  
            waitlists: true,          
        }
        
    })

    let sumTotal = 0
    // calculation can be done based on logs , downloads , emial shared , api keys as communative
    let filesObject: Record<string , number> = {}
    let filesObjectLists: typeof filesObject[][] = []
    files.map((file) => {
        filesObject[file.id] = file.downloads + file.logs.length + file.viewers.length + file.feedbacks.length + file.waitlists.length
        filesObjectLists.push([filesObject])
        filesObject= {}
    })
    filesObjectLists.sort((a , b) => {
        const valueA = Object.values(a[0])[0]; 
        const valueB = Object.values(b[0])[0];       
        return valueB - valueA
    })
    return filesObjectLists

    
}


export const logByFileId = async (id: string) => {
    const logs = await prisma.logs.findMany({
        where: {
            fileId: id,
        },
     
    })
    return logs 
}


export const downloadsByFileId = async (id: string) => {
    const downloads = await prisma.file.findMany({
        where: {
            id,
        },
        select: {
            downloads: true,
        }
    })
    return downloads
}
