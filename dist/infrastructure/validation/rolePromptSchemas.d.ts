import { z } from "zod";
import { RolePromptRequestDto } from "../../application/dtos/rolePromptDto.js";
/**
 * Zod schema for validating role prompt request data.
 */
export declare const rolePromptSchema: z.ZodObject<{
    role: z.ZodString;
    context: z.ZodString;
    scenarioId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: string;
    context: string;
    scenarioId?: string | undefined;
}, {
    role: string;
    context: string;
    scenarioId?: string | undefined;
}>;
/**
 * Validates the input data for a role prompt request.
 * @param data The data to validate
 * @returns The validated data
 * @throws ValidationError if the data is invalid
 */
export declare function validateRolePromptData(data: unknown): RolePromptRequestDto;
