import { describe, it, expect } from 'vitest';
import { CeomcpProcessor } from './CeomcpProcessor.js';

describe('CeomcpProcessor', () => {
  it('should create a CeomcpProcessor instance', () => {
    const processor = new CeomcpProcessor();
    expect(processor).toBeInstanceOf(CeomcpProcessor);
  });

  it('should throw an error when validateThoughtData is given invalid input', () => {
    const processor = new CeomcpProcessor();
    expect(() => processor.validateThoughtData({ thought: 123, thoughtNumber: 'abc', totalThoughts: null, nextThoughtNeeded: 'maybe' })).toThrowError();
  });
});
