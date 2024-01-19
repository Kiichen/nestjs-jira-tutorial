// import { createZodDto, zodToOpenAPI } from 'nestjs-zod';
import * as schema from '../../drizzle/schema';
import { createInsertSchema } from 'drizzle-zod';

// export type UpdateCustomerDto = (typeof schema.customers)['$inferInsert'];

export const updateCustomerSchema = createInsertSchema(schema.customers);

export type UpdateCustomerDto = typeof updateCustomerSchema;

// export class CreateUserDto extends createZodDto(updateCustomerSchema) {}
