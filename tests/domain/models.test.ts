import { describe, it, expect } from 'vitest';
import { Role } from '../../src/domain/models/role';
import { RoleResponse } from '../../src/domain/models/roleResponse';
import { Scenario } from '../../src/domain/models/scenario';


describe('Domain Models', () => {
  describe('Role', () => {
    it('should create a Role instance successfully', () => {
      const role = Role.create('test-role-id', 'Test Role', 'A role for testing', ['Responsibility 1'], ['Expertise 1']);
      expect(role).toBeInstanceOf(Role);
      expect(role.id).toBe('test-role-id');
      expect(role.name).toBe('Test Role');
      expect(role.description).toBe('A role for testing');
      expect(role.responsibilities).toEqual(['Responsibility 1']);
      expect(role.expertise).toEqual(['Expertise 1']);
    });

    it('should throw error if Role is created with missing required fields', () => {
      expect(() => Role.create('', 'Test Role', 'A role for testing', ['Resp'], ['Exp'])).toThrow('id: id is required');
      expect(() => Role.create('id', '', 'A role for testing', ['Resp'], ['Exp'])).toThrow('name: name is required');
      expect(() => Role.create('id', 'Test Role', '', ['Resp'], ['Exp'])).toThrow('description: description is required');
    });

    it('should throw error if Role is created with no responsibilities', () => {
      expect(() => Role.create('id', 'Test Role', 'Desc', [], ['Exp'])).toThrow('responsibilities: responsibilities must have at least one item');
      expect(() => Role.create('id', 'Test Role', 'Desc', undefined as any, ['Exp'])).toThrow('responsibilities: responsibilities must have at least one item');
    });

    it('should throw error if Role is created with no expertise', () => {
      expect(() => Role.create('id', 'Test Role', 'Desc', ['Resp'], [])).toThrow('expertise: expertise must have at least one item');
      expect(() => Role.create('id', 'Test Role', 'Desc', ['Resp'], undefined as any)).toThrow('expertise: expertise must have at least one item');
    });

    it('should generate a correct prompt string', () => {
      const role = Role.create('test-role-id', 'Test Role', 'A role for testing.', ['Resp 1', 'Resp 2'], ['Exp 1', 'Exp 2']);
      const context = 'Solve this problem';
      const generatedPrompt = role.generatePrompt(context);

      // Check that the prompt contains the expected parts
      expect(generatedPrompt).toContain('As a senior Test Role, I will address the following: Solve this problem');
      expect(generatedPrompt).toContain('My responsibilities include:');
      expect(generatedPrompt).toContain('- Resp 1');
      expect(generatedPrompt).toContain('- Resp 2');
      expect(generatedPrompt).toContain('My areas of expertise include:');
      expect(generatedPrompt).toContain('- Exp 1');
      expect(generatedPrompt).toContain('- Exp 2');
      expect(generatedPrompt).toContain('A role for testing.');
      expect(generatedPrompt).toContain('I will provide a comprehensive response with the following structure:');
      expect(generatedPrompt).toContain('I will now analyze the problem and provide expert guidance:');
    });
  });

  describe('RoleResponse', () => {
    it('should create a RoleResponse instance successfully', () => {
      const response = RoleResponse.create('role-id', 'Role Name', 'Context', 'Analysis', ['Rec 1'], ['Step 1']);
      expect(response).toBeInstanceOf(RoleResponse);
      expect(response.roleId).toBe('role-id');
      expect(response.roleName).toBe('Role Name');
      expect(response.context).toBe('Context');
      expect(response.analysis).toBe('Analysis');
      expect(response.recommendations).toEqual(['Rec 1']);
      expect(response.nextSteps).toEqual(['Step 1']);
    });

    it('should create a RoleResponse instance successfully with no next steps', () => {
      const response = RoleResponse.create('role-id', 'Role Name', 'Context', 'Analysis', ['Rec 1']);
      expect(response).toBeInstanceOf(RoleResponse);
      expect(response.nextSteps).toEqual([]);
    });


    it('should throw error if RoleResponse is created with missing required fields', () => {
      expect(() => RoleResponse.create('', 'Name', 'Context', 'Analysis', ['Rec'])).toThrow('roleId: roleId is required');
      expect(() => RoleResponse.create('id', '', 'Context', 'Analysis', ['Rec'])).toThrow('roleName: roleName is required');
      expect(() => RoleResponse.create('id', 'Name', '', 'Analysis', ['Rec'])).toThrow('context: context is required');
      expect(() => RoleResponse.create('id', 'Name', 'Context', '', ['Rec'])).toThrow('analysis: analysis is required');
    });

    it('should throw error if RoleResponse is created with no recommendations', () => {
      expect(() => RoleResponse.create('id', 'Name', 'Context', 'Analysis', [])).toThrow('recommendations: recommendations must have at least one item');
      expect(() => RoleResponse.create('id', 'Name', 'Context', 'Analysis', undefined as any)).toThrow('recommendations: recommendations must have at least one item');
    });

    it('should convert RoleResponse to JSON object', () => {
      const response = RoleResponse.create('role-id', 'Role Name', 'Context', 'Analysis', ['Rec 1', 'Rec 2'], ['Step 1']);
      const json = response.toJSON();
      expect(json).toEqual({
        roleId: 'role-id',
        roleName: 'Role Name',
        context: 'Context',
        analysis: 'Analysis',
        recommendations: ['Rec 1', 'Rec 2'],
        nextSteps: ['Step 1'],
        codeExamples: []
      });
    });
  });

  describe('Scenario', () => {
    it('should create a Scenario instance successfully', () => {
      const scenario = Scenario.create('test-scenario-id', 'Test Scenario', 'A scenario for testing', 'testing', 'low', ['Test Role']);
      expect(scenario).toBeInstanceOf(Scenario);
      expect(scenario.id).toBe('test-scenario-id');
      expect(scenario.title).toBe('Test Scenario');
      expect(scenario.description).toBe('A scenario for testing');
      expect(scenario.category).toBe('testing');
      expect(scenario.complexity).toBe('low');
      expect(scenario.suggestedRoles).toEqual(['Test Role']);
    });

    it('should throw error if Scenario is created with missing required fields', () => {
      expect(() => Scenario.create('', 'Title', 'Desc', 'Cat', 'low', ['Role'])).toThrow('id: id is required');
      expect(() => Scenario.create('id', '', 'Desc', 'Cat', 'low', ['Role'])).toThrow('title: title is required');
      expect(() => Scenario.create('id', 'Title', '', 'Cat', 'low', ['Role'])).toThrow('description: description is required');
      expect(() => Scenario.create('id', 'Title', 'Desc', '', 'low', ['Role'])).toThrow('category: category is required');
    });

    it('should throw error if Scenario is created with no suggested roles', () => {
      expect(() => Scenario.create('id', 'Title', 'Desc', 'Cat', 'low', [])).toThrow('suggestedRoles: suggestedRoles must have at least one item');
      expect(() => Scenario.create('id', 'Title', 'Desc', 'Cat', 'low', undefined as any)).toThrow('suggestedRoles: suggestedRoles must have at least one item');
    });

    it('should format the scenario correctly', () => {
      const scenario = Scenario.create('test-scenario-id', 'Test Scenario', 'A scenario for testing.', 'testing', 'medium', ['Role A', 'Role B']);
      const expectedFormat = `# Test Scenario (medium complexity)

## Description
A scenario for testing.

## Category
testing

## Suggested Roles
- Role A
- Role B
`;
      expect(scenario.format()).toBe(expectedFormat);
    });
  });
});
