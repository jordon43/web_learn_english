import { z } from 'zod';

export const RefreshTableItemSchema = z.object({
  id: z.number(),
  created_at: z.date(),
  expires_at: z.date(),
  is_valid: z.boolean(),
  token: z.string(),
  user_id: z.number()
});

export type RefreshTableItem = z.infer<typeof RefreshTableItemSchema>;