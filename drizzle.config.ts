import type { Config } from 'drizzle-kit';
import config from './src/drizzle/drizzle.config';

export default {
  schema: './src/drizzle/schema.ts',
  driver: 'mysql2',
  dbCredentials: config(),
  out: './src/drizzle/migrations',
} satisfies Config;
