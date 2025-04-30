import { describe, it, expect } from 'vitest';
import { DomainFactory } from '../../src/domain/utils/domainFactory';
import { Role } from '../../src/domain/models/role';
import { Scenario } from '../../src/domain/models/scenario';
import { RoleResponse } from '../../src/domain/models/roleResponse';

describe('DomainFactory', () => {
  describe('createRole', () => {
    it('should create a Role instance successfully', () => {
      const role = DomainFactory.createRole({
        id: 'test-role-id',
        name: 'Test Role',
        description: 'A role for testing',
        responsibilities: ['Responsibility 1'],
        expertise: ['Expertise 1']
      });
      
      expect(role).toBeInstanceOf(Role);
      expect(role.id).toBe('test-role-id');
      expect(role.name).toBe('Test Role');
      expect(role.description).toBe('A role for testing');
      expect(role.responsibilities).toEqual(['Responsibility 1']);
      expect(role.expertise).toEqual(['Expertise 1']);
    });

    it('should throw error if Role is created with missing required fields', () => {
      expect(() => DomainFactory.createRole({
        id: '',
        name: 'Test Role',
        description: 'A role for testing',
        responsibilities: ['Resp'],
        expertise: ['Exp']
      })).toThrow('id: id is required');
    });
  });

  describe('createScenario', () => {
    it('should create a Scenario instance successfully', () => {
      const scenario = DomainFactory.createScenario({
        id: 'test-scenario-id',
        title: 'Test Scenario',
        description: 'A scenario for testing',
        category: 'testing',
        complexity: 'low',
        suggestedRoles: ['Test Role']
      });
      
      expect(scenario).toBeInstanceOf(Scenario);
      expect(scenario.id).toBe('test-scenario-id');
      expect(scenario.title).toBe('Test Scenario');
      expect(scenario.description).toBe('A scenario for testing');
      expect(scenario.category).toBe('testing');
      expect(scenario.complexity).toBe('low');
      expect(scenario.suggestedRoles).toEqual(['Test Role']);
    });

    it('should test the isSuggestedRole method', () => {
      const scenario = DomainFactory.createScenario({
        id: 'test-scenario-id',
        title: 'Test Scenario',
        description: 'A scenario for testing',
        category: 'testing',
        complexity: 'low',
        suggestedRoles: ['Test Role', 'Another Role']
      });
      
      expect(scenario.isSuggestedRole('Test Role')).toBe(true);
      expect(scenario.isSuggestedRole('test role')).toBe(true); // Case insensitive
      expect(scenario.isSuggestedRole('  Test Role  ')).toBe(true); // Trims whitespace
      expect(scenario.isSuggestedRole('Unknown Role')).toBe(false);
    });
  });

  describe('createRoleResponse', () => {
    it('should create a RoleResponse instance successfully', () => {
      const response = DomainFactory.createRoleResponse({
        roleId: 'role-id',
        roleName: 'Role Name',
        context: 'Context',
        analysis: 'Analysis',
        recommendations: ['Rec 1'],
        nextSteps: ['Step 1']
      });
      
      expect(response).toBeInstanceOf(RoleResponse);
      expect(response.roleId).toBe('role-id');
      expect(response.roleName).toBe('Role Name');
      expect(response.context).toBe('Context');
      expect(response.analysis).toBe('Analysis');
      expect(response.recommendations).toEqual(['Rec 1']);
      expect(response.nextSteps).toEqual(['Step 1']);
    });

    it('should create a RoleResponse instance with default values', () => {
      const response = DomainFactory.createRoleResponse({
        roleId: 'role-id',
        roleName: 'Role Name',
        context: 'Context',
        analysis: 'Analysis',
        recommendations: ['Rec 1']
      });
      
      expect(response.nextSteps).toEqual([]);
      expect(response.codeExamples).toEqual([]);
    });

    it('should convert RoleResponse to JSON object', () => {
      const response = DomainFactory.createRoleResponse({
        roleId: 'role-id',
        roleName: 'Role Name',
        context: 'Context',
        analysis: 'Analysis',
        recommendations: ['Rec 1', 'Rec 2'],
        nextSteps: ['Step 1'],
        codeExamples: ['Code 1']
      });
      
      const json = response.toJSON();
      expect(json).toEqual({
        roleId: 'role-id',
        roleName: 'Role Name',
        context: 'Context',
        analysis: 'Analysis',
        recommendations: ['Rec 1', 'Rec 2'],
        nextSteps: ['Step 1'],
        codeExamples: ['Code 1']
      });
    });
  });
});
