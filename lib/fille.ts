import { prisma } from "./db"

export const files = async (id: string) => {
    const result = await prisma.file.findMany({
        where: {
            userId: id,
        }
    })
    return result;

}