import { z } from 'zod';

export const listsSchema = z.object({
  boardId: z.number().int(),
  name: z.string(),
  created: z.string(),
  id: z.int(),
});
