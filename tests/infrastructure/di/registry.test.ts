import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DIContainerImpl } from '../../../src/infrastructure/di/container.js';
import { registerDependencies, DI_TOKENS } from '../../../src/infrastructure/di/registry.js';
import { IRoleService } from '../../../src/domain/interfaces/roleInterfaces.js';
import { ProcessRolePromptUseCase } from '../../../src/application/useCases/processRolePrompt.js';

describe('DI Registry', () => {
  let container: DIContainerImpl;

  beforeEach(() => {
    container = new DIContainerImpl();
    registerDependencies(container);
  });

  it('should register all required dependencies', () => {
    // Check that all tokens are registered
    for (const token of Object.values(DI_TOKENS)) {
      expect(container.has(token)).toBe(true);
    }
  });

  it('should resolve the role repository', () => {
    const repository = container.resolve(DI_TOKENS.ROLE_REPOSITORY);
    expect(repository).toBeDefined();
    expect(typeof repository.getRoleByName).toBe('function');
    expect(typeof repository.getAllRoles).toBe('function');
  });

  it('should resolve the role service with its dependencies', () => {
    const service = container.resolve<IRoleService>(DI_TOKENS.ROLE_SERVICE);
    expect(service).toBeDefined();
    expect(typeof service.getRoleByName).toBe('function');
    expect(typeof service.generateRolePrompt).toBe('function');
  });

  it('should resolve the process role prompt use case with its dependencies', () => {
    const useCase = container.resolve<ProcessRolePromptUseCase>(DI_TOKENS.PROCESS_ROLE_PROMPT_USE_CASE);
    expect(useCase).toBeDefined();
    expect(typeof useCase.execute).toBe('function');
  });

  it('should resolve the automatic role service with its dependencies', () => {
    const service = container.resolve(DI_TOKENS.AUTOMATIC_ROLE_SERVICE);
    expect(service).toBeDefined();
    expect(typeof service.selectRoleForContext).toBe('function');
    expect(typeof service.selectScenarioForContext).toBe('function');
  });
});
