import { Thought } from '../models/thought';
import { ThoughtRepository, ThoughtService } from '../interfaces';

/**
 * Implementation of the ThoughtService interface.
 * Handles the core business logic for processing thoughts.
 */
export class ThoughtServiceImpl implements ThoughtService {
  private repository: ThoughtRepository;

  constructor(repository: ThoughtRepository) {
    this.repository = repository;
  }

  /**
   * Processes a thought by validating it and adding it to the repository.
   * @param thoughtData The raw thought data to process.
   * @returns The processed thought.
   */
  public processThought(thoughtData: unknown): Thought {
    // This method assumes that validation has been performed at a higher level
    // and that thoughtData can be safely cast to the expected type
    const data = thoughtData as {
      thought: string;
      thoughtNumber: number;
      totalThoughts: number;
      nextThoughtNeeded: boolean;
      isRevision?: boolean;
      revisesThought?: number;
      branchFromThought?: number;
      branchId?: string;
      needsMoreThoughts?: boolean;
    };

    // Adjust total thoughts if needed
    if (data.thoughtNumber > data.totalThoughts) {
      data.totalThoughts = data.thoughtNumber;
    }

    // Create a new Thought domain object
    const thought = Thought.create(data);

    // Add the thought to the repository
    this.repository.addThought(thought);

    return thought;
  }

  /**
   * Gets the history of all processed thoughts.
   * @returns An array of all processed thoughts.
   */
  public getThoughtHistory(): Thought[] {
    return this.repository.getAllThoughts();
  }

  /**
   * Gets all branches of thoughts.
   * @returns A record of branch IDs to arrays of thoughts.
   */
  public getBranches(): Record<string, Thought[]> {
    const branches: Record<string, Thought[]> = {};
    
    for (const branchId of this.repository.getAllBranchIds()) {
      branches[branchId] = this.repository.getThoughtsByBranch(branchId);
    }
    
    return branches;
  }

  /**
   * Resets the state of the service by clearing the repository.
   */
  public resetState(): void {
    this.repository.clear();
  }
}
