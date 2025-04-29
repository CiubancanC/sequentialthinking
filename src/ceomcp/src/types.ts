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
 * Represents the data structure for a single thought in the CEOMCP process.
 */
export type ThoughtData = z.infer<typeof ThoughtDataSchema>;
