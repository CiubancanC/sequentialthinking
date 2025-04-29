/**
 * In-memory implementation of the ThoughtRepository interface.
 * Stores thoughts in memory and provides methods for retrieving them.
 */
export class InMemoryThoughtRepository {
    thoughts = [];
    branches = {};
    /**
     * Adds a thought to the repository.
     * If the thought is part of a branch, it is also added to the branch collection.
     * @param thought The thought to add.
     */
    addThought(thought) {
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
    getAllThoughts() {
        return [...this.thoughts];
    }
    /**
     * Gets all thoughts in a specific branch.
     * @param branchId The ID of the branch.
     * @returns An array of thoughts in the branch.
     */
    getThoughtsByBranch(branchId) {
        return this.branches[branchId] ? [...this.branches[branchId]] : [];
    }
    /**
     * Gets all branch IDs.
     * @returns An array of branch IDs.
     */
    getAllBranchIds() {
        return Object.keys(this.branches);
    }
    /**
     * Clears all thoughts from the repository.
     */
    clear() {
        this.thoughts = [];
        this.branches = {};
    }
}
//# sourceMappingURL=thoughtRepository.js.map