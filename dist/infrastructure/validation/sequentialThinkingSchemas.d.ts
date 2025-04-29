import { z } from "zod";
import { SequentialThinkingRequestDto } from "../../application/useCases/processSequentialThinking.js";
/**
 * Zod schema for validating sequential thinking request data.
 */
export declare const sequentialThinkingSchema: z.ZodObject<{
    context: z.ZodString;
    autoStart: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    context: string;
    autoStart?: boolean | undefined;
}, {
    context: string;
    autoStart?: boolean | undefined;
}>;
/**
 * Validates sequential thinking request data.
 * @param data The data to validate
 * @returns The validated data
 * @throws Error if validation fails
 */
export declare function validateSequentialThinkingData(data: unknown): SequentialThinkingRequestDto;
