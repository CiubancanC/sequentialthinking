import { describe, it, expect } from 'vitest';
import { validateRolePromptData } from '../../../src/infrastructure/validation/rolePromptSchemas.js';

describe('validateRolePromptData', () => {
  it('should successfully validate data with required fields', () => {
    const validData = { role: 'architect', context: 'design a system' };
    expect(validateRolePromptData(validData)).toEqual(validData);
  });

  it('should successfully validate data with required fields and scenarioId', () => {
    const validData = { role: 'senior-developer', context: 'implement feature', scenarioId: 'scenario1' };
    expect(validateRolePromptData(validData)).toEqual(validData);
  });

  it('should throw error for invalid input (not an object)', () => {
    expect(() => validateRolePromptData('invalid')).toThrow('Invalid input: expected an object');
    expect(() => validateRolePromptData(null)).toThrow('Invalid input: expected an object');
    expect(() => validateRolePromptData(undefined)).toThrow('Invalid input: expected an object');
  });

  it('should throw error for missing role', () => {
    const invalidData = { context: 'implement feature' };
    expect(() => validateRolePromptData(invalidData)).toThrow('Invalid input: role must be a non-empty string');
  });

  it('should throw error for role with incorrect type', () => {
    const invalidData = { role: 123, context: 'implement feature' };
    expect(() => validateRolePromptData(invalidData)).toThrow('Invalid input: role must be a non-empty string');
  });

  it('should throw error for missing context', () => {
    const invalidData = { role: 'architect' };
    expect(() => validateRolePromptData(invalidData)).toThrow('Invalid input: context must be a non-empty string');
  });

  it('should throw error for context with incorrect type', () => {
    const invalidData = { role: 'architect', context: 123 };
    expect(() => validateRolePromptData(invalidData)).toThrow('Invalid input: context must be a non-empty string');
  });

  it('should throw error for scenarioId with incorrect type', () => {
    const invalidData = { role: 'architect', context: 'design', scenarioId: 123 };
    expect(() => validateRolePromptData(invalidData)).toThrow('Invalid input: scenarioId must be a non-empty string if provided');
  });

  it('should throw error for scenarioId with empty string', () => {
    const invalidData = { role: 'architect', context: 'design', scenarioId: '' };
    expect(() => validateRolePromptData(invalidData)).toThrow('Invalid input: scenarioId must be a non-empty string if provided');
  });
});
