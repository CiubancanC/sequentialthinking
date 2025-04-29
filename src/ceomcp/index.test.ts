import { describe, it, expect } from 'vitest';
import { CeomcpServer } from './index.js';

describe('CeomcpServer', () => {
  it('should create a CeomcpServer instance', () => {
    const server = new CeomcpServer();
    expect(server).toBeInstanceOf(CeomcpServer);
  });

  it('should throw an error when validateThoughtData is given invalid input', () => {
    const server = new CeomcpServer();
    expect(() => server.validateThoughtData({ thought: 123, thoughtNumber: 'abc', totalThoughts: null, nextThoughtNeeded: 'maybe' })).toThrowError();
  });
});
