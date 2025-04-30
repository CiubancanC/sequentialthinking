import { z } from "zod";
import { validateWithSchema } from "../../utils/validation.js";
import { ValidationError } from "../../utils/errors.js";
/**
 * Zod schema for validating role prompt request data.
 */
export const rolePromptSchema = z.object({
    role: z.string().min(1, "Role is required"),
    context: z.string().min(1, "Context is required"),
    scenarioId: z.string().optional()
});
/**
 * Validates the input data for a role prompt request.
 * @param data The data to validate
 * @returns The validated data
 * @throws ValidationError if the data is invalid
 */
export function validateRolePromptData(data) {
    try {
        return validateWithSchema(rolePromptSchema, data, "Invalid role prompt data");
    }
    catch (error) {
        throw new ValidationError(error instanceof Error ? error.message : String(error));
    }
}
//# sourceMappingURL=rolePromptSchemas.js.map