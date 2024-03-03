import { env } from "process"
import { prisma } from "./db"

export const fileInfo = (id: string) => {
    const baseUrl = env.BASE_EDGESTORE_URL
    const fullUrl = `${baseUrl}/id`
    return fullUrl
}

export const findUserByFile =  async (fileUrl: string) => {
    const user = await prisma.file.findFirst({
        where: {
            fileUrl: fileUrl
        },
        include: {
            user: true
        }
    })
    console.log('TH user is: ' , user)

}