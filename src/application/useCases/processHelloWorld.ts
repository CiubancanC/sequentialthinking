import { HelloWorldService } from '../../domain/interfaces/helloWorldInterfaces.js';
import { HelloWorldInputDto, HelloWorldOutputDto, ErrorOutputDto } from '../dtos/helloWorldDto.js';

/**
 * Use case for processing a HelloWorld message.
 * This class orchestrates the flow of data between the infrastructure and domain layers.
 */
export class ProcessHelloWorldUseCase {
  private helloWorldService: HelloWorldService;

  constructor(helloWorldService: HelloWorldService) {
    this.helloWorldService = helloWorldService;
  }

  /**
   * Executes the use case.
   * @param input The input data for the use case.
   * @returns The output data from the use case, or an error if processing fails.
   */
  public execute(input: unknown): { data?: HelloWorldOutputDto; error?: ErrorOutputDto } {
    try {
      // Process the message using the domain service
      const helloWorld = this.helloWorldService.processMessage(input);
      
      // Get the message history from the service
      const history = this.helloWorldService.getMessageHistory();
      
      // Create the output DTO
      const output: HelloWorldOutputDto = {
        greeting: helloWorld.getGreeting(),
        messageHistoryLength: history.length,
      };
      
      return { data: output };
    } catch (error) {
      // Create an error DTO if processing fails
      const errorOutput: ErrorOutputDto = {
        error: error instanceof Error ? error.message : String(error),
        status: 'failed',
      };
      
      return { error: errorOutput };
    }
  }
}
