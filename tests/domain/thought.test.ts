import { describe, it, expect } from 'vitest';
import { Thought } from '../../src/domain/models/thought';

describe('Thought', () => {
  it('should create a valid Thought instance', () => {
    const thought = new Thought(
      'This is a test thought',
      1,
      3,
      true
    );
    
    expect(thought).toBeInstanceOf(Thought);
    expect(thought.thought).toBe('This is a test thought');
    expect(thought.thoughtNumber).toBe(1);
    expect(thought.totalThoughts).toBe(3);
    expect(thought.nextThoughtNeeded).toBe(true);
  });
  
  it('should throw an error when creating a Thought with an empty thought string', () => {
    expect(() => new Thought('', 1, 3, true)).toThrowError('Thought must not be empty');
  });
  
  it('should throw an error when creating a Thought with a non-positive thought number', () => {
    expect(() => new Thought('Test', 0, 3, true)).toThrowError('Thought number must be positive');
  });
  
  it('should throw an error when creating a Thought with a non-positive total thoughts', () => {
    expect(() => new Thought('Test', 1, 0, true)).toThrowError('Total thoughts must be positive');
  });
  
  it('should throw an error when isRevision is true but revisesThought is not provided', () => {
    expect(() => new Thought('Test', 1, 3, true, true)).toThrowError('Revises thought must be provided when isRevision is true');
  });
  
  it('should throw an error when branchFromThought is provided but branchId is not', () => {
    expect(() => new Thought('Test', 1, 3, true, false, undefined, 1)).toThrowError('Branch ID must be provided when branchFromThought is provided');
  });
  
  it('should create a valid revision Thought', () => {
    const thought = new Thought(
      'This is a revision',
      2,
      3,
      true,
      true,
      1
    );
    
    expect(thought.isRevision).toBe(true);
    expect(thought.revisesThought).toBe(1);
  });
  
  it('should create a valid branch Thought', () => {
    const thought = new Thought(
      'This is a branch',
      2,
      3,
      true,
      false,
      undefined,
      1,
      'branch-1'
    );
    
    expect(thought.branchFromThought).toBe(1);
    expect(thought.branchId).toBe('branch-1');
  });
  
  it('should adjust total thoughts', () => {
    const thought = new Thought('Test', 1, 3, true);
    thought.adjustTotalThoughts(5);
    expect(thought.totalThoughts).toBe(5);
  });
  
  it('should throw an error when adjusting total thoughts to a non-positive value', () => {
    const thought = new Thought('Test', 1, 3, true);
    expect(() => thought.adjustTotalThoughts(0)).toThrowError('Total thoughts must be positive');
  });
  
  it('should correctly identify if a thought is part of a branch', () => {
    const regularThought = new Thought('Regular', 1, 3, true);
    const branchThought = new Thought('Branch', 2, 3, true, false, undefined, 1, 'branch-1');
    
    expect(regularThought.isPartOfBranch()).toBe(false);
    expect(branchThought.isPartOfBranch()).toBe(true);
  });
  
  it('should correctly identify if a thought is revising another thought', () => {
    const regularThought = new Thought('Regular', 1, 3, true);
    const revisionThought = new Thought('Revision', 2, 3, true, true, 1);
    
    expect(regularThought.isRevisingAnotherThought()).toBe(false);
    expect(revisionThought.isRevisingAnotherThought()).toBe(true);
  });
  
  it('should create a Thought from raw data using the factory method', () => {
    const data = {
      thought: 'Factory method',
      thoughtNumber: 1,
      totalThoughts: 3,
      nextThoughtNeeded: true,
      needsMoreThoughts: true
    };
    
    const thought = Thought.create(data);
    
    expect(thought).toBeInstanceOf(Thought);
    expect(thought.thought).toBe('Factory method');
    expect(thought.needsMoreThoughts).toBe(true);
  });
  
  it('should convert a Thought to a plain object', () => {
    const thought = new Thought(
      'Convert to object',
      1,
      3,
      true,
      true,
      1,
      undefined,
      undefined,
      true
    );
    
    const obj = thought.toObject();
    
    expect(obj).toEqual({
      thought: 'Convert to object',
      thoughtNumber: 1,
      totalThoughts: 3,
      nextThoughtNeeded: true,
      isRevision: true,
      revisesThought: 1,
      needsMoreThoughts: true
    });
  });
});
