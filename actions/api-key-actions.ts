'use server'

import { prisma } from "@/lib/db"
import { generateApiKey } from "@/lib/utils"

export type FormData = {
    name: string,
    description?: string,
  
  }

export const apikeyById =  async (id: string) => {
    const apiKeys = await prisma.aPIKey.findMany({
        where: {
            userId: id
        }
    })
    return apiKeys

}



export const createApiKey =  async (userId: string , data:FormData  ) => {
    const keys = generateApiKey()
    const apikey = await prisma.aPIKey.create({
        data: {
            userId: userId,
            name: data.name,
            description: data.description,
            key: keys,
        }
    })
    console.log("THe created one is : " , apikey)
    return apikey

}

