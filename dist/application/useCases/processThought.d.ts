import { ThoughtService } from '../../domain/interfaces/index.js';
import { ThoughtOutputDto, ErrorOutputDto } from '../dtos/thoughtDto.js';
/**
 * Use case for processing a thought.
 * This class orchestrates the flow of data between the infrastructure and domain layers.
 */
export declare class ProcessThoughtUseCase {
    private thoughtService;
    constructor(thoughtService: ThoughtService);
    /**
     * Executes the use case.
     * @param input The input data for the use case.
     * @returns The output data from the use case, or an error if processing fails.
     */
    execute(input: unknown): {
        data?: ThoughtOutputDto;
        error?: ErrorOutputDto;
    };
}
