/**
 * Represents a thought in the CEOMCP thinking process.
 * This is the core domain entity for the application.
 */
export class Thought {
    _thought;
    _thoughtNumber;
    _totalThoughts;
    _nextThoughtNeeded;
    _isRevision;
    _revisesThought;
    _branchFromThought;
    _branchId;
    _needsMoreThoughts;
    constructor(thought, thoughtNumber, totalThoughts, nextThoughtNeeded, isRevision, revisesThought, branchFromThought, branchId, needsMoreThoughts) {
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
    get thought() {
        return this._thought;
    }
    get thoughtNumber() {
        return this._thoughtNumber;
    }
    get totalThoughts() {
        return this._totalThoughts;
    }
    get nextThoughtNeeded() {
        return this._nextThoughtNeeded;
    }
    get isRevision() {
        return this._isRevision;
    }
    get revisesThought() {
        return this._revisesThought;
    }
    get branchFromThought() {
        return this._branchFromThought;
    }
    get branchId() {
        return this._branchId;
    }
    get needsMoreThoughts() {
        return this._needsMoreThoughts;
    }
    // Domain methods
    adjustTotalThoughts(newTotal) {
        if (newTotal <= 0) {
            throw new Error("Total thoughts must be positive");
        }
        this._totalThoughts = newTotal;
    }
    isPartOfBranch() {
        return !!this._branchId;
    }
    isRevisingAnotherThought() {
        return !!this._isRevision;
    }
    // Factory method for creating a Thought from raw data
    static create(data) {
        return new Thought(data.thought, data.thoughtNumber, data.totalThoughts, data.nextThoughtNeeded, data.isRevision, data.revisesThought, data.branchFromThought, data.branchId, data.needsMoreThoughts);
    }
    // Convert to plain object (for serialization)
    toObject() {
        const result = {
            thought: this._thought,
            thoughtNumber: this._thoughtNumber,
            totalThoughts: this._totalThoughts,
            nextThoughtNeeded: this._nextThoughtNeeded,
        };
        if (this._isRevision !== undefined)
            result.isRevision = this._isRevision;
        if (this._revisesThought !== undefined)
            result.revisesThought = this._revisesThought;
        if (this._branchFromThought !== undefined)
            result.branchFromThought = this._branchFromThought;
        if (this._branchId !== undefined)
            result.branchId = this._branchId;
        if (this._needsMoreThoughts !== undefined)
            result.needsMoreThoughts = this._needsMoreThoughts;
        return result;
    }
}
//# sourceMappingURL=thought.js.map