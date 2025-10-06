import { z } from 'zod';

export const listsSchema = z.object({
  boardId: z.number().int(),
  name: z.string(),
  order: z.int(),
  created: z.string(),
  id: z.int(),
});
