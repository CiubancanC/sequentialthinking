import { z } from 'zod';
/**
 * Validates data against a Zod schema.
 * @param schema The Zod schema to validate against
 * @param data The data to validate
 * @param errorPrefix The prefix to use for error messages
 * @returns The validated data
 * @throws Error if validation fails
 */
export declare function validateWithSchema<T>(schema: z.ZodSchema<T>, data: unknown, errorPrefix?: string): T;
