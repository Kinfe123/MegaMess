import { prisma } from "./db"
import { getCurrentUser } from "./session";

import { type File } from "@prisma/client";
export const files = async (id: string) => {
    const result = await prisma.file.findMany({
        where: {
            userId: id,
        }
    })
    return result;

}

export const favFiles = async (id: string) => {
    // const result = await prisma.favorite.findMany({
    //     where: {
    //         favoriterId: id,
    //     }
    // })

    const currentUser = await getCurrentUser()
    
    const files = await prisma.user.findMany({
        where:{
            id: currentUser?.id,
        },
        include: {
            favoriting:true
        }

    })
    // TODO: getting to feetch the list of the files that the user added as fav 
    const filteredFavs = files.map((file) => file.favoriting)[0]
    let fileLists: Promise<File>[] = [] 
    filteredFavs.map( (fav) => {
        const fileExtract =  favFileEach(fav.fileId)
        fileLists.push(fileExtract as Promise<File>)

    })
    const result = await Promise.all(fileLists)
    return result

}


export const favFileEach = async (fileId:string) => {
    const file = await prisma.file.findFirst({
        where: {
            id: fileId,
        }
    })
    return file
    
}
export const favByFileId = async (fileId: string) => {
   const currentUser = await getCurrentUser()
   const fileInFav = await prisma.favorite.findMany({
    where:{
        fileId: fileId,
        favoriterId: currentUser?.id
    }
   })
   console.log('THE list of fav are: ' , fileInFav)
   return fileInFav


   
   
   
}