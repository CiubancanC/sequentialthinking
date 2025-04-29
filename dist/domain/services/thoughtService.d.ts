import { Thought } from '../models/thought.js';
import { ThoughtRepository, ThoughtService } from '../interfaces/index.js';
/**
 * Implementation of the ThoughtService interface.
 * Handles the core business logic for processing thoughts.
 */
export declare class ThoughtServiceImpl implements ThoughtService {
    private repository;
    constructor(repository: ThoughtRepository);
    /**
     * Processes a thought by validating it and adding it to the repository.
     * @param thoughtData The raw thought data to process.
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
     * Resets the state of the service by clearing the repository.
     */
    resetState(): void;
}
