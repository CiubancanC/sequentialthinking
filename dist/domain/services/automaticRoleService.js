/**
 * Implementation of the automatic role selection service.
 * This service analyzes context and automatically selects appropriate roles and scenarios.
 */
export class AutomaticRoleServiceImpl {
    repository;
    /**
     * Creates a new AutomaticRoleServiceImpl instance.
     * @param repository The role repository to use
     */
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Automatically selects the most appropriate role based on the context.
     * @param context The context or problem description
     * @returns The selected role, or a default role if no appropriate role is found
     */
    async selectRoleForContext(context) {
        // Get all available roles
        const roles = await this.repository.getAllRoles();
        // If no roles are available, return null
        if (!roles || roles.length === 0) {
            return null;
        }
        // Simple keyword-based matching for now
        // This could be enhanced with more sophisticated NLP techniques
        const contextLower = context.toLowerCase();
        // Define keywords for each role based on the exact roles in our system
        // These IDs match the ones defined in roleRepository.ts
        const roleKeywords = {
            'architect': ['architecture', 'design', 'system', 'structure', 'scalable', 'microservice', 'infrastructure', 'solution', 'framework', 'blueprint'],
            'senior-developer': ['code', 'implement', 'develop', 'programming', 'function', 'class', 'method', 'algorithm', 'feature', 'library', 'api'],
            'qa-engineer': ['test', 'quality', 'bug', 'issue', 'verify', 'validation', 'testing', 'qa', 'quality assurance', 'regression', 'defect'],
            'devops-engineer': ['deploy', 'pipeline', 'ci/cd', 'infrastructure', 'container', 'docker', 'kubernetes', 'automation', 'devops', 'jenkins', 'terraform'],
            'security-engineer': ['security', 'vulnerability', 'threat', 'risk', 'compliance', 'authentication', 'authorization', 'encryption', 'firewall', 'penetration'],
            'data-scientist': ['data', 'analytics', 'machine learning', 'ai', 'model', 'prediction', 'statistics', 'dataset', 'algorithm', 'neural network', 'classification'],
            'ux-designer': ['user experience', 'ui', 'ux', 'interface', 'usability', 'wireframe', 'prototype', 'user research', 'accessibility', 'design system'],
            'product-manager': ['product', 'roadmap', 'feature', 'requirement', 'user story', 'backlog', 'prioritization', 'market', 'customer', 'stakeholder']
        };
        // Create a map of role IDs to roles for quick lookup
        const roleMap = new Map();
        for (const role of roles) {
            roleMap.set(role.id.toLowerCase(), role);
        }
        // Score each role based on keyword matches
        const roleScores = Object.entries(roleKeywords).map(([roleId, keywords]) => {
            const role = roleMap.get(roleId.toLowerCase());
            // Skip if role doesn't exist in our system
            if (!role) {
                return { role: null, score: -1 };
            }
            // Count how many keywords match
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
            return roleScores[0].role;
        }
        // If no role matched with a score > 0, return a default role (Architect) or the first available role
        const defaultRole = await this.repository.getRoleByName('Architect') ||
            await this.repository.getRoleById('architect') ||
            roles[0];
        return defaultRole;
    }
    /**
     * Automatically selects the most appropriate scenario based on the context.
     * @param context The context or problem description
     * @returns The selected scenario, or null if no appropriate scenario is found
     */
    async selectScenarioForContext(context) {
        // Get all available scenarios
        const scenarios = await this.repository.getAllScenarios();
        // If no scenarios are available, return null
        if (!scenarios || scenarios.length === 0) {
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
        return scenarioScores.length > 0 && scenarioScores[0].score > 0 ? scenarioScores[0].scenario : null;
    }
    /**
     * Automatically selects the most appropriate role for a given scenario.
     * @param scenarioId The ID of the scenario
     * @returns The selected role, or a default role if no appropriate role is found
     */
    async selectRoleForScenario(scenarioId) {
        // Get the scenario
        const scenario = await this.repository.getScenarioById(scenarioId);
        // If the scenario doesn't exist, return a default role
        if (!scenario) {
            const roles = await this.repository.getAllRoles();
            if (roles && roles.length > 0) {
                // Default to architect or the first available role
                return await this.repository.getRoleByName('Architect') ||
                    await this.repository.getRoleById('architect') ||
                    roles[0];
            }
            return null;
        }
        // Get the suggested roles for the scenario
        const suggestedRoles = scenario.suggestedRoles;
        // If there are no suggested roles, return a default role
        if (!suggestedRoles || suggestedRoles.length === 0) {
            const roles = await this.repository.getAllRoles();
            if (roles && roles.length > 0) {
                // Default to architect or the first available role
                return await this.repository.getRoleByName('Architect') ||
                    await this.repository.getRoleById('architect') ||
                    roles[0];
            }
            return null;
        }
        // Try to get the first suggested role
        for (const roleName of suggestedRoles) {
            const role = await this.repository.getRoleByName(roleName);
            if (role) {
                return role;
            }
        }
        // If none of the suggested roles were found, return a default role
        const roles = await this.repository.getAllRoles();
        if (roles && roles.length > 0) {
            // Default to architect or the first available role
            return await this.repository.getRoleByName('Architect') ||
                await this.repository.getRoleById('architect') ||
                roles[0];
        }
        return null;
    }
}
//# sourceMappingURL=automaticRoleService.js.map