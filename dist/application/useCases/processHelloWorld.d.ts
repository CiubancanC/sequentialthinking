import { HelloWorldService } from '../../domain/interfaces/helloWorldInterfaces.js';
import { HelloWorldOutputDto, ErrorOutputDto } from '../dtos/helloWorldDto.js';
/**
 * Use case for processing a HelloWorld message.
 * This class orchestrates the flow of data between the infrastructure and domain layers.
 */
export declare class ProcessHelloWorldUseCase {
    private helloWorldService;
    constructor(helloWorldService: HelloWorldService);
    /**
     * Executes the use case.
     * @param input The input data for the use case.
     * @returns The output data from the use case, or an error if processing fails.
     */
    execute(input: unknown): {
        data?: HelloWorldOutputDto;
        error?: ErrorOutputDto;
    };
}
