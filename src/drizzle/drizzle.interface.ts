import z from 'zod';

export const envSchema = z
  .object({
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
  })
  .transform((input) => ({
    host: input.DATABASE_HOST,
    port: parseInt(input.DATABASE_PORT),
    user: input.DATABASE_USER,
    password: input.DATABASE_PASSWORD,
    database: input.DATABASE_NAME,
  }));

export interface EnvironmentVariables extends z.infer<typeof envSchema> {}
