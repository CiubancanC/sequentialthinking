/**
 * Represents a HelloWorld message in the MCP.
 * This is the core domain entity for the application.
 */
export class HelloWorld {
    _message;
    _name;
    constructor(message, name) {
        // Validate required fields
        if (!message || message.trim().length === 0) {
            throw new Error("Message must not be empty");
        }
        this._message = message;
        this._name = name;
    }
    // Getters
    get message() {
        return this._message;
    }
    get name() {
        return this._name;
    }
    // Domain methods
    getGreeting() {
        return this._name ? `${this._message}, ${this._name}!` : `${this._message}, World!`;
    }
    // Factory method for creating a HelloWorld from raw data
    static create(data) {
        return new HelloWorld(data.message, data.name);
    }
    // Convert to plain object (for serialization)
    toObject() {
        const result = {
            message: this._message,
        };
        if (this._name !== undefined)
            result.name = this._name;
        return result;
    }
}
//# sourceMappingURL=helloWorld.js.map