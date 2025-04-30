import { IRole } from "../interfaces/domainTypes.js";
import { combineValidationErrors, throwIfInvalid, validateNonEmptyArray, validateRequired } from "../utils/validation.js";

/**
 * Represents a professional role that an AI can adopt.
 * Each role has specific expertise, responsibilities, and approaches to problem-solving.
 */
export class Role implements IRole {
  /**
   * Creates a new Role instance.
   * @param id Unique identifier for the role
   * @param name Display name of the role
   * @param description Detailed description of the role
   * @param responsibilities Key responsibilities of the role
   * @param expertise Areas of expertise for the role
   * @throws Error if any required fields are missing or invalid
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly responsibilities: readonly string[],
    public readonly expertise: readonly string[]
  ) {
    const validationResult = combineValidationErrors([
      validateRequired(id, 'id'),
      validateRequired(name, 'name'),
      validateRequired(description, 'description'),
      validateNonEmptyArray(responsibilities as string[], 'responsibilities'),
      validateNonEmptyArray(expertise as string[], 'expertise')
    ]);

    throwIfInvalid(validationResult);
  }

  /**
   * Creates a new Role instance.
   * @param id Unique identifier for the role
   * @param name Display name of the role
   * @param description Detailed description of the role
   * @param responsibilities Key responsibilities of the role
   * @param expertise Areas of expertise for the role
   * @returns A new Role instance
   */
  public static create(
    id: string,
    name: string,
    description: string,
    responsibilities: string[],
    expertise: string[]
  ): Role {
    return new Role(id, name, description, responsibilities, expertise);
  }

  /**
   * Generates a prompt for the AI to adopt this role.
   * @param context The specific context or problem to address
   * @returns A formatted prompt string
   */
  public generatePrompt(context: string): string {
    return `As a senior ${this.name}, I will address the following: ${context}

My responsibilities include:
${this.responsibilities.map((r: string) => `- ${r}`).join('\n')}

My areas of expertise include:
${this.expertise.map((e: string) => `- ${e}`).join('\n')}

${this.description}

I will provide a comprehensive response with the following structure:
1. A detailed analysis of the problem
2. Specific, actionable recommendations
3. Clear next steps to implement the solution
4. ${this.getCodeExamplesPrompt()}

I will now analyze the problem and provide expert guidance:
`;
  }

  /**
   * Gets the code examples prompt based on the role.
   * @returns A string with the code examples prompt
   */
  private getCodeExamplesPrompt(): string {
    // Customize the code examples prompt based on the role
    switch (this.id.toLowerCase()) {
      case 'senior-developer':
        return 'Concrete code examples with detailed implementations (not just pseudocode)';
      case 'architect':
        return 'Architecture diagrams and component descriptions';
      case 'qa-engineer':
        return 'Test cases and testing strategies';
      case 'devops-engineer':
        return 'Infrastructure as code examples and CI/CD pipeline configurations';
      case 'security-engineer':
        return 'Security control implementations and best practices';
      default:
        return 'Relevant examples to illustrate the solution';
    }
  }
}
