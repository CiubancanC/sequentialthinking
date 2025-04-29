import { RoleResponse } from "../models/roleResponse.js";
/**
 * Implementation of the role service.
 * Provides functionality for working with roles, scenarios, and generating role-based prompts.
 */
export class RoleServiceImpl {
    repository;
    /**
     * Creates a new RoleServiceImpl instance.
     * @param repository The role repository to use
     */
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Gets a role by its name.
     * @param name The role name
     * @returns The role if found, null otherwise
     */
    async getRoleByName(name) {
        return this.repository.getRoleByName(name);
    }
    /**
     * Generates a prompt for a specific role and context.
     * @param roleName The name of the role
     * @param context The context or problem to address
     * @returns The generated prompt
     * @throws Error if the role is not found
     */
    async generateRolePrompt(roleName, context) {
        const role = await this.repository.getRoleByName(roleName);
        if (!role) {
            throw new Error(`Role not found: ${roleName}`);
        }
        return role.generatePrompt(context);
    }
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
    async createRoleResponse(roleName, context, analysis, recommendations, nextSteps) {
        const role = await this.repository.getRoleByName(roleName);
        if (!role) {
            throw new Error(`Role not found: ${roleName}`);
        }
        const response = RoleResponse.create(role.id, role.name, context, analysis, recommendations, nextSteps);
        return this.repository.saveRoleResponse(response);
    }
    /**
     * Gets all available scenarios.
     * @returns Array of all scenarios
     */
    async getAllScenarios() {
        return this.repository.getAllScenarios();
    }
    /**
     * Gets a scenario by its ID.
     * @param id The scenario ID
     * @returns The scenario if found, null otherwise
     */
    async getScenarioById(id) {
        return this.repository.getScenarioById(id);
    }
}
//# sourceMappingURL=roleService.js.map