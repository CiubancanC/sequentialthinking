import { z } from "zod";
import { validateWithSchema } from "../../utils/validation.js";
import { ValidationError } from "../../utils/errors.js";
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
 * @throws ValidationError if validation fails
 */
export function validateSequentialThinkingData(data) {
    try {
        return validateWithSchema(sequentialThinkingSchema, data, "Invalid sequential thinking data");
    }
    catch (error) {
        throw new ValidationError(error instanceof Error ? error.message : String(error));
    }
}
//# sourceMappingURL=sequentialThinkingSchemas.js.map