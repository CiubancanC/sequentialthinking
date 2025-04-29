import { Thought } from '../../domain/models/thought';
import { ThoughtRepository } from '../../domain/interfaces';

/**
 * In-memory implementation of the ThoughtRepository interface.
 * Stores thoughts in memory and provides methods for retrieving them.
 */
export class InMemoryThoughtRepository implements ThoughtRepository {
  private thoughts: Thought[] = [];
  private branches: Record<string, Thought[]> = {};

  /**
   * Adds a thought to the repository.
   * If the thought is part of a branch, it is also added to the branch collection.
   * @param thought The thought to add.
   */
  public addThought(thought: Thought): void {
    this.thoughts.push(thought);

    if (thought.branchId) {
      if (!this.branches[thought.branchId]) {
        this.branches[thought.branchId] = [];
      }
      this.branches[thought.branchId].push(thought);
    }
  }

  /**
   * Gets all thoughts from the repository.
   * @returns An array of all thoughts.
   */
  public getAllThoughts(): Thought[] {
    return [...this.thoughts];
  }

  /**
   * Gets all thoughts in a specific branch.
   * @param branchId The ID of the branch.
   * @returns An array of thoughts in the branch.
   */
  public getThoughtsByBranch(branchId: string): Thought[] {
    return this.branches[branchId] ? [...this.branches[branchId]] : [];
  }

  /**
   * Gets all branch IDs.
   * @returns An array of branch IDs.
   */
  public getAllBranchIds(): string[] {
    return Object.keys(this.branches);
  }

  /**
   * Clears all thoughts from the repository.
   */
  public clear(): void {
    this.thoughts = [];
    this.branches = {};
  }
}
