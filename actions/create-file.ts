"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";
import { revalidatePath } from "next/cache";


export type FormData = {
    name: string,
    userId: string,
    fileUrl: string,

}

export async function uploadFile() {

}