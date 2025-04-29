/**
 * Represents a scenario or problem that can be addressed by different roles.
 * Scenarios provide context for role-based prompting.
 */
export class Scenario {
    _id;
    _title;
    _description;
    _category;
    _complexity;
    _suggestedRoles;
    constructor(_id, _title, _description, _category, _complexity, _suggestedRoles) {
        this._id = _id;
        this._title = _title;
        this._description = _description;
        this._category = _category;
        this._complexity = _complexity;
        this._suggestedRoles = _suggestedRoles;
    }
    /**
     * Creates a new Scenario instance.
     * @param id Unique identifier for the scenario
     * @param title Short title of the scenario
     * @param description Detailed description of the scenario
     * @param category Category of the scenario (e.g., "architecture", "development", "testing")
     * @param complexity Complexity level of the scenario
     * @param suggestedRoles Roles that are well-suited to address this scenario
     * @returns A new Scenario instance
     */
    static create(id, title, description, category, complexity, suggestedRoles) {
        if (!id || !title || !description || !category) {
            throw new Error("Scenario must have an id, title, description, and category");
        }
        if (!suggestedRoles || suggestedRoles.length === 0) {
            throw new Error("Scenario must have at least one suggested role");
        }
        return new Scenario(id, title, description, category, complexity, suggestedRoles);
    }
    /**
     * Formats the scenario for presentation.
     * @returns A formatted string representation of the scenario
     */
    format() {
        return `# ${this._title} (${this._complexity} complexity)

## Description
${this._description}

## Category
${this._category}

## Suggested Roles
${this._suggestedRoles.map(role => `- ${role}`).join('\n')}
`;
    }
    // Getters
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get description() {
        return this._description;
    }
    get category() {
        return this._category;
    }
    get complexity() {
        return this._complexity;
    }
    get suggestedRoles() {
        return [...this._suggestedRoles];
    }
}
//# sourceMappingURL=scenario.js.map