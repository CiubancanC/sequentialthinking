import { IRoleRepository } from "../../domain/interfaces/roleInterfaces.js";
import { Role } from "../../domain/models/role.js";
import { RoleResponse } from "../../domain/models/roleResponse.js";
import { Scenario } from "../../domain/models/scenario.js";
import { RoleLookupService } from "../../domain/services/roleLookupService.js";
import { DomainFactory } from "../../domain/utils/domainFactory.js";
import { Logger } from "../../utils/logger.js";
import { roleData, scenarioData, roleAliases } from "../../config/roleData.js";

/**
 * In-memory implementation of the role repository.
 */
export class InMemoryRoleRepository implements IRoleRepository {
  private roles: Map<string, Role> = new Map();
  private scenarios: Map<string, Scenario> = new Map();
  private responses: RoleResponse[] = [];
  private roleLookupService: RoleLookupService;

  /**
   * Creates a new InMemoryRoleRepository instance with predefined roles and scenarios.
   */
  constructor() {
    // Initialize with predefined roles and scenarios
    this.initializeRoles();
    this.initializeScenarios();

    // Initialize the role lookup service
    this.roleLookupService = new RoleLookupService(this.roles, roleAliases);
  }

  /**
   * Gets a role by its ID.
   * @param id The role ID
   * @returns The role if found, null otherwise
   */
  async getRoleById(id: string): Promise<Role | null> {
    return this.roles.get(id) || null;
  }

  /**
   * Gets a role by its name or ID.
   * @param name The role name or ID
   * @returns The role if found, null otherwise
   */
  async getRoleByName(name: string): Promise<Role | null> {
    Logger.debug(`getRoleByName called with name: "${name}"`);
    return this.roleLookupService.findRole(name);
  }

  /**
   * Gets all available roles.
   * @returns Array of all roles
   */
  async getAllRoles(): Promise<Role[]> {
    return Array.from(this.roles.values());
  }

  /**
   * Saves a role response.
   * @param response The role response to save
   * @returns The saved role response
   */
  async saveRoleResponse(response: RoleResponse): Promise<RoleResponse> {
    this.responses.push(response);
    return response;
  }

  /**
   * Gets all scenarios.
   * @returns Array of all scenarios
   */
  async getAllScenarios(): Promise<Scenario[]> {
    return Array.from(this.scenarios.values());
  }

  /**
   * Gets a scenario by its ID.
   * @param id The scenario ID
   * @returns The scenario if found, null otherwise
   */
  async getScenarioById(id: string): Promise<Scenario | null> {
    return this.scenarios.get(id) || null;
  }

  /**
   * Initializes the repository with predefined roles.
   */
  private initializeRoles(): void {
    // Create roles from configuration
    for (const roleConfig of roleData) {
      const role = DomainFactory.createRole({
        id: roleConfig.id,
        name: roleConfig.name,
        description: roleConfig.description,
        responsibilities: roleConfig.responsibilities,
        expertise: roleConfig.expertise
      });
      this.roles.set(role.id, role);
      Logger.debug(`Initialized role: ${role.id} (${role.name})`);
    }
  }

  /**
   * Initializes the repository with predefined scenarios.
   */
  private initializeScenarios(): void {
    // Create scenarios from configuration
    for (const scenarioConfig of scenarioData) {
      const scenario = DomainFactory.createScenario({
        id: scenarioConfig.id,
        title: scenarioConfig.title,
        description: scenarioConfig.description,
        category: scenarioConfig.category,
        complexity: scenarioConfig.complexity,
        suggestedRoles: scenarioConfig.suggestedRoles
      });
      this.scenarios.set(scenario.id, scenario);
      Logger.debug(`Initialized scenario: ${scenario.id} (${scenario.title})`);
    }
  }
}
