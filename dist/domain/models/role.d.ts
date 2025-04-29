/**
 * Represents a professional role that an AI can adopt.
 * Each role has specific expertise, responsibilities, and approaches to problem-solving.
 */
export declare class Role {
    private readonly _id;
    private readonly _name;
    private readonly _description;
    private readonly _responsibilities;
    private readonly _expertise;
    private constructor();
    /**
     * Creates a new Role instance.
     * @param id Unique identifier for the role
     * @param name Display name of the role
     * @param description Detailed description of the role
     * @param responsibilities Key responsibilities of the role
     * @param expertise Areas of expertise for the role
     * @returns A new Role instance
     */
    static create(id: string, name: string, description: string, responsibilities: string[], expertise: string[]): Role;
    /**
     * Generates a prompt for the AI to adopt this role.
     * @param context The specific context or problem to address
     * @returns A formatted prompt string
     */
    generatePrompt(context: string): string;
    get id(): string;
    get name(): string;
    get description(): string;
    get responsibilities(): string[];
    get expertise(): string[];
}
