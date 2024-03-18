'use server'

import { prisma } from "@/lib/db"

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
    

}

