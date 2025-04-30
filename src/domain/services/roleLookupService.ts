import { Role } from "../models/role.js";
import { Logger } from "../../utils/logger.js";
import { config } from "../../config/index.js";

/**
 * Service for looking up roles by name, ID, or keywords.
 * Uses a single, prioritized lookup function for simplicity and maintainability.
 */
export class RoleLookupService {
  /**
   * Creates a new RoleLookupService instance.
   * @param roles Map of role IDs to roles
   * @param roleAliases Map of role IDs to aliases
   */
  constructor(
    private readonly roles: Map<string, Role>,
    private readonly roleAliases: Record<string, string[]>
  ) {}

  /**
   * Finds a role by name, ID, or keywords using a prioritized lookup strategy.
   * @param name The role name, ID, or keyword
   * @returns The role if found, null otherwise
   */
  findRole(name: string): Role | null {
    Logger.debug(`Finding role with name: "${name}"`);

    if (!name) {
      Logger.debug(`Name is empty or undefined`);
      return null;
    }

    const normalizedName = name.toLowerCase().trim();
    Logger.debug(`Normalized name: "${normalizedName}"`);

    // Priority 1: Direct ID or name match (exact match)
    const directMatch = this.findDirectMatch(normalizedName);
    if (directMatch) return directMatch;

    // Priority 2: Exact alias match
    const aliasMatch = this.findAliasMatch(normalizedName);
    if (aliasMatch) return aliasMatch;

    // Priority 3: Format normalization (spaces vs hyphens)
    const normalizedNameNoHyphens = normalizedName.replace(/-/g, ' ');
    for (const role of this.roles.values()) {
      const roleIdNoHyphens = role.id.toLowerCase().replace(/-/g, ' ');
      if (roleIdNoHyphens === normalizedNameNoHyphens) {
        Logger.debug(`Found role by ID without hyphens: "${role.id}"`);
        return role;
      }

      const roleNameNoHyphens = role.name.toLowerCase().replace(/-/g, ' ');
      if (roleNameNoHyphens === normalizedNameNoHyphens) {
        Logger.debug(`Found role by name without hyphens: "${role.name}"`);
        return role;
      }
    }

    // Priority 4: Substring matching (fuzzy match)
    for (const role of this.roles.values()) {
      // Check if the normalized name is a substring of the role ID or vice versa
      if (role.id.toLowerCase().includes(normalizedName) || normalizedName.includes(role.id.toLowerCase())) {
        Logger.debug(`Found role by fuzzy ID match: "${role.id}"`);
        return role;
      }

      // Check if the normalized name is a substring of the role name or vice versa
      if (role.name.toLowerCase().includes(normalizedName) || normalizedName.includes(role.name.toLowerCase())) {
        Logger.debug(`Found role by fuzzy name match: "${role.name}"`);
        return role;
      }
    }

    // Priority 5: Partial alias matching
    for (const [roleId, aliases] of Object.entries(this.roleAliases)) {
      for (const alias of aliases) {
        if (alias.includes(normalizedName) || normalizedName.includes(alias)) {
          const role = this.roles.get(roleId);
          if (role) {
            Logger.debug(`Found role by partial alias match: "${role.id}" for partial alias "${normalizedName}"`);
            return role;
          }
        }
      }
    }

    // Priority 6: Keyword matching
    for (const [roleId, keywords] of Object.entries(config.roleKeywords)) {
      if (keywords.some(keyword => normalizedName.includes(keyword))) {
        const role = this.roles.get(roleId);
        if (role) {
          Logger.debug(`Found role by keyword match: "${role.id}" for keyword in "${normalizedName}"`);
          return role;
        }
      }
    }

    // Priority 7: Default role (fallback)
    return this.getDefaultRole();
  }

  /**
   * Finds a role by direct ID or name match.
   * @param normalizedName The normalized name to look up
   * @returns The role if found, null otherwise
   */
  private findDirectMatch(normalizedName: string): Role | null {
    // Direct ID lookup
    const roleById = this.roles.get(normalizedName);
    if (roleById) {
      Logger.debug(`Found role by ID: "${roleById.id}"`);
      return roleById;
    }

    // Exact name match
    for (const role of this.roles.values()) {
      if (role.name.toLowerCase() === normalizedName) {
        Logger.debug(`Found role by name: "${role.name}"`);
        return role;
      }
    }

    return null;
  }

  /**
   * Finds a role by exact alias match.
   * @param normalizedName The normalized name to look up
   * @returns The role if found, null otherwise
   */
  private findAliasMatch(normalizedName: string): Role | null {
    for (const [roleId, aliases] of Object.entries(this.roleAliases)) {
      if (aliases.some(alias => alias === normalizedName)) {
        const role = this.roles.get(roleId);
        if (role) {
          Logger.debug(`Found role by alias match: "${role.id}" for alias "${normalizedName}"`);
          return role;
        }
      }
    }

    return null;
  }

  /**
   * Gets the default role.
   * @returns The default role if available, null otherwise
   */
  private getDefaultRole(): Role | null {
    // Try to get the configured default role (architect)
    const defaultRoleId = config.roles.defaultRole;
    const defaultRole = this.roles.get(defaultRoleId);
    if (defaultRole) {
      Logger.debug(`Using configured default role: "${defaultRole.id}"`);
      return defaultRole;
    }

    // Fallback to any available role
    if (this.roles.size > 0) {
      const firstRole = Array.from(this.roles.values())[0];
      Logger.debug(`Falling back to first available role: "${firstRole.id}"`);
      return firstRole;
    }

    Logger.debug(`No roles available for fallback`);
    return null;
  }
}
