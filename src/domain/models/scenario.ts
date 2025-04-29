/**
 * Represents a scenario or problem that can be addressed by different roles.
 * Scenarios provide context for role-based prompting.
 */
export class Scenario {
  private constructor(
    private readonly _id: string,
    private readonly _title: string,
    private readonly _description: string,
    private readonly _category: string,
    private readonly _complexity: 'low' | 'medium' | 'high',
    private readonly _suggestedRoles: string[]
  ) {}

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
  public static create(
    id: string,
    title: string,
    description: string,
    category: string,
    complexity: 'low' | 'medium' | 'high',
    suggestedRoles: string[]
  ): Scenario {
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
  public format(): string {
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
  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get category(): string {
    return this._category;
  }

  public get complexity(): 'low' | 'medium' | 'high' {
    return this._complexity;
  }

  public get suggestedRoles(): string[] {
    return [...this._suggestedRoles];
  }
}
