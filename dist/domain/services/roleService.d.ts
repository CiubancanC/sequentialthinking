import { IRoleRepository, IRoleService } from "../interfaces/roleInterfaces.js";
import { Role } from "../models/role.js";
import { RoleResponse } from "../models/roleResponse.js";
import { Scenario } from "../models/scenario.js";
/**
 * Implementation of the role service.
 * Provides functionality for working with roles, scenarios, and generating role-based prompts.
 */
export declare class RoleServiceImpl implements IRoleService {
    private readonly repository;
    /**
     * Creates a new RoleServiceImpl instance.
     * @param repository The role repository to use
     */
    constructor(repository: IRoleRepository);
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
     * @throws Error if the role is not found
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
     * @throws Error if the role is not found
     */
    createRoleResponse(roleName: string, context: string, analysis: string, recommendations: string[], nextSteps: string[]): Promise<RoleResponse>;
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
