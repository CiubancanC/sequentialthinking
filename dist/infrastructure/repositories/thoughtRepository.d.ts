import { Thought } from '../../domain/models/thought.js';
import { ThoughtRepository } from '../../domain/interfaces/index.js';
/**
 * In-memory implementation of the ThoughtRepository interface.
 * Stores thoughts in memory and provides methods for retrieving them.
 */
export declare class InMemoryThoughtRepository implements ThoughtRepository {
    private thoughts;
    private branches;
    /**
     * Adds a thought to the repository.
     * If the thought is part of a branch, it is also added to the branch collection.
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
