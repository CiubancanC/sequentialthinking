import { HelloWorld } from '../models/helloWorld.js';
import { HelloWorldRepository, HelloWorldService } from '../interfaces/helloWorldInterfaces.js';
/**
 * Implementation of the HelloWorldService interface.
 * Handles the core business logic for processing HelloWorld messages.
 */
export declare class HelloWorldServiceImpl implements HelloWorldService {
    private repository;
    constructor(repository: HelloWorldRepository);
    /**
     * Processes a HelloWorld message by validating it and adding it to the repository.
     * @param messageData The raw message data to process.
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
