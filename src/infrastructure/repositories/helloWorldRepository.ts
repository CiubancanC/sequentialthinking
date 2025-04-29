import { HelloWorld } from '../../domain/models/helloWorld.js';
import { HelloWorldRepository } from '../../domain/interfaces/helloWorldInterfaces.js';

/**
 * In-memory implementation of the HelloWorldRepository interface.
 * Stores HelloWorld messages in memory and provides methods for retrieving them.
 */
export class InMemoryHelloWorldRepository implements HelloWorldRepository {
  private messages: HelloWorld[] = [];

  /**
   * Adds a HelloWorld message to the repository.
   * @param helloWorld The HelloWorld message to add.
   */
  public addMessage(helloWorld: HelloWorld): void {
    this.messages.push(helloWorld);
  }

  /**
   * Gets all HelloWorld messages from the repository.
   * @returns An array of all HelloWorld messages.
   */
  public getAllMessages(): HelloWorld[] {
    return [...this.messages];
  }

  /**
   * Clears all HelloWorld messages from the repository.
   */
  public clear(): void {
    this.messages = [];
  }
}
