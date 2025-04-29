import { z } from 'zod';

/**
 * Zod schema for validating the structure of a thought data object.
 * Ensures that the thought, thoughtNumber, totalThoughts, and nextThoughtNeeded properties are present and of the correct type.
 */
export const ThoughtDataSchema = z.object({
  thought: z.string().min(1, { message: "Thought must be at least 1 character" }),
  thoughtNumber: z.number().int().positive(),
  totalThoughts: z.number().int().positive(),
  nextThoughtNeeded: z.boolean(),
  isRevision: z.boolean().optional(),
  revisesThought: z.number().int().positive().optional(),
  branchFromThought: z.number().int().positive().optional(),
  branchId: z.string().optional(),
  needsMoreThoughts: z.boolean().optional(),
});

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
export function validateThoughtData(input: unknown): ThoughtData {
  try {
    return ThoughtDataSchema.parse(input);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error;
  }
}
