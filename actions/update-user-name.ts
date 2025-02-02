"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";
import { revalidatePath } from "next/cache";

export type FormData = {
  name: string;
  firstName?: string;
  lastName?: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const session = await auth();

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }
    const { name, firstName, lastName } = userNameSchema.parse(data);
    // Update the user name.
    try {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          firstName: firstName,
          lastName: lastName,
        },
      });
    } catch (err) {
      console.log("#[ERROR] : ", err);
    }

    revalidatePath("/dashboard/settings");
    return { status: "success" };
  } catch (error) {
    // console.log(error)
    return { status: "error" };
  }
}

