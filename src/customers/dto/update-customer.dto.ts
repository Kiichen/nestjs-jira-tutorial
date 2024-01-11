import * as schema from '../../drizzle/schema';
import { createInsertSchema } from 'drizzle-zod';

export type UpdateCustomerDto = (typeof schema.customers)['$inferInsert'];

export const updateCustomerSchema = createInsertSchema(schema.customers);
