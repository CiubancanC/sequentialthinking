import { z } from 'zod';
/**
 * Zod schema for validating the structure of a HelloWorld data object.
 * Ensures that the message property is present and of the correct type.
 */
export declare const HelloWorldDataSchema: z.ZodObject<{
    message: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message: string;
    name?: string | undefined;
}, {
    message: string;
    name?: string | undefined;
}>;
/**
 * Type definition for the data structure validated by HelloWorldDataSchema.
 */
export type HelloWorldData = z.infer<typeof HelloWorldDataSchema>;
/**
 * Validates the structure of a HelloWorld data object using the Zod schema.
 * @param input The input to validate.
 * @returns The validated HelloWorld data.
 * @throws Error if the input is invalid, with a message describing the validation error.
 */
export declare function validateHelloWorldData(input: unknown): HelloWorldData;
