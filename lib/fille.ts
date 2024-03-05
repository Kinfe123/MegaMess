import { prisma } from "./db"

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
    
    const files = await prisma.user.findMany({
        where:{
            id: id,
        },
        include: {
            favoriting:true
        }

    })
    // TODO: getting to feetch the list of the files that the user added as fav 
    const filteredUser = files.map((file) => file.id)
    

}

favFiles("cltero85w0000nlhvhuhtvxfn")