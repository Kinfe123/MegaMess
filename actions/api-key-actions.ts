'use server'

import { prisma } from "@/lib/db"
import { generateApiKey } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export type FormData = {
    name?: string,
    description?: string,
    website: string
  
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
        const exists = await checkWebsiteExists(data.website)
    
        if(exists?.id) {
            
            const apikey = await prisma.aPIKey.create({
                data: {
                    userId: userId,
                    name: data.name ?? "",
                    description: data.description ?? "",
                    key: keys,
                    website:data.website,
                    
                }

            })
            revalidatePath("/dashboard/api-key")
            return apikey
        }else {

            throw new Error("The website already exists")
        }
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

export const checkWebsiteExists = async (website: string) => {
    try {
        const apiKeyWeb = await prisma.aPIKey.findFirst({
            where: {
                website: website
            }
        })
        return apiKeyWeb
    }catch(err) {

        throw new Error("Error has occurred while finding website in the api key")


    }
}
export const getUserByApiKey= async (apiKey) => {
    try {

        const users = await prisma.aPIKey.findFirst({
            where: {
                key: apiKey,
            },
            include: {
                user: true,
            }
        })
    return users
    }catch(err){
        throw new Error("Not found")
    }

}

