import { IRoleRepository } from "../../domain/interfaces/roleInterfaces.js";
import { Role } from "../../domain/models/role.js";
import { RoleResponse } from "../../domain/models/roleResponse.js";
import { Scenario } from "../../domain/models/scenario.js";
/**
 * In-memory implementation of the role repository.
 */
export declare class InMemoryRoleRepository implements IRoleRepository {
    private roles;
    private scenarios;
    private responses;
    /**
     * Creates a new InMemoryRoleRepository instance with predefined roles and scenarios.
     */
    constructor();
    /**
     * Gets a role by its ID.
     * @param id The role ID
     * @returns The role if found, null otherwise
     */
    getRoleById(id: string): Promise<Role | null>;
    private roleAliases;
    /**
     * Gets a role by its name or ID.
     * @param name The role name or ID
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
    /**
     * Initializes the repository with predefined roles.
     */
    private initializeRoles;
    /**
     * Initializes the repository with predefined scenarios.
     */
    private initializeScenarios;
}
