import { Role } from "../models/role.js";
import { Logger } from "../../utils/logger.js";
import { config } from "../../config/index.js";

/**
 * Service for looking up roles by name, ID, or keywords.
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
   * Finds a role by name, ID, or keywords.
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

    // Try all lookup strategies in order
    return this.findByDirectMatch(normalizedName) ||
           this.findByAlias(normalizedName) ||
           this.findByFormatNormalization(normalizedName) ||
           this.findByPartialMatch(normalizedName) ||
           this.findByFuzzyMatch(normalizedName) ||
           this.findByKeywords(normalizedName) ||
           this.getDefaultRole();
  }

  /**
   * Finds a role by direct ID or name match.
   * @param normalizedName The normalized name to look up
   * @returns The role if found, null otherwise
   */
  private findByDirectMatch(normalizedName: string): Role | null {
    // 1. Direct ID lookup
    const roleById = this.roles.get(normalizedName);
    if (roleById) {
      Logger.debug(`Found role by ID: "${roleById.id}"`);
      return roleById;
    }

    // 2. Exact name match
    for (const role of this.roles.values()) {
      if (role.name.toLowerCase() === normalizedName) {
        Logger.debug(`Found role by name: "${role.name}"`);
        return role;
      }
    }

    return null;
  }

  /**
   * Finds a role by alias match.
   * @param normalizedName The normalized name to look up
   * @returns The role if found, null otherwise
   */
  private findByAlias(normalizedName: string): Role | null {
    // Check against aliases
    for (const [roleId, aliases] of Object.entries(this.roleAliases)) {
      if (aliases.includes(normalizedName)) {
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
   * Finds a role by format normalization (hyphens vs spaces).
   * @param normalizedName The normalized name to look up
   * @returns The role if found, null otherwise
   */
  private findByFormatNormalization(normalizedName: string): Role | null {
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

    return null;
  }

  /**
   * Finds a role by partial alias match.
   * @param normalizedName The normalized name to look up
   * @returns The role if found, null otherwise
   */
  private findByPartialMatch(normalizedName: string): Role | null {
    // Check if the normalized name is a partial match for any alias
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

    return null;
  }

  /**
   * Finds a role by fuzzy substring matching.
   * @param normalizedName The normalized name to look up
   * @returns The role if found, null otherwise
   */
  private findByFuzzyMatch(normalizedName: string): Role | null {
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

    return null;
  }

  /**
   * Finds a role by keyword matching.
   * @param normalizedName The normalized name to look up
   * @returns The role if found, null otherwise
   */
  private findByKeywords(normalizedName: string): Role | null {
    // Check for developer keywords
    const developerKeywords = config.roleKeywords['senior-developer'];
    if (developerKeywords.some(keyword => normalizedName.includes(keyword))) {
      const seniorDeveloper = this.roles.get('senior-developer');
      if (seniorDeveloper) {
        Logger.debug(`Falling back to senior-developer role based on keywords`);
        return seniorDeveloper;
      }
    }

    // Check for architect keywords
    const architectKeywords = config.roleKeywords['architect'];
    if (architectKeywords.some(keyword => normalizedName.includes(keyword))) {
      const architect = this.roles.get('architect');
      if (architect) {
        Logger.debug(`Falling back to architect role based on keywords`);
        return architect;
      }
    }

    // Check for QA keywords
    const qaKeywords = config.roleKeywords['qa-engineer'];
    if (qaKeywords.some(keyword => normalizedName.includes(keyword))) {
      const qaEngineer = this.roles.get('qa-engineer');
      if (qaEngineer) {
        Logger.debug(`Falling back to qa-engineer role based on keywords`);
        return qaEngineer;
      }
    }

    // Check for DevOps keywords
    const devopsKeywords = config.roleKeywords['devops-engineer'];
    if (devopsKeywords.some(keyword => normalizedName.includes(keyword))) {
      const devopsEngineer = this.roles.get('devops-engineer');
      if (devopsEngineer) {
        Logger.debug(`Falling back to devops-engineer role based on keywords`);
        return devopsEngineer;
      }
    }

    return null;
  }

  /**
   * Gets the default role.
   * @returns The default role if available, null otherwise
   */
  private getDefaultRole(): Role | null {
    // Last resort: return the first available role (preferably architect)
    const architect = this.roles.get('architect');
    if (architect) {
      Logger.debug(`Falling back to architect role as last resort`);
      return architect;
    }

    if (this.roles.size > 0) {
      const firstRole = Array.from(this.roles.values())[0];
      Logger.debug(`Falling back to first available role: "${firstRole.id}"`);
      return firstRole;
    }

    return null;
  }
}
