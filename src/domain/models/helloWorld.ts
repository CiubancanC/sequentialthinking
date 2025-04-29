/**
 * Represents a HelloWorld message in the MCP.
 * This is the core domain entity for the application.
 */
export class HelloWorld {
  private _message: string;
  private _name?: string;

  constructor(message: string, name?: string) {
    // Validate required fields
    if (!message || message.trim().length === 0) {
      throw new Error("Message must not be empty");
    }

    this._message = message;
    this._name = name;
  }

  // Getters
  get message(): string {
    return this._message;
  }

  get name(): string | undefined {
    return this._name;
  }

  // Domain methods
  public getGreeting(): string {
    return this._name ? `${this._message}, ${this._name}!` : `${this._message}, World!`;
  }

  // Factory method for creating a HelloWorld from raw data
  public static create(data: {
    message: string;
    name?: string;
  }): HelloWorld {
    return new HelloWorld(
      data.message,
      data.name
    );
  }

  // Convert to plain object (for serialization)
  public toObject(): Record<string, any> {
    const result: Record<string, any> = {
      message: this._message,
    };

    if (this._name !== undefined) result.name = this._name;

    return result;
  }
}
