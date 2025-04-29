import { ThoughtService } from '../../domain/interfaces/index.js';
import { ThoughtInputDto, ThoughtOutputDto, ErrorOutputDto } from '../dtos/thoughtDto.js';

/**
 * Use case for processing a thought.
 * This class orchestrates the flow of data between the infrastructure and domain layers.
 */
export class ProcessThoughtUseCase {
  private thoughtService: ThoughtService;

  constructor(thoughtService: ThoughtService) {
    this.thoughtService = thoughtService;
  }

  /**
   * Executes the use case.
   * @param input The input data for the use case.
   * @returns The output data from the use case, or an error if processing fails.
   */
  public execute(input: unknown): { data?: ThoughtOutputDto; error?: ErrorOutputDto } {
    try {
      // Process the thought using the domain service
      const thought = this.thoughtService.processThought(input);
      
      // Get the branches and history from the service
      const branches = this.thoughtService.getBranches();
      const history = this.thoughtService.getThoughtHistory();
      
      // Create the output DTO
      const output: ThoughtOutputDto = {
        thoughtNumber: thought.thoughtNumber,
        totalThoughts: thought.totalThoughts,
        nextThoughtNeeded: thought.nextThoughtNeeded,
        branches: Object.keys(branches),
        thoughtHistoryLength: history.length,
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
