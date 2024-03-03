import * as z from "zod"

export const fileSchema = z.object({
  name: z.string().min(3).max(32),
  description: z.string().min(5).max(40), 

  


})
