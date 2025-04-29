/**
 * In-memory implementation of the HelloWorldRepository interface.
 * Stores HelloWorld messages in memory and provides methods for retrieving them.
 */
export class InMemoryHelloWorldRepository {
    messages = [];
    /**
     * Adds a HelloWorld message to the repository.
     * @param helloWorld The HelloWorld message to add.
     */
    addMessage(helloWorld) {
        this.messages.push(helloWorld);
    }
    /**
     * Gets all HelloWorld messages from the repository.
     * @returns An array of all HelloWorld messages.
     */
    getAllMessages() {
        return [...this.messages];
    }
    /**
     * Clears all HelloWorld messages from the repository.
     */
    clear() {
        this.messages = [];
    }
}
//# sourceMappingURL=helloWorldRepository.js.map