import { Role } from "../../domain/models/role.js";
import { Scenario } from "../../domain/models/scenario.js";
import { RoleLookupService } from "../../domain/services/roleLookupService.js";
import { Logger } from "../../utils/logger.js";
import { roleData, scenarioData, roleAliases } from "../../config/roleData.js";
/**
 * In-memory implementation of the role repository.
 */
export class InMemoryRoleRepository {
    roles = new Map();
    scenarios = new Map();
    responses = [];
    roleLookupService;
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
    async getRoleById(id) {
        return this.roles.get(id) || null;
    }
    /**
     * Gets a role by its name or ID.
     * @param name The role name or ID
     * @returns The role if found, null otherwise
     */
    async getRoleByName(name) {
        Logger.debug(`getRoleByName called with name: "${name}"`);
        return this.roleLookupService.findRole(name);
    }
    /**
     * Gets all available roles.
     * @returns Array of all roles
     */
    async getAllRoles() {
        return Array.from(this.roles.values());
    }
    /**
     * Saves a role response.
     * @param response The role response to save
     * @returns The saved role response
     */
    async saveRoleResponse(response) {
        this.responses.push(response);
        return response;
    }
    /**
     * Gets all scenarios.
     * @returns Array of all scenarios
     */
    async getAllScenarios() {
        return Array.from(this.scenarios.values());
    }
    /**
     * Gets a scenario by its ID.
     * @param id The scenario ID
     * @returns The scenario if found, null otherwise
     */
    async getScenarioById(id) {
        return this.scenarios.get(id) || null;
    }
    /**
     * Initializes the repository with predefined roles.
     */
    initializeRoles() {
        // Create roles from configuration
        for (const roleConfig of roleData) {
            const role = Role.create(roleConfig.id, roleConfig.name, roleConfig.description, roleConfig.responsibilities, roleConfig.expertise);
            this.roles.set(role.id, role);
            Logger.debug(`Initialized role: ${role.id} (${role.name})`);
        }
    }
    /**
     * Initializes the repository with predefined scenarios.
     */
    initializeScenarios() {
        // Create scenarios from configuration
        for (const scenarioConfig of scenarioData) {
            const scenario = Scenario.create(scenarioConfig.id, scenarioConfig.title, scenarioConfig.description, scenarioConfig.category, scenarioConfig.complexity, scenarioConfig.suggestedRoles);
            this.scenarios.set(scenario.id, scenario);
            Logger.debug(`Initialized scenario: ${scenario.id} (${scenario.title})`);
        }
    }
}
//# sourceMappingURL=roleRepository.js.map