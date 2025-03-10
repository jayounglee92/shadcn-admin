import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const testSchema = z.object({
  id: z.number().nullable(),
  name: z.string(),
  description: z.string(),
  category: z.string().optional(),
})

export type Test = z.infer<typeof testSchema>
