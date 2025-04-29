/**
 * Represents a scenario or problem that can be addressed by different roles.
 * Scenarios provide context for role-based prompting.
 */
export declare class Scenario {
    private readonly _id;
    private readonly _title;
    private readonly _description;
    private readonly _category;
    private readonly _complexity;
    private readonly _suggestedRoles;
    private constructor();
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
    static create(id: string, title: string, description: string, category: string, complexity: 'low' | 'medium' | 'high', suggestedRoles: string[]): Scenario;
    /**
     * Formats the scenario for presentation.
     * @returns A formatted string representation of the scenario
     */
    format(): string;
    get id(): string;
    get title(): string;
    get description(): string;
    get category(): string;
    get complexity(): 'low' | 'medium' | 'high';
    get suggestedRoles(): string[];
}
