import { z } from 'zod';
/**
 * Zod schema for validating the structure of a HelloWorld data object.
 * Ensures that the message property is present and of the correct type.
 */
export const HelloWorldDataSchema = z.object({
    message: z.string().min(1, { message: "Message must be at least 1 character" }),
    name: z.string().optional(),
});
/**
 * Validates the structure of a HelloWorld data object using the Zod schema.
 * @param input The input to validate.
 * @returns The validated HelloWorld data.
 * @throws Error if the input is invalid, with a message describing the validation error.
 */
export function validateHelloWorldData(input) {
    try {
        return HelloWorldDataSchema.parse(input);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
        }
        throw error;
    }
}
//# sourceMappingURL=helloWorldSchemas.js.map