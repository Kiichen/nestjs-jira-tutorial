// import { createZodDto } from 'nestjs-zod';
import * as schema from '../../drizzle/schema';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const listCustomerSchema = z.array(
  createSelectSchema(schema.customers).omit({ name: true }).extend({
    breed: z.string(),
  }),
);

export type ListCustomerDto = typeof listCustomerSchema;

// export class ListCustomerDto extends createZodDto(listCustomerSchema) {}
