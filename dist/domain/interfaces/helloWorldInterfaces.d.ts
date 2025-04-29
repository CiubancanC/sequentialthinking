import { HelloWorld } from '../models/helloWorld.js';
/**
 * Repository interface for storing and retrieving HelloWorld messages.
 */
export interface HelloWorldRepository {
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
/**
 * Service interface for HelloWorld message processing.
 */
export interface HelloWorldService {
    /**
     * Processes a HelloWorld message and returns the result.
     * @param messageData The message data to process.
     * @returns The processed HelloWorld message.
     */
    processMessage(messageData: unknown): HelloWorld;
    /**
     * Gets the history of all processed HelloWorld messages.
     * @returns An array of all processed HelloWorld messages.
     */
    getMessageHistory(): HelloWorld[];
    /**
     * Resets the state of the service.
     */
    resetState(): void;
}
