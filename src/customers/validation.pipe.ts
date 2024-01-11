import { PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value);
    } catch (error) {
      throw new UnprocessableEntityException('Validation failed', {
        description: error.issues.map((issue: any) => ({
          [issue.path.join('')]: issue.message,
        })),
      });
    }
    return value;
  }
}
