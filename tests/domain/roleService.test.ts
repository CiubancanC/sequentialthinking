import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RoleServiceImpl } from '../../src/domain/services/roleService.js';
import { IRoleRepository } from '../../src/domain/interfaces/roleInterfaces.js';
import { Role } from '../../src/domain/models/role.js';
import { RoleResponse } from '../../src/domain/models/roleResponse.js';
import { Scenario } from '../../src/domain/models/scenario.js';

describe('RoleService', () => {
  // Mock repository
  const mockRepository: IRoleRepository = {
    getRoleById: vi.fn(),
    getRoleByName: vi.fn(),
    getAllRoles: vi.fn(),
    saveRoleResponse: vi.fn(),
    getAllScenarios: vi.fn(),
    getScenarioById: vi.fn()
  };

  // Create service instance with mock repository
  let roleService: RoleServiceImpl;

  beforeEach(() => {
    vi.clearAllMocks();
    roleService = new RoleServiceImpl(mockRepository);
  });

  describe('getRoleByName', () => {
    it('should return a role when found in repository', async () => {
      // Arrange
      const mockRole = Role.create('test-id', 'test-role', 'Test Role', ['Responsibility'], ['Expertise']);
      (mockRepository.getRoleByName as any).mockResolvedValue(mockRole);

      // Act
      const result = await roleService.getRoleByName('test-role');

      // Assert
      expect(mockRepository.getRoleByName).toHaveBeenCalledWith('test-role');
      expect(result).toBe(mockRole);
    });

    it('should return null when role is not found', async () => {
      // Arrange
      (mockRepository.getRoleByName as any).mockResolvedValue(null);

      // Act
      const result = await roleService.getRoleByName('non-existent-role');

      // Assert
      expect(mockRepository.getRoleByName).toHaveBeenCalledWith('non-existent-role');
      expect(result).toBeNull();
    });
  });

  describe('generateRolePrompt', () => {
    it('should generate a prompt for a valid role', async () => {
      // Arrange
      const mockRole = Role.create('test-id', 'test-role', 'Test Role', ['Responsibility'], ['Expertise']);
      const mockPrompt = 'Generated prompt';
      vi.spyOn(mockRole, 'generatePrompt').mockReturnValue(mockPrompt);
      (mockRepository.getRoleByName as any).mockResolvedValue(mockRole);

      // Act
      const result = await roleService.generateRolePrompt('test-role', 'test context');

      // Assert
      expect(mockRepository.getRoleByName).toHaveBeenCalledWith('test-role');
      expect(mockRole.generatePrompt).toHaveBeenCalledWith('test context');
      expect(result).toBe(mockPrompt);
    });

    it('should throw an error when role is not found', async () => {
      // Arrange
      (mockRepository.getRoleByName as any).mockResolvedValue(null);

      // Act & Assert
      await expect(roleService.generateRolePrompt('non-existent-role', 'test context'))
        .rejects.toThrow('Role not found: non-existent-role');
      expect(mockRepository.getRoleByName).toHaveBeenCalledWith('non-existent-role');
    });
  });

  describe('createRoleResponse', () => {
    it('should create and save a role response', async () => {
      // Arrange
      const mockRole = Role.create('test-id', 'test-role', 'Test Role', ['Responsibility'], ['Expertise']);
      const mockRoleResponse = RoleResponse.create(
        'test-id',
        'test-role',
        'test context',
        'test analysis',
        ['test recommendation'],
        ['test next step']
      );

      (mockRepository.getRoleByName as any).mockResolvedValue(mockRole);
      (mockRepository.saveRoleResponse as any).mockResolvedValue(mockRoleResponse);

      // Act
      const result = await roleService.createRoleResponse(
        'test-role',
        'test context',
        'test analysis',
        ['test recommendation'],
        ['test next step']
      );

      // Assert
      expect(mockRepository.getRoleByName).toHaveBeenCalledWith('test-role');
      expect(mockRepository.saveRoleResponse).toHaveBeenCalled();
      expect(result).toBe(mockRoleResponse);
    });

    it('should throw an error when role is not found', async () => {
      // Arrange
      (mockRepository.getRoleByName as any).mockResolvedValue(null);

      // Act & Assert
      await expect(roleService.createRoleResponse(
        'non-existent-role',
        'test context',
        'test analysis',
        ['test recommendation'],
        ['test next step']
      )).rejects.toThrow('Role not found: non-existent-role');

      expect(mockRepository.getRoleByName).toHaveBeenCalledWith('non-existent-role');
      expect(mockRepository.saveRoleResponse).not.toHaveBeenCalled();
    });
  });

  describe('getAllScenarios', () => {
    it('should return all scenarios from repository', async () => {
      // Arrange
      const mockScenarios = [
        Scenario.create('scenario-1', 'Scenario 1', 'Description 1', 'Category 1', 'low', ['Role 1']),
        Scenario.create('scenario-2', 'Scenario 2', 'Description 2', 'Category 2', 'medium', ['Role 2'])
      ];
      (mockRepository.getAllScenarios as any).mockResolvedValue(mockScenarios);

      // Act
      const result = await roleService.getAllScenarios();

      // Assert
      expect(mockRepository.getAllScenarios).toHaveBeenCalled();
      expect(result).toBe(mockScenarios);
    });
  });

  describe('getScenarioById', () => {
    it('should return a scenario when found in repository', async () => {
      // Arrange
      const mockScenario = Scenario.create('scenario-1', 'Scenario 1', 'Description 1', 'Category 1', 'low', ['Role 1']);
      (mockRepository.getScenarioById as any).mockResolvedValue(mockScenario);

      // Act
      const result = await roleService.getScenarioById('scenario-1');

      // Assert
      expect(mockRepository.getScenarioById).toHaveBeenCalledWith('scenario-1');
      expect(result).toBe(mockScenario);
    });

    it('should return null when scenario is not found', async () => {
      // Arrange
      (mockRepository.getScenarioById as any).mockResolvedValue(null);

      // Act
      const result = await roleService.getScenarioById('non-existent-scenario');

      // Assert
      expect(mockRepository.getScenarioById).toHaveBeenCalledWith('non-existent-scenario');
      expect(result).toBeNull();
    });
  });
});
