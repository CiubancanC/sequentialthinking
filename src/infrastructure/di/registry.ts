/**
 * Registry for all dependencies in the application.
 * This file centralizes the registration of all dependencies.
 */
import { DIContainer, Lifetime } from './types.js';
import { container } from './index.js';

// Import domain interfaces and implementations
import { IRoleService, IRoleRepository, IAutomaticRoleService } from '../../domain/interfaces/roleInterfaces.js';
import { IRoleLookupService } from '../../domain/interfaces/serviceLookupInterfaces.js';
import { IAiModelService } from '../../domain/interfaces/aiModelInterfaces.js';
import { RoleServiceImpl } from '../../domain/services/roleService.js';
import { AutomaticRoleServiceImpl } from '../../domain/services/automaticRoleService.js';
import { RoleLookupService } from '../../domain/services/roleLookupService.js';
import { AiModelServiceImpl } from '../../domain/services/aiModelService.js';
import { InMemoryRoleRepository } from '../repositories/roleRepository.js';
import { roleAliases } from '../../config/roleData.js';

// Import infrastructure services
import { GeminiApiClient } from '../services/geminiApiClient.js';

// Import application interfaces and implementations
import { IProcessRolePromptUseCase } from '../../application/interfaces/useCaseInterfaces.js';
import { ProcessRolePromptUseCase } from '../../application/useCases/processRolePrompt.js';

// Import presentation interfaces and implementations
import { IRolePromptFormatter } from '../../presentation/interfaces/formatterInterfaces.js';
import { RolePromptFormatter } from '../../presentation/formatters/rolePromptFormatter.js';

// Define tokens for dependencies
export const DI_TOKENS = {
  // Repositories
  ROLE_REPOSITORY: 'roleRepository',

  // Services
  ROLE_SERVICE: 'roleService',
  AUTOMATIC_ROLE_SERVICE: 'automaticRoleService',
  ROLE_LOOKUP_SERVICE: 'roleLookupService',
  GEMINI_API_CLIENT: 'geminiApiClient',
  AI_MODEL_SERVICE: 'aiModelService',

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

  // Register role lookup service
  container.register<IRoleLookupService>(
    DI_TOKENS.ROLE_LOOKUP_SERVICE,
    () => {
      // In a real implementation, we would get the roles from the repository
      // For now, we'll use an empty map that will be populated later
      const roles = new Map();
      return new RoleLookupService(roles, roleAliases);
    },
    { lifetime: Lifetime.SINGLETON }
  );

  // Register Gemini API client
  container.register<GeminiApiClient>(
    DI_TOKENS.GEMINI_API_CLIENT,
    () => new GeminiApiClient(),
    { lifetime: Lifetime.SINGLETON }
  );

  // Register AI model service
  container.register<IAiModelService>(
    DI_TOKENS.AI_MODEL_SERVICE,
    (c) => new AiModelServiceImpl(c.resolve<GeminiApiClient>(DI_TOKENS.GEMINI_API_CLIENT)),
    { lifetime: Lifetime.SINGLETON }
  );

  // Register use cases
  container.register<IProcessRolePromptUseCase>(
    DI_TOKENS.PROCESS_ROLE_PROMPT_USE_CASE,
    (c) => new ProcessRolePromptUseCase(
      c.resolve<IRoleService>(DI_TOKENS.ROLE_SERVICE),
      c.resolve<IAiModelService>(DI_TOKENS.AI_MODEL_SERVICE)
    ),
    { lifetime: Lifetime.SINGLETON }
  );

  // Register formatters
  container.register<IRolePromptFormatter>(
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
