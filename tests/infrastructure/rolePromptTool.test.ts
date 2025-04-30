import { describe, it, expect } from 'vitest';
import { ROLE_PROMPT_TOOL } from '../../src/infrastructure/tools/rolePromptTool.js';

describe('RolePromptTool', () => {
  it('should have the correct name', () => {
    expect(ROLE_PROMPT_TOOL.name).toBe('rolePrompt');
  });

  it('should have a description', () => {
    expect(ROLE_PROMPT_TOOL.description).toBeDefined();
    expect(typeof ROLE_PROMPT_TOOL.description).toBe('string');
    expect(ROLE_PROMPT_TOOL.description.length).toBeGreaterThan(0);
  });

  it('should have the correct input schema', () => {
    expect(ROLE_PROMPT_TOOL.inputSchema).toBeDefined();
    expect(ROLE_PROMPT_TOOL.inputSchema.type).toBe('object');

    // Check properties
    const properties = ROLE_PROMPT_TOOL.inputSchema.properties;
    expect(properties).toBeDefined();

    // Check role property
    expect(properties.role).toBeDefined();
    expect(properties.role.type).toBe('string');
    expect(properties.role.description).toBeDefined();

    // Check context property
    expect(properties.context).toBeDefined();
    expect(properties.context.type).toBe('string');
    expect(properties.context.description).toBeDefined();

    // Check scenarioId property
    expect(properties.scenarioId).toBeDefined();
    expect(properties.scenarioId.type).toBe('string');
    expect(properties.scenarioId.description).toBeDefined();
  });

  it('should have the correct required fields', () => {
    expect(ROLE_PROMPT_TOOL.inputSchema.required).toBeDefined();
    expect(ROLE_PROMPT_TOOL.inputSchema.required).toContain('role');
    expect(ROLE_PROMPT_TOOL.inputSchema.required).toContain('context');
    expect(ROLE_PROMPT_TOOL.inputSchema.required).not.toContain('scenarioId');
  });

  it('should include information about available roles in the description', () => {
    const description = ROLE_PROMPT_TOOL.description;
    expect(description).toContain('architect');
    expect(description).toContain('senior-developer');
    expect(description).toContain('qa-engineer');
    expect(description).toContain('devops-engineer');
  });
});
