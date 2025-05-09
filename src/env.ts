import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url().min(1),
  EMAIL_HOST: z.string().min(1),
  EMAIL_PORT: z.number().min(1),
  EMAIL_USER: z.string().min(1),
  EMAIL_PASSWORD: z.string().min(1),
});

export const env = envSchema.parse(process.env);
