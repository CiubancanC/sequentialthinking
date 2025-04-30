import { describe, it, expect } from 'vitest';
import { validateRolePromptData } from '../../../src/infrastructure/validation/rolePromptSchemas.js';
import { ValidationError } from '../../../src/utils/errors.js';

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
    expect(() => validateRolePromptData('invalid')).toThrow(ValidationError);
    expect(() => validateRolePromptData('invalid')).toThrow('Invalid role prompt data');
    expect(() => validateRolePromptData(null)).toThrow(ValidationError);
    expect(() => validateRolePromptData(undefined)).toThrow(ValidationError);
  });

  it('should throw error for missing role', () => {
    const invalidData = { context: 'implement feature' };
    expect(() => validateRolePromptData(invalidData)).toThrow(ValidationError);
    expect(() => validateRolePromptData(invalidData)).toThrow('Required');
  });

  it('should throw error for role with incorrect type', () => {
    const invalidData = { role: 123, context: 'implement feature' };
    expect(() => validateRolePromptData(invalidData)).toThrow(ValidationError);
    expect(() => validateRolePromptData(invalidData)).toThrow('Expected string');
  });

  it('should throw error for missing context', () => {
    const invalidData = { role: 'architect' };
    expect(() => validateRolePromptData(invalidData)).toThrow(ValidationError);
    expect(() => validateRolePromptData(invalidData)).toThrow('Required');
  });

  it('should throw error for context with incorrect type', () => {
    const invalidData = { role: 'architect', context: 123 };
    expect(() => validateRolePromptData(invalidData)).toThrow(ValidationError);
    expect(() => validateRolePromptData(invalidData)).toThrow('Expected string');
  });

  it('should throw error for scenarioId with incorrect type', () => {
    const invalidData = { role: 'architect', context: 'design', scenarioId: 123 };
    expect(() => validateRolePromptData(invalidData)).toThrow(ValidationError);
    expect(() => validateRolePromptData(invalidData)).toThrow('Expected string');
  });

  it('should validate scenarioId with empty string', () => {
    // Zod allows empty strings by default, we would need to add .min(1) to prevent this
    const data = { role: 'architect', context: 'design', scenarioId: '' };
    expect(validateRolePromptData(data)).toEqual(data);
  });
});
