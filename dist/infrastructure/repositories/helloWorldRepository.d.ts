import { HelloWorld } from '../../domain/models/helloWorld.js';
import { HelloWorldRepository } from '../../domain/interfaces/helloWorldInterfaces.js';
/**
 * In-memory implementation of the HelloWorldRepository interface.
 * Stores HelloWorld messages in memory and provides methods for retrieving them.
 */
export declare class InMemoryHelloWorldRepository implements HelloWorldRepository {
    private messages;
    /**
     * Adds a HelloWorld message to the repository.
     * @param helloWorld The HelloWorld message to add.
     */
    addMessage(helloWorld: HelloWorld): void;
    /**
     * Gets all HelloWorld messages from the repository.
     * @returns An array of all HelloWorld messages.
     */
    getAllMessages(): HelloWorld[];
    /**
     * Clears all HelloWorld messages from the repository.
     */
    clear(): void;
}
