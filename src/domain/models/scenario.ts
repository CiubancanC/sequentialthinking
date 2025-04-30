import { IScenario } from "../interfaces/domainTypes.js";
import { combineValidationErrors, throwIfInvalid, validateNonEmptyArray, validateRequired } from "../utils/validation.js";

/**
 * Represents a scenario or problem that can be addressed by different roles.
 * Scenarios provide context for role-based prompting.
 */
export class Scenario implements IScenario {
  /**
   * Creates a new Scenario instance.
   * @param id Unique identifier for the scenario
   * @param title Short title of the scenario
   * @param description Detailed description of the scenario
   * @param category Category of the scenario (e.g., "architecture", "development", "testing")
   * @param complexity Complexity level of the scenario
   * @param suggestedRoles Roles that are well-suited to address this scenario
   * @throws Error if any required fields are missing or invalid
   */
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly category: string,
    public readonly complexity: 'low' | 'medium' | 'high',
    public readonly suggestedRoles: readonly string[]
  ) {
    const validationResult = combineValidationErrors([
      validateRequired(id, 'id'),
      validateRequired(title, 'title'),
      validateRequired(description, 'description'),
      validateRequired(category, 'category'),
      validateNonEmptyArray(suggestedRoles as string[], 'suggestedRoles')
    ]);

    throwIfInvalid(validationResult);
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
  public static create(
    id: string,
    title: string,
    description: string,
    category: string,
    complexity: 'low' | 'medium' | 'high',
    suggestedRoles: string[]
  ): Scenario {
    return new Scenario(id, title, description, category, complexity, suggestedRoles);
  }

  /**
   * Formats the scenario for presentation.
   * @returns A formatted string representation of the scenario
   */
  public format(): string {
    return `# ${this.title} (${this.complexity} complexity)

## Description
${this.description}

## Category
${this.category}

## Suggested Roles
${this.suggestedRoles.map((role: string) => `- ${role}`).join('\n')}
`;
  }

  /**
   * Checks if a role is suggested for this scenario.
   * @param roleName The name of the role to check
   * @returns True if the role is suggested for this scenario, false otherwise
   */
  public isSuggestedRole(roleName: string): boolean {
    const normalizedRoleName = roleName.toLowerCase().trim();
    return this.suggestedRoles.some(role =>
      role.toLowerCase().trim() === normalizedRoleName
    );
  }
}
