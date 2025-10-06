import { z } from 'zod';

export const cardsSchema = z.object({
  order: z.number().int(),
  boardId: z.number(),
  listId: z.number().int(),
  name: z.string(),
  created: z.string(),
  deadline: z.string(),
  description: z.string(),
  completed: z.boolean(),
  id: z.number().int(),
});
