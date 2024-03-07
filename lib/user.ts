import { prisma } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
        emailVerified: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
    const user = await prisma.user.findFirst({ where: { id:id } });
    return user;
};

export const getUserByFileId = async (fileId: string) => {
  const userIdByFile = await prisma.file.findUnique({
    where: {
      id: fileId
    },
    include : {
       user: true,
    }
  })
  return userIdByFile?.id  ?? ""

}