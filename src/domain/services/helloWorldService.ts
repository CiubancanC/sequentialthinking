import { HelloWorld } from '../models/helloWorld.js';
import { HelloWorldRepository, HelloWorldService } from '../interfaces/helloWorldInterfaces.js';

/**
 * Implementation of the HelloWorldService interface.
 * Handles the core business logic for processing HelloWorld messages.
 */
export class HelloWorldServiceImpl implements HelloWorldService {
  private repository: HelloWorldRepository;

  constructor(repository: HelloWorldRepository) {
    this.repository = repository;
  }

  /**
   * Processes a HelloWorld message by validating it and adding it to the repository.
   * @param messageData The raw message data to process.
   * @returns The processed HelloWorld message.
   */
  public processMessage(messageData: unknown): HelloWorld {
    // This method assumes that validation has been performed at a higher level
    // and that messageData can be safely cast to the expected type
    const data = messageData as {
      message: string;
      name?: string;
    };

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
  public getMessageHistory(): HelloWorld[] {
    return this.repository.getAllMessages();
  }

  /**
   * Resets the state of the service.
   */
  public resetState(): void {
    this.repository.clear();
  }
}
