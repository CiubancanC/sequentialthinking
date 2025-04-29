import { describe, it, expect } from 'vitest';
import { RolePromptFormatter } from '../../../src/presentation/formatters/rolePromptFormatter.js';
import { Role } from '../../../src/domain/models/role.js';

describe('RolePromptFormatter', () => {
  describe('formatForConsole', () => {
    it('should format role prompt response for console display', () => {
      const mockRole = Role.create(
        'architect-id',
        'architect',
        'System design expert',
        ['Design system architecture', 'Create technical blueprints'],
        ['Scalability', 'Security', 'Cloud Computing']
      );
      const context = 'Design a new microservice';
      const expectedOutput = `
=== Role Prompt Request ===
Role: architect
Context: Design a new microservice

=== Role Information ===
Description: System design expert
Responsibilities:
  - Design system architecture
  - Create technical blueprints
Expertise:
  - Scalability
  - Security
  - Cloud Computing
`;
      expect(RolePromptFormatter.formatForConsole(mockRole, context)).toBe(expectedOutput);
    });
  });

  describe('formatOutputToJson', () => {
    it('should format a successful response to JSON', () => {
      const successfulResponse = {
        status: 'success',
        data: {
          response: 'This is a generated response.',
          role: {
            name: 'architect',
            description: 'System design expert',
            responsibilities: ['Design system architecture'],
            expertise: ['Scalability'],
          },
        },
      };
      const expectedJson = JSON.stringify(successfulResponse, null, 2);
      expect(RolePromptFormatter.formatOutputToJson(successfulResponse as any)).toBe(expectedJson);
    });

    it('should format an error response to JSON', () => {
      const errorResponse = {
        status: 'failed' as 'failed', // Cast to literal type
        error: 'An error occurred.',
      };
      const expectedJson = JSON.stringify(errorResponse, null, 2);
      expect(RolePromptFormatter.formatOutputToJson(errorResponse)).toBe(expectedJson);
    });
  });
});
