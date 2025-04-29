/**
 * Represents a HelloWorld message in the MCP.
 * This is the core domain entity for the application.
 */
export declare class HelloWorld {
    private _message;
    private _name?;
    constructor(message: string, name?: string);
    get message(): string;
    get name(): string | undefined;
    getGreeting(): string;
    static create(data: {
        message: string;
        name?: string;
    }): HelloWorld;
    toObject(): Record<string, any>;
}
