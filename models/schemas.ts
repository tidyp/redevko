import * as z from 'zod';
import { ZodSchema } from 'zod';

export const UserSchema: ZodSchema = z.object({});

export const ProfileSchema: ZodSchema = z.object({
  nickname: z.string().min(2),
  job: z.string().min(2),
});
