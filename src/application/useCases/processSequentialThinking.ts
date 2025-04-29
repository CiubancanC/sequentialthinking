import { IAutomaticRoleService, IRoleService, ISequentialThinkingService } from "../../domain/interfaces/roleInterfaces.js";
import { SequentialStep } from "../../domain/services/sequentialThinkingService.js";

/**
 * Data transfer object for sequential thinking requests.
 */
export interface SequentialThinkingRequestDto {
  /**
   * The context or problem description to address with sequential thinking.
   */
  context: string;

  /**
   * Whether to automatically start the sequential thinking process.
   */
  autoStart?: boolean;
}

/**
 * Data transfer object for sequential thinking responses.
 */
export interface SequentialThinkingResponseDto {
  /**
   * The steps in the sequential thinking workflow.
   */
  steps: {
    /**
     * The role used for this step.
     */
    roleName: string;

    /**
     * The context or problem description for this step.
     */
    context: string;

    /**
     * The output from this step, if it has been executed.
     */
    output?: string;
  }[];

  /**
   * Whether the sequential thinking process is complete.
   */
  isComplete: boolean;

  /**
   * The status of the sequential thinking process.
   */
  status: 'success' | 'failed';
}

/**
 * Error response for sequential thinking.
 */
export interface SequentialThinkingErrorDto {
  /**
   * The error message.
   */
  error: string;

  /**
   * The status of the sequential thinking process.
   */
  status: 'failed';
}

/**
 * Result of processing a sequential thinking request.
 */
export type ProcessSequentialThinkingResult = {
  data: SequentialThinkingResponseDto;
  error?: never;
} | {
  data?: never;
  error: SequentialThinkingErrorDto;
};

/**
 * Use case for processing sequential thinking requests.
 */
export class ProcessSequentialThinkingUseCase {
  /**
   * Creates a new ProcessSequentialThinkingUseCase instance.
   * @param roleService The role service to use
   * @param automaticRoleService The automatic role service to use
   * @param sequentialThinkingService The sequential thinking service to use
   */
  constructor(
    private readonly roleService: IRoleService,
    private readonly automaticRoleService: IAutomaticRoleService,
    private readonly sequentialThinkingService: ISequentialThinkingService
  ) {}

  /**
   * Executes the use case.
   * @param input The sequential thinking request
   * @returns The result of processing the sequential thinking request
   */
  async execute(input: SequentialThinkingRequestDto): Promise<ProcessSequentialThinkingResult> {
    try {
      // Create a sequential thinking workflow
      const workflow = await this.sequentialThinkingService.createWorkflow(input.context);

      // If autoStart is true or undefined, execute the first step
      if (input.autoStart !== false && workflow.length > 0) {
        workflow[0] = await this.sequentialThinkingService.executeStep(workflow[0], []);

        // If there are more steps in the workflow, execute them
        let currentSteps = [workflow[0]];
        let nextStep = await this.sequentialThinkingService.generateNextStep(currentSteps);

        while (nextStep) {
          // Execute the next step
          const executedStep = await this.sequentialThinkingService.executeStep(nextStep, currentSteps);
          
          // Add the executed step to the current steps
          currentSteps.push(executedStep);
          
          // Generate the next step
          nextStep = await this.sequentialThinkingService.generateNextStep(currentSteps);
        }

        // Update the workflow with the executed steps
        for (let i = 0; i < currentSteps.length; i++) {
          if (i < workflow.length) {
            workflow[i] = currentSteps[i];
          } else {
            workflow.push(currentSteps[i]);
          }
        }
      }

      // Create the response
      const response: SequentialThinkingResponseDto = {
        steps: workflow.map(step => ({
          roleName: step.role.name,
          context: step.context,
          output: step.output
        })),
        isComplete: workflow.every(step => !!step.output),
        status: 'success'
      };

      return { data: response };
    } catch (error) {
      return {
        error: {
          error: error instanceof Error ? error.message : String(error),
          status: 'failed'
        }
      };
    }
  }
}
