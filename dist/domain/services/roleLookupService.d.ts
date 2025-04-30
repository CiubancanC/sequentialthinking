import { Role } from "../models/role.js";
/**
 * Service for looking up roles by name, ID, or keywords.
 */
export declare class RoleLookupService {
    private readonly roles;
    private readonly roleAliases;
    /**
     * Creates a new RoleLookupService instance.
     * @param roles Map of role IDs to roles
     * @param roleAliases Map of role IDs to aliases
     */
    constructor(roles: Map<string, Role>, roleAliases: Record<string, string[]>);
    /**
     * Finds a role by name, ID, or keywords.
     * @param name The role name, ID, or keyword
     * @returns The role if found, null otherwise
     */
    findRole(name: string): Role | null;
    /**
     * Finds a role by direct ID or name match.
     * @param normalizedName The normalized name to look up
     * @returns The role if found, null otherwise
     */
    private findByDirectMatch;
    /**
     * Finds a role by alias match.
     * @param normalizedName The normalized name to look up
     * @returns The role if found, null otherwise
     */
    private findByAlias;
    /**
     * Finds a role by format normalization (hyphens vs spaces).
     * @param normalizedName The normalized name to look up
     * @returns The role if found, null otherwise
     */
    private findByFormatNormalization;
    /**
     * Finds a role by partial alias match.
     * @param normalizedName The normalized name to look up
     * @returns The role if found, null otherwise
     */
    private findByPartialMatch;
    /**
     * Finds a role by fuzzy substring matching.
     * @param normalizedName The normalized name to look up
     * @returns The role if found, null otherwise
     */
    private findByFuzzyMatch;
    /**
     * Finds a role by keyword matching.
     * @param normalizedName The normalized name to look up
     * @returns The role if found, null otherwise
     */
    private findByKeywords;
    /**
     * Gets the default role.
     * @returns The default role if available, null otherwise
     */
    private getDefaultRole;
}
