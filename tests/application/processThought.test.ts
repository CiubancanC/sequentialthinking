import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProcessThoughtUseCase } from '../../src/application/useCases/processThought';
import { ThoughtService } from '../../src/domain/interfaces';
import { Thought } from '../../src/domain/models/thought';

// Mock ThoughtService for testing
class MockThoughtService implements ThoughtService {
  private thoughts: Thought[] = [];
  private branches: Record<string, Thought[]> = {};

  processThought(thoughtData: unknown): Thought {
    const data = thoughtData as any;
    const thought = Thought.create({
      thought: data.thought,
      thoughtNumber: data.thoughtNumber,
      totalThoughts: data.totalThoughts,
      nextThoughtNeeded: data.nextThoughtNeeded,
      isRevision: data.isRevision,
      revisesThought: data.revisesThought,
      branchFromThought: data.branchFromThought,
      branchId: data.branchId,
      needsMoreThoughts: data.needsMoreThoughts
    });
    
    this.thoughts.push(thought);
    
    if (thought.branchId) {
      if (!this.branches[thought.branchId]) {
        this.branches[thought.branchId] = [];
      }
      this.branches[thought.branchId].push(thought);
    }
    
    return thought;
  }

  getThoughtHistory(): Thought[] {
    return [...this.thoughts];
  }

  getBranches(): Record<string, Thought[]> {
    return { ...this.branches };
  }

  resetState(): void {
    this.thoughts = [];
    this.branches = {};
  }
}

describe('ProcessThoughtUseCase', () => {
  let thoughtService: ThoughtService;
  let useCase: ProcessThoughtUseCase;

  beforeEach(() => {
    thoughtService = new MockThoughtService();
    useCase = new ProcessThoughtUseCase(thoughtService);
  });

  it('should process a thought successfully', () => {
    const input = {
      thought: 'Test thought',
      thoughtNumber: 1,
      totalThoughts: 3,
      nextThoughtNeeded: true
    };

    const result = useCase.execute(input);

    expect(result.data).toBeDefined();
    expect(result.error).toBeUndefined();
    expect(result.data?.thoughtNumber).toBe(1);
    expect(result.data?.totalThoughts).toBe(3);
    expect(result.data?.nextThoughtNeeded).toBe(true);
    expect(result.data?.thoughtHistoryLength).toBe(1);
  });

  it('should handle errors during thought processing', () => {
    // Mock the processThought method to throw an error
    vi.spyOn(thoughtService, 'processThought').mockImplementation(() => {
      throw new Error('Test error');
    });

    const input = {
      thought: 'Test thought',
      thoughtNumber: 1,
      totalThoughts: 3,
      nextThoughtNeeded: true
    };

    const result = useCase.execute(input);

    expect(result.data).toBeUndefined();
    expect(result.error).toBeDefined();
    expect(result.error?.error).toBe('Test error');
    expect(result.error?.status).toBe('failed');
  });

  it('should include branch information in the output', () => {
    // Add a regular thought
    useCase.execute({
      thought: 'Regular thought',
      thoughtNumber: 1,
      totalThoughts: 3,
      nextThoughtNeeded: true
    });

    // Add a branch thought
    const result = useCase.execute({
      thought: 'Branch thought',
      thoughtNumber: 2,
      totalThoughts: 3,
      nextThoughtNeeded: true,
      branchFromThought: 1,
      branchId: 'branch-1'
    });

    expect(result.data?.branches).toContain('branch-1');
    expect(result.data?.thoughtHistoryLength).toBe(2);
  });
});
