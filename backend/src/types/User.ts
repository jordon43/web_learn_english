import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  password_hash: z.string(),
});

export type User = z.infer<typeof UserSchema>;