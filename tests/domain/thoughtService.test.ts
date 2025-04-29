import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThoughtServiceImpl } from '../../src/domain/services/thoughtService';
import { ThoughtRepository } from '../../src/domain/interfaces';
import { Thought } from '../../src/domain/models/thought';

// Mock repository for testing
class MockThoughtRepository implements ThoughtRepository {
  private thoughts: Thought[] = [];
  private branches: Record<string, Thought[]> = {};

  addThought(thought: Thought): void {
    this.thoughts.push(thought);
    if (thought.branchId) {
      if (!this.branches[thought.branchId]) {
        this.branches[thought.branchId] = [];
      }
      this.branches[thought.branchId].push(thought);
    }
  }

  getAllThoughts(): Thought[] {
    return [...this.thoughts];
  }

  getThoughtsByBranch(branchId: string): Thought[] {
    return this.branches[branchId] ? [...this.branches[branchId]] : [];
  }

  getAllBranchIds(): string[] {
    return Object.keys(this.branches);
  }

  clear(): void {
    this.thoughts = [];
    this.branches = {};
  }
}

describe('ThoughtServiceImpl', () => {
  let repository: ThoughtRepository;
  let service: ThoughtServiceImpl;

  beforeEach(() => {
    repository = new MockThoughtRepository();
    service = new ThoughtServiceImpl(repository);
  });

  it('should process a thought and add it to the repository', () => {
    const thoughtData = {
      thought: 'Test thought',
      thoughtNumber: 1,
      totalThoughts: 3,
      nextThoughtNeeded: true
    };

    const result = service.processThought(thoughtData);

    expect(result).toBeInstanceOf(Thought);
    expect(result.thought).toBe('Test thought');
    expect(service.getThoughtHistory()).toHaveLength(1);
  });

  it('should adjust totalThoughts if thoughtNumber is greater', () => {
    const thoughtData = {
      thought: 'Test thought',
      thoughtNumber: 5,
      totalThoughts: 3,
      nextThoughtNeeded: true
    };

    const result = service.processThought(thoughtData);

    expect(result.totalThoughts).toBe(5);
  });

  it('should track branches correctly', () => {
    // Add a regular thought
    service.processThought({
      thought: 'Regular thought',
      thoughtNumber: 1,
      totalThoughts: 3,
      nextThoughtNeeded: true
    });

    // Add a branch thought
    service.processThought({
      thought: 'Branch thought',
      thoughtNumber: 2,
      totalThoughts: 3,
      nextThoughtNeeded: true,
      branchFromThought: 1,
      branchId: 'branch-1'
    });

    const branches = service.getBranches();
    
    expect(Object.keys(branches)).toHaveLength(1);
    expect(branches['branch-1']).toHaveLength(1);
    expect(branches['branch-1'][0].thought).toBe('Branch thought');
  });

  it('should reset state correctly', () => {
    // Add some thoughts
    service.processThought({
      thought: 'Thought 1',
      thoughtNumber: 1,
      totalThoughts: 3,
      nextThoughtNeeded: true
    });

    service.processThought({
      thought: 'Thought 2',
      thoughtNumber: 2,
      totalThoughts: 3,
      nextThoughtNeeded: true
    });

    // Reset state
    service.resetState();

    expect(service.getThoughtHistory()).toHaveLength(0);
    expect(Object.keys(service.getBranches())).toHaveLength(0);
  });
});
