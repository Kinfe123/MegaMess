import * as z from "zod"

export const apiKeySchema = z.object({
  name: z.string().min(3).max(32),
  description: z.string().min(5), 
  website: z.string().url(),

  


})
