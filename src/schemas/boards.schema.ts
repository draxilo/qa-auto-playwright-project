import { z } from 'zod';

export const boardsSchema = z.object({
  name: z.string(),
  user: z.number(),
  starred: z.boolean(),
  created: z.string(),
  id: z.int().optional(),
});
