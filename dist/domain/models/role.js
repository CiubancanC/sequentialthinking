/**
 * Represents a professional role that an AI can adopt.
 * Each role has specific expertise, responsibilities, and approaches to problem-solving.
 */
export class Role {
    _id;
    _name;
    _description;
    _responsibilities;
    _expertise;
    constructor(_id, _name, _description, _responsibilities, _expertise) {
        this._id = _id;
        this._name = _name;
        this._description = _description;
        this._responsibilities = _responsibilities;
        this._expertise = _expertise;
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
    static create(id, name, description, responsibilities, expertise) {
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
    generatePrompt(context) {
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
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get responsibilities() {
        return [...this._responsibilities];
    }
    get expertise() {
        return [...this._expertise];
    }
}
//# sourceMappingURL=role.js.map