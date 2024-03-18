'use server'

import { prisma } from "@/lib/db"
import { generateApiKey } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export type FormData = {
    name?: string,
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
    try {

        const apikey = await prisma.aPIKey.create({
            data: {
                userId: userId,
                name: data.name ?? "",
                description: data.description ?? "",
                key: keys,
                
            }
        })
        revalidatePath("/dashboard/api-key")
        return apikey
    }catch(err) {
        throw new Error("Error has occurred while creating api key")

    }

}

export const deleteApiKey = async (id: string) => {
    try {
        const apikey = await prisma.aPIKey.delete({
            where: {
                id: id,
            }
        })
        revalidatePath("/dashboard/api-key")

        return apikey
    }catch(err) {
        throw new Error("Error has occurred while deleting api key")
        
    }
}

