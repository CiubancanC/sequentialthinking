/**
 * Data Transfer Object for thought input.
 * Used to transfer thought data from the infrastructure layer to the application layer.
 */
export interface ThoughtInputDto {
  thought: string;
  thoughtNumber: number;
  totalThoughts: number;
  nextThoughtNeeded: boolean;
  isRevision?: boolean;
  revisesThought?: number;
  branchFromThought?: number;
  branchId?: string;
  needsMoreThoughts?: boolean;
}

/**
 * Data Transfer Object for thought output.
 * Used to transfer thought data from the application layer to the infrastructure layer.
 */
export interface ThoughtOutputDto {
  thoughtNumber: number;
  totalThoughts: number;
  nextThoughtNeeded: boolean;
  branches: string[];
  thoughtHistoryLength: number;
}

/**
 * Data Transfer Object for error output.
 * Used to transfer error information from the application layer to the infrastructure layer.
 */
export interface ErrorOutputDto {
  error: string;
  status: string;
}
