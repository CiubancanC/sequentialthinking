/**
 * Represents a thought in the CEOMCP thinking process.
 * This is the core domain entity for the application.
 */
export class Thought {
  private _thought: string;
  private _thoughtNumber: number;
  private _totalThoughts: number;
  private _nextThoughtNeeded: boolean;
  private _isRevision?: boolean;
  private _revisesThought?: number;
  private _branchFromThought?: number;
  private _branchId?: string;
  private _needsMoreThoughts?: boolean;

  constructor(
    thought: string,
    thoughtNumber: number,
    totalThoughts: number,
    nextThoughtNeeded: boolean,
    isRevision?: boolean,
    revisesThought?: number,
    branchFromThought?: number,
    branchId?: string,
    needsMoreThoughts?: boolean
  ) {
    // Validate required fields
    if (!thought || thought.trim().length === 0) {
      throw new Error("Thought must not be empty");
    }
    if (thoughtNumber <= 0) {
      throw new Error("Thought number must be positive");
    }
    if (totalThoughts <= 0) {
      throw new Error("Total thoughts must be positive");
    }

    // Validate conditional fields
    if (isRevision && !revisesThought) {
      throw new Error("Revises thought must be provided when isRevision is true");
    }
    if (branchFromThought && !branchId) {
      throw new Error("Branch ID must be provided when branchFromThought is provided");
    }

    this._thought = thought;
    this._thoughtNumber = thoughtNumber;
    this._totalThoughts = totalThoughts;
    this._nextThoughtNeeded = nextThoughtNeeded;
    this._isRevision = isRevision;
    this._revisesThought = revisesThought;
    this._branchFromThought = branchFromThought;
    this._branchId = branchId;
    this._needsMoreThoughts = needsMoreThoughts;
  }

  // Getters
  get thought(): string {
    return this._thought;
  }

  get thoughtNumber(): number {
    return this._thoughtNumber;
  }

  get totalThoughts(): number {
    return this._totalThoughts;
  }

  get nextThoughtNeeded(): boolean {
    return this._nextThoughtNeeded;
  }

  get isRevision(): boolean | undefined {
    return this._isRevision;
  }

  get revisesThought(): number | undefined {
    return this._revisesThought;
  }

  get branchFromThought(): number | undefined {
    return this._branchFromThought;
  }

  get branchId(): string | undefined {
    return this._branchId;
  }

  get needsMoreThoughts(): boolean | undefined {
    return this._needsMoreThoughts;
  }

  // Domain methods
  public adjustTotalThoughts(newTotal: number): void {
    if (newTotal <= 0) {
      throw new Error("Total thoughts must be positive");
    }
    this._totalThoughts = newTotal;
  }

  public isPartOfBranch(): boolean {
    return !!this._branchId;
  }

  public isRevisingAnotherThought(): boolean {
    return !!this._isRevision;
  }

  // Factory method for creating a Thought from raw data
  public static create(data: {
    thought: string;
    thoughtNumber: number;
    totalThoughts: number;
    nextThoughtNeeded: boolean;
    isRevision?: boolean;
    revisesThought?: number;
    branchFromThought?: number;
    branchId?: string;
    needsMoreThoughts?: boolean;
  }): Thought {
    return new Thought(
      data.thought,
      data.thoughtNumber,
      data.totalThoughts,
      data.nextThoughtNeeded,
      data.isRevision,
      data.revisesThought,
      data.branchFromThought,
      data.branchId,
      data.needsMoreThoughts
    );
  }

  // Convert to plain object (for serialization)
  public toObject(): Record<string, any> {
    const result: Record<string, any> = {
      thought: this._thought,
      thoughtNumber: this._thoughtNumber,
      totalThoughts: this._totalThoughts,
      nextThoughtNeeded: this._nextThoughtNeeded,
    };

    if (this._isRevision !== undefined) result.isRevision = this._isRevision;
    if (this._revisesThought !== undefined) result.revisesThought = this._revisesThought;
    if (this._branchFromThought !== undefined) result.branchFromThought = this._branchFromThought;
    if (this._branchId !== undefined) result.branchId = this._branchId;
    if (this._needsMoreThoughts !== undefined) result.needsMoreThoughts = this._needsMoreThoughts;

    return result;
  }
}
