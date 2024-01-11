import * as schema from '../../drizzle/schema';
import { createInsertSchema } from 'drizzle-zod';

export type CreateCustomerDto = (typeof schema.customers)['$inferInsert'];

export const createCustomerSchema = createInsertSchema(schema.customers);
