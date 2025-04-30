/**
 * Registry for all dependencies in the application.
 * This file centralizes the registration of all dependencies.
 */
import { DIContainer, Lifetime } from './types.js';
import { container } from './index.js';

// Import domain services
import { IRoleService } from '../../domain/interfaces/roleInterfaces.js';
import { RoleServiceImpl } from '../../domain/services/roleService.js';
import { IAutomaticRoleService } from '../../domain/services/automaticRoleService.js';
import { AutomaticRoleServiceImpl } from '../../domain/services/automaticRoleService.js';

// Import repositories
import { IRoleRepository } from '../../domain/interfaces/roleInterfaces.js';
import { InMemoryRoleRepository } from '../repositories/roleRepository.js';

// Import use cases
import { ProcessRolePromptUseCase } from '../../application/useCases/processRolePrompt.js';

// Import formatters
import { RolePromptFormatter } from '../../presentation/formatters/rolePromptFormatter.js';

// Define tokens for dependencies
export const DI_TOKENS = {
  // Repositories
  ROLE_REPOSITORY: 'roleRepository',

  // Services
  ROLE_SERVICE: 'roleService',
  AUTOMATIC_ROLE_SERVICE: 'automaticRoleService',

  // Use cases
  PROCESS_ROLE_PROMPT_USE_CASE: 'processRolePromptUseCase',

  // Formatters
  ROLE_PROMPT_FORMATTER: 'rolePromptFormatter',
};

/**
 * Registers all dependencies with the container.
 * @param container The DI container to register dependencies with
 */
export function registerDependencies(container: DIContainer): void {
  // Register repositories
  container.register<IRoleRepository>(
    DI_TOKENS.ROLE_REPOSITORY,
    () => new InMemoryRoleRepository(),
    { lifetime: Lifetime.SINGLETON }
  );

  // Register services
  container.register<IRoleService>(
    DI_TOKENS.ROLE_SERVICE,
    (c) => new RoleServiceImpl(c.resolve(DI_TOKENS.ROLE_REPOSITORY)),
    { lifetime: Lifetime.SINGLETON }
  );

  container.register<IAutomaticRoleService>(
    DI_TOKENS.AUTOMATIC_ROLE_SERVICE,
    (c) => new AutomaticRoleServiceImpl(c.resolve(DI_TOKENS.ROLE_REPOSITORY)),
    { lifetime: Lifetime.SINGLETON }
  );

  // Register use cases
  container.register<ProcessRolePromptUseCase>(
    DI_TOKENS.PROCESS_ROLE_PROMPT_USE_CASE,
    (c) => new ProcessRolePromptUseCase(c.resolve(DI_TOKENS.ROLE_SERVICE)),
    { lifetime: Lifetime.SINGLETON }
  );

  // Register formatters
  container.register(
    DI_TOKENS.ROLE_PROMPT_FORMATTER,
    () => RolePromptFormatter,
    { lifetime: Lifetime.SINGLETON }
  );
}

/**
 * Initializes the dependency injection system.
 * This should be called at application startup.
 */
export function initializeDI(): void {
  registerDependencies(container);
}
