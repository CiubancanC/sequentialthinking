import { IRoleRepository } from "../interfaces/roleInterfaces.js";
import { Role } from "../models/role.js";
import { Scenario } from "../models/scenario.js";
import { config } from "../../config/index.js";
import { Logger } from "../../utils/logger.js";

/**
 * Interface for the automatic role selection service.
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

/**
 * Implementation of the automatic role selection service.
 * This service analyzes context and automatically selects appropriate roles and scenarios.
 */
export class AutomaticRoleServiceImpl implements IAutomaticRoleService {
  /**
   * Creates a new AutomaticRoleServiceImpl instance.
   * @param repository The role repository to use
   */
  constructor(private readonly repository: IRoleRepository) {}

  /**
   * Gets the default role.
   * @returns The default role if available, null otherwise
   */
  private async getDefaultRole(): Promise<Role | null> {
    const roles = await this.repository.getAllRoles();
    if (!roles || roles.length === 0) {
      return null;
    }

    // Try to get the default role from configuration
    const defaultRoleName = config.roles.defaultRole;
    const defaultRole = await this.repository.getRoleByName(defaultRoleName) ||
                        await this.repository.getRoleById(defaultRoleName) ||
                        roles[0];

    return defaultRole;
  }

  // Note: This utility method is kept for future refactoring
  // but is not currently used. It will be used to refactor the role and scenario
  // selection methods to reduce code duplication.
  /*
  private scoreItemsByKeywords<T>(
    items: T[],
    getKeywords: (item: T) => string[],
    context: string
  ): { item: T; score: number }[] {
    const contextLower = context.toLowerCase();

    // Score each item based on keyword matches
    const scores = items.map(item => {
      const keywords = getKeywords(item);

      // Count how many keywords match
      const score = keywords.reduce((count, keyword) => {
        return count + (contextLower.includes(keyword) ? 1 : 0);
      }, 0);

      return { item, score };
    });

    // Sort by score (descending)
    return scores.sort((a, b) => b.score - a.score);
  }
  */

  /**
   * Automatically selects the most appropriate role based on the context.
   * @param context The context or problem description
   * @returns The selected role, or a default role if no appropriate role is found
   */
  async selectRoleForContext(context: string): Promise<Role | null> {
    Logger.debug(`Selecting role for context: "${context.substring(0, 50)}..."`);

    // Get all available roles
    const roles = await this.repository.getAllRoles();

    // If no roles are available, return null
    if (!roles || roles.length === 0) {
      Logger.debug("No roles available");
      return null;
    }

    // Create a map of role IDs to roles for quick lookup
    const roleMap = new Map<string, Role>();
    for (const role of roles) {
      roleMap.set(role.id.toLowerCase(), role);
    }

    // Score each role based on keyword matches
    const roleScores = Object.entries(config.roleKeywords).map(([roleId, keywords]) => {
      const role = roleMap.get(roleId.toLowerCase());

      // Skip if role doesn't exist in our system
      if (!role) {
        return { role: null, score: -1 };
      }

      // Count how many keywords match
      const contextLower = context.toLowerCase();
      const score = keywords.reduce((count, keyword) => {
        return count + (contextLower.includes(keyword) ? 1 : 0);
      }, 0);

      // Add a higher score if the role name is explicitly mentioned
      let nameScore = 0;
      if (contextLower.includes(role.name.toLowerCase())) {
        nameScore = 5; // Give a significant boost for explicit mention
      }

      return { role, score: score + nameScore };
    }).filter(item => item.role !== null);

    // Sort roles by score (descending)
    roleScores.sort((a, b) => b.score - a.score);

    // Return the highest-scoring role
    if (roleScores.length > 0 && roleScores[0].score > 0) {
      Logger.debug(`Selected role: ${roleScores[0].role!.name} with score ${roleScores[0].score}`);
      return roleScores[0].role;
    }

    // If no role matched with a score > 0, return a default role
    const defaultRole = await this.getDefaultRole();
    if (defaultRole) {
      Logger.debug(`Falling back to default role: ${defaultRole.name}`);
    } else {
      Logger.debug("No default role available");
    }

    return defaultRole;
  }

  /**
   * Automatically selects the most appropriate scenario based on the context.
   * @param context The context or problem description
   * @returns The selected scenario, or null if no appropriate scenario is found
   */
  async selectScenarioForContext(context: string): Promise<Scenario | null> {
    Logger.debug(`Selecting scenario for context: "${context.substring(0, 50)}..."`);

    // Get all available scenarios
    const scenarios = await this.repository.getAllScenarios();

    // If no scenarios are available, return null
    if (!scenarios || scenarios.length === 0) {
      Logger.debug("No scenarios available");
      return null;
    }

    // Simple keyword-based matching for now
    const contextLower = context.toLowerCase();

    // Score each scenario based on title and description matches
    const scenarioScores = scenarios.map(scenario => {
      const titleLower = scenario.title.toLowerCase();
      const descriptionLower = scenario.description.toLowerCase();

      // Check if context contains words from title or description
      const titleWords = titleLower.split(/\s+/).filter(word => word.length > 3);
      const descriptionWords = descriptionLower.split(/\s+/).filter(word => word.length > 3);

      // Count matches in title (weighted higher) and description
      const titleScore = titleWords.reduce((count, word) => {
        return count + (contextLower.includes(word) ? 2 : 0);
      }, 0);

      const descriptionScore = descriptionWords.reduce((count, word) => {
        return count + (contextLower.includes(word) ? 1 : 0);
      }, 0);

      return { scenario, score: titleScore + descriptionScore };
    });

    // Sort scenarios by score (descending)
    scenarioScores.sort((a, b) => b.score - a.score);

    // Return the highest-scoring scenario, or null if no scenario scored above 0
    if (scenarioScores.length > 0 && scenarioScores[0].score > 0) {
      Logger.debug(`Selected scenario: ${scenarioScores[0].scenario.title} with score ${scenarioScores[0].score}`);
      return scenarioScores[0].scenario;
    }

    Logger.debug("No matching scenario found");
    return null;
  }

  /**
   * Automatically selects the most appropriate role for a given scenario.
   * @param scenarioId The ID of the scenario
   * @returns The selected role, or a default role if no appropriate role is found
   */
  async selectRoleForScenario(scenarioId: string): Promise<Role | null> {
    Logger.debug(`Selecting role for scenario: ${scenarioId}`);

    // Get the scenario
    const scenario = await this.repository.getScenarioById(scenarioId);

    // If the scenario doesn't exist, return a default role
    if (!scenario) {
      Logger.debug(`Scenario not found: ${scenarioId}`);
      return this.getDefaultRole();
    }

    // Get the suggested roles for the scenario
    const suggestedRoles = scenario.suggestedRoles;

    // If there are no suggested roles, return a default role
    if (!suggestedRoles || suggestedRoles.length === 0) {
      Logger.debug(`No suggested roles for scenario: ${scenarioId}`);
      return this.getDefaultRole();
    }

    // Try to get the first suggested role
    for (const roleName of suggestedRoles) {
      const role = await this.repository.getRoleByName(roleName);
      if (role) {
        Logger.debug(`Selected role: ${role.name} from scenario suggestions`);
        return role;
      }
    }

    // If none of the suggested roles were found, return a default role
    Logger.debug(`No matching role found for scenario suggestions: ${suggestedRoles.join(', ')}`);
    return this.getDefaultRole();
  }
}
