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
      expect(() => Role.create('', 'Test Role', 'A role for testing', ['Resp'], ['Exp'])).toThrow('Role must have an id, name, and description');
      expect(() => Role.create('id', '', 'A role for testing', ['Resp'], ['Exp'])).toThrow('Role must have an id, name, and description');
      expect(() => Role.create('id', 'Test Role', '', ['Resp'], ['Exp'])).toThrow('Role must have an id, name, and description');
    });

    it('should throw error if Role is created with no responsibilities', () => {
      expect(() => Role.create('id', 'Test Role', 'Desc', [], ['Exp'])).toThrow('Role must have at least one responsibility');
      expect(() => Role.create('id', 'Test Role', 'Desc', undefined as any, ['Exp'])).toThrow('Role must have at least one responsibility');
    });

    it('should throw error if Role is created with no expertise', () => {
      expect(() => Role.create('id', 'Test Role', 'Desc', ['Resp'], [])).toThrow('Role must have at least one area of expertise');
      expect(() => Role.create('id', 'Test Role', 'Desc', ['Resp'], undefined as any)).toThrow('Role must have at least one area of expertise');
    });

    it('should generate a correct prompt string', () => {
      const role = Role.create('test-role-id', 'Test Role', 'A role for testing.', ['Resp 1', 'Resp 2'], ['Exp 1', 'Exp 2']);
      const context = 'Solve this problem';
      const expectedPrompt = `As a senior Test Role, I will address the following: Solve this problem

My responsibilities include:
- Resp 1
- Resp 2

My areas of expertise include:
- Exp 1
- Exp 2

A role for testing.

I will now analyze the problem and provide expert guidance:
`;
      expect(role.generatePrompt(context)).toBe(expectedPrompt);
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
      expect(() => RoleResponse.create('', 'Name', 'Context', 'Analysis', ['Rec'])).toThrow('RoleResponse must have a roleId, roleName, context, and analysis');
      expect(() => RoleResponse.create('id', '', 'Context', 'Analysis', ['Rec'])).toThrow('RoleResponse must have a roleId, roleName, context, and analysis');
      expect(() => RoleResponse.create('id', 'Name', '', 'Analysis', ['Rec'])).toThrow('RoleResponse must have a roleId, roleName, context, and analysis');
      expect(() => RoleResponse.create('id', 'Name', 'Context', '', ['Rec'])).toThrow('RoleResponse must have a roleId, roleName, context, and analysis');
    });

    it('should throw error if RoleResponse is created with no recommendations', () => {
      expect(() => RoleResponse.create('id', 'Name', 'Context', 'Analysis', [])).toThrow('RoleResponse must have at least one recommendation');
      expect(() => RoleResponse.create('id', 'Name', 'Context', 'Analysis', undefined as any)).toThrow('RoleResponse must have at least one recommendation');
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
      expect(() => Scenario.create('', 'Title', 'Desc', 'Cat', 'low', ['Role'])).toThrow('Scenario must have an id, title, description, and category');
      expect(() => Scenario.create('id', '', 'Desc', 'Cat', 'low', ['Role'])).toThrow('Scenario must have an id, title, description, and category');
      expect(() => Scenario.create('id', 'Title', '', 'Cat', 'low', ['Role'])).toThrow('Scenario must have an id, title, description, and category');
      expect(() => Scenario.create('id', 'Title', 'Desc', '', 'low', ['Role'])).toThrow('Scenario must have an id, title, description, and category');
    });

    it('should throw error if Scenario is created with no suggested roles', () => {
      expect(() => Scenario.create('id', 'Title', 'Desc', 'Cat', 'low', [])).toThrow('Scenario must have at least one suggested role');
      expect(() => Scenario.create('id', 'Title', 'Desc', 'Cat', 'low', undefined as any)).toThrow('Scenario must have at least one suggested role');
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
