'use server'

import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
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
        if(!exists) {
            
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
        console.log("Error is ; " , err)
        throw new Error("Error has occurred while creating api key" , err)

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
export const getUserByApiKey= async (apiKey: string | null , fullWebHost: string) => {
    try {

        const users = await prisma.aPIKey.findFirst({
            where: {
                key: apiKey ?? "",
                website: fullWebHost,
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

export const getAllApiKey = async () => {
    try {
        const user = await getCurrentUser()
        const apikeys = await prisma.aPIKey.findMany({
            where: {
                userId: user?.id,
            }
        })
        return apikeys

        
    }catch(err) {
        return new Response("Error : " + err , {status:400})
    }

}