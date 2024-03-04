import * as z from "zod"

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30)
})
