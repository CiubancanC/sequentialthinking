import { z } from "zod";
/**
 * Zod schema for validating sequential thinking request data.
 */
export const sequentialThinkingSchema = z.object({
    context: z.string().min(1, "Context is required"),
    autoStart: z.boolean().optional()
});
/**
 * Validates sequential thinking request data.
 * @param data The data to validate
 * @returns The validated data
 * @throws Error if validation fails
 */
export function validateSequentialThinkingData(data) {
    try {
        return sequentialThinkingSchema.parse(data);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Invalid sequential thinking data: ${error.errors.map(e => e.message).join(", ")}`);
        }
        throw new Error("Invalid sequential thinking data");
    }
}
//# sourceMappingURL=sequentialThinkingSchemas.js.map