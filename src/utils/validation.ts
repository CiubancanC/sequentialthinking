import { z } from 'zod';
import { ValidationError } from './errors.js';

/**
 * Validates data against a Zod schema.
 * @param schema The Zod schema to validate against
 * @param data The data to validate
 * @param errorPrefix The prefix to use for error messages
 * @returns The validated data
 * @throws ValidationError if validation fails
 */
export function validateWithSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  errorPrefix: string = 'Validation error'
): T {
  try {
    return schema.parse(data);
  } catch (error) {
    // Format Zod errors in a user-friendly way
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(e => e.message).join(', ');
      throw new ValidationError(`${errorPrefix}: ${errorMessages}`);
    }

    // Handle other types of errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new ValidationError(`${errorPrefix}: ${errorMessage}`);
  }
}
