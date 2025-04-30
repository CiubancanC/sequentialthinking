import { Role } from "../models/role.js";
import { RoleResponse } from "../models/roleResponse.js";
import { Scenario } from "../models/scenario.js";

/**
 * Interface for role repository operations.
 */
export interface IRoleRepository {
  /**
   * Gets a role by its ID.
   * @param id The role ID
   * @returns The role if found, null otherwise
   */
  getRoleById(id: string): Promise<Role | null>;

  /**
   * Gets a role by its name.
   * @param name The role name
   * @returns The role if found, null otherwise
   */
  getRoleByName(name: string): Promise<Role | null>;

  /**
   * Gets all available roles.
   * @returns Array of all roles
   */
  getAllRoles(): Promise<Role[]>;

  /**
   * Saves a role response.
   * @param response The role response to save
   * @returns The saved role response
   */
  saveRoleResponse(response: RoleResponse): Promise<RoleResponse>;

  /**
   * Gets all scenarios.
   * @returns Array of all scenarios
   */
  getAllScenarios(): Promise<Scenario[]>;

  /**
   * Gets a scenario by its ID.
   * @param id The scenario ID
   * @returns The scenario if found, null otherwise
   */
  getScenarioById(id: string): Promise<Scenario | null>;
}

/**
 * Interface for role service operations.
 */
export interface IRoleService {
  /**
   * Gets a role by its name.
   * @param name The role name
   * @returns The role if found, null otherwise
   */
  getRoleByName(name: string): Promise<Role | null>;

  /**
   * Generates a prompt for a specific role and context.
   * @param roleName The name of the role
   * @param context The context or problem to address
   * @returns The generated prompt
   */
  generateRolePrompt(roleName: string, context: string): Promise<string>;

  /**
   * Creates a role response.
   * @param roleName The name of the role
   * @param context The context or problem addressed
   * @param analysis The detailed analysis
   * @param recommendations Key recommendations
   * @param nextSteps Suggested next steps
   * @returns The created role response
   */
  createRoleResponse(
    roleName: string,
    context: string,
    analysis: string,
    recommendations: string[],
    nextSteps: string[]
  ): Promise<RoleResponse>;

  /**
   * Gets all available scenarios.
   * @returns Array of all scenarios
   */
  getAllScenarios(): Promise<Scenario[]>;

  /**
   * Gets a scenario by its ID.
   * @param id The scenario ID
   * @returns The scenario if found, null otherwise
   */
  getScenarioById(id: string): Promise<Scenario | null>;
}

/**
 * Interface for automatic role selection service operations.
 */
export interface IAutomaticRoleService {
  /**
   * Automatically selects the most appropriate role based on the context.
   * @param context The context or problem description
   * @returns The selected role, or null if no appropriate role is found
   */
  selectRoleForContext(context: string): Promise<Role | null>;

  /**
   * Automatically selects the most appropriate scenario based on the context.
   * @param context The context or problem description
   * @returns The selected scenario, or null if no appropriate scenario is found
   */
  selectScenarioForContext(context: string): Promise<Scenario | null>;

  /**
   * Automatically selects the most appropriate role for a given scenario.
   * @param scenarioId The ID of the scenario
   * @returns The selected role, or null if no appropriate role is found
   */
  selectRoleForScenario(scenarioId: string): Promise<Role | null>;
}


