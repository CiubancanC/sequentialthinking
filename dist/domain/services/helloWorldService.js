import { HelloWorld } from '../models/helloWorld.js';
/**
 * Implementation of the HelloWorldService interface.
 * Handles the core business logic for processing HelloWorld messages.
 */
export class HelloWorldServiceImpl {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Processes a HelloWorld message by validating it and adding it to the repository.
     * @param messageData The raw message data to process.
     * @returns The processed HelloWorld message.
     */
    processMessage(messageData) {
        // This method assumes that validation has been performed at a higher level
        // and that messageData can be safely cast to the expected type
        const data = messageData;
        // Create a new HelloWorld domain object
        const helloWorld = HelloWorld.create(data);
        // Add the message to the repository
        this.repository.addMessage(helloWorld);
        return helloWorld;
    }
    /**
     * Gets the history of all processed HelloWorld messages.
     * @returns An array of all processed HelloWorld messages.
     */
    getMessageHistory() {
        return this.repository.getAllMessages();
    }
    /**
     * Resets the state of the service.
     */
    resetState() {
        this.repository.clear();
    }
}
//# sourceMappingURL=helloWorldService.js.map