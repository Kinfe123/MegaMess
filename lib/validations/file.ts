import * as z from "zod"

export const fileSchema = z.object({
  name: z.string().min(3).max(32),
  userId: z.string().min(1).max(30),
  fileUrl: z.string().url()
  


})
