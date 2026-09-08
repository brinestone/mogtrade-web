import z from 'zod';
export const Principal = z.object({
  id: z.ulid(),
  displayName: z.string(),
  email: z.email(),
  emailVerified: z.boolean(),
  photo: z.string().nullable(),
});
export type Principal = z.infer<typeof Principal>;
