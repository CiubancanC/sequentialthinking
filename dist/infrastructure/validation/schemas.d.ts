import { z } from 'zod';
/**
 * Zod schema for validating the structure of a thought data object.
 * Ensures that the thought, thoughtNumber, totalThoughts, and nextThoughtNeeded properties are present and of the correct type.
 */
export declare const ThoughtDataSchema: z.ZodObject<{
    thought: z.ZodString;
    thoughtNumber: z.ZodNumber;
    totalThoughts: z.ZodNumber;
    nextThoughtNeeded: z.ZodBoolean;
    isRevision: z.ZodOptional<z.ZodBoolean>;
    revisesThought: z.ZodOptional<z.ZodNumber>;
    branchFromThought: z.ZodOptional<z.ZodNumber>;
    branchId: z.ZodOptional<z.ZodString>;
    needsMoreThoughts: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    thought: string;
    thoughtNumber: number;
    totalThoughts: number;
    nextThoughtNeeded: boolean;
    isRevision?: boolean | undefined;
    revisesThought?: number | undefined;
    branchFromThought?: number | undefined;
    branchId?: string | undefined;
    needsMoreThoughts?: boolean | undefined;
}, {
    thought: string;
    thoughtNumber: number;
    totalThoughts: number;
    nextThoughtNeeded: boolean;
    isRevision?: boolean | undefined;
    revisesThought?: number | undefined;
    branchFromThought?: number | undefined;
    branchId?: string | undefined;
    needsMoreThoughts?: boolean | undefined;
}>;
/**
 * Type definition for the data structure validated by ThoughtDataSchema.
 */
export type ThoughtData = z.infer<typeof ThoughtDataSchema>;
/**
 * Validates the structure of a thought data object using the Zod schema.
 * @param input The input to validate.
 * @returns The validated thought data.
 * @throws Error if the input is invalid, with a message describing the validation error.
 */
export declare function validateThoughtData(input: unknown): ThoughtData;
