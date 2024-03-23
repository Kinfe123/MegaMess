'use server'
import { prisma } from "@/lib/db"

enum Status {
    DENIED,
    GRANTED
}
export const createLogs = async(fileId: string , status:Status , originIp: string , originLocation: string  , userAgent: string , responseTime: string) => {
    try {
        const log = await prisma.logs.create({
            data: {
                fileId:fileId,
                status: status ? "GRANTED" : "DENIED" ,
                originLocation,
                originIp,
                userAgent,
                responseTime,

            }
        })

        console.log('The logs is : ' , log)

      return log
      

    }catch(err) {
        console.log('Error while creating logs' , err)
        throw new Error("Error while creating logs")
    }

}