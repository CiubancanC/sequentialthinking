import { Thought } from '../models/thought.js';
/**
 * Repository interface for storing and retrieving thoughts.
 */
export interface ThoughtRepository {
    /**
     * Adds a thought to the repository.
     * @param thought The thought to add.
     */
    addThought(thought: Thought): void;
    /**
     * Gets all thoughts from the repository.
     * @returns An array of all thoughts.
     */
    getAllThoughts(): Thought[];
    /**
     * Gets all thoughts in a specific branch.
     * @param branchId The ID of the branch.
     * @returns An array of thoughts in the branch.
     */
    getThoughtsByBranch(branchId: string): Thought[];
    /**
     * Gets all branch IDs.
     * @returns An array of branch IDs.
     */
    getAllBranchIds(): string[];
    /**
     * Clears all thoughts from the repository.
     */
    clear(): void;
}
/**
 * Service interface for thought processing.
 */
export interface ThoughtService {
    /**
     * Processes a thought and returns the result.
     * @param thoughtData The thought data to process.
     * @returns The processed thought.
     */
    processThought(thoughtData: unknown): Thought;
    /**
     * Gets the history of all processed thoughts.
     * @returns An array of all processed thoughts.
     */
    getThoughtHistory(): Thought[];
    /**
     * Gets all branches of thoughts.
     * @returns A record of branch IDs to arrays of thoughts.
     */
    getBranches(): Record<string, Thought[]>;
    /**
     * Resets the state of the service.
     */
    resetState(): void;
}
