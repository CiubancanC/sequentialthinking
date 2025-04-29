/**
 * Use case for processing a thought.
 * This class orchestrates the flow of data between the infrastructure and domain layers.
 */
export class ProcessThoughtUseCase {
    thoughtService;
    constructor(thoughtService) {
        this.thoughtService = thoughtService;
    }
    /**
     * Executes the use case.
     * @param input The input data for the use case.
     * @returns The output data from the use case, or an error if processing fails.
     */
    execute(input) {
        try {
            // Process the thought using the domain service
            const thought = this.thoughtService.processThought(input);
            // Get the branches and history from the service
            const branches = this.thoughtService.getBranches();
            const history = this.thoughtService.getThoughtHistory();
            // Create the output DTO
            const output = {
                thoughtNumber: thought.thoughtNumber,
                totalThoughts: thought.totalThoughts,
                nextThoughtNeeded: thought.nextThoughtNeeded,
                branches: Object.keys(branches),
                thoughtHistoryLength: history.length,
            };
            return { data: output };
        }
        catch (error) {
            // Create an error DTO if processing fails
            const errorOutput = {
                error: error instanceof Error ? error.message : String(error),
                status: 'failed',
            };
            return { error: errorOutput };
        }
    }
}
//# sourceMappingURL=processThought.js.map