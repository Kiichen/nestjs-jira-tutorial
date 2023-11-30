import { envSchema } from './drizzle.interface';

export default () => envSchema.parse(process.env);
