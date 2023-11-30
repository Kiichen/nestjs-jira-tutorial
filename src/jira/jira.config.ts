import { envSchema } from './jira.interface';

export default () => envSchema.parse(process.env);
