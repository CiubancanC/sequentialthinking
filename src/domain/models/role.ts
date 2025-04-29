/**
 * Represents a professional role that an AI can adopt.
 * Each role has specific expertise, responsibilities, and approaches to problem-solving.
 */
export class Role {
  private constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _description: string,
    private readonly _responsibilities: string[],
    private readonly _expertise: string[]
  ) {}

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
    if (!id || !name || !description) {
      throw new Error("Role must have an id, name, and description");
    }

    if (!responsibilities || responsibilities.length === 0) {
      throw new Error("Role must have at least one responsibility");
    }

    if (!expertise || expertise.length === 0) {
      throw new Error("Role must have at least one area of expertise");
    }

    return new Role(id, name, description, responsibilities, expertise);
  }

  /**
   * Generates a prompt for the AI to adopt this role.
   * @param context The specific context or problem to address
   * @returns A formatted prompt string
   */
  public generatePrompt(context: string): string {
    // TODO: Explore advanced prompt engineering techniques here for better AI responses.
    return `As a senior ${this._name}, I will address the following: ${context}

My responsibilities include:
${this._responsibilities.map(r => `- ${r}`).join('\n')}

My areas of expertise include:
${this._expertise.map(e => `- ${e}`).join('\n')}

${this._description}

I will now analyze the problem and provide expert guidance:
`;
  }

  // Getters
  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get responsibilities(): string[] {
    return [...this._responsibilities];
  }

  public get expertise(): string[] {
    return [...this._expertise];
  }
}
