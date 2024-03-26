'use server'
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

enum Status {
    DENIED,
    GRANTED,
    REQUESTED
}
type StatusProps = keyof typeof Status
export const createLogs = async(fileId: string , status: StatusProps , description: string ,  originIp: string , originLocation: string  , userAgent: string , responseTime: string) => {
    try {
        const log = await prisma.logs.create({
            data: {
                fileId:fileId,
                status,
                 description,
                originLocation,
                originIp,
                userAgent,
                responseTime,

            },
            
        })
        revalidatePath("/dashboard/logs")
        return log


    }catch(err) {
        console.log('Error while creating logs' , err)
        throw new Error("Error while creating logs")
    }

}
export const getAlLogs = async (fileId: string) => {
    
    try {
        const allLogs = await prisma.logs.findMany({
            where: {
                fileId: fileId
            },
            orderBy: {
                createdAt:"desc"
            }
        })
        return allLogs;




    }catch(err) {
        console.log('Error while creating logs' , err)
        throw new Error("Error while creating logs")
    }

}