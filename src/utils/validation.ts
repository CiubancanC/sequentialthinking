import { z } from 'zod';

/**
 * Validates data against a Zod schema.
 * @param schema The Zod schema to validate against
 * @param data The data to validate
 * @param errorPrefix The prefix to use for error messages
 * @returns The validated data
 * @throws Error if validation fails
 */
export function validateWithSchema<T>(
  schema: z.ZodSchema<T>, 
  data: unknown, 
  errorPrefix: string = 'Validation error'
): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`${errorPrefix}: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw new Error(`${errorPrefix}: ${error instanceof Error ? error.message : String(error)}`);
  }
}
