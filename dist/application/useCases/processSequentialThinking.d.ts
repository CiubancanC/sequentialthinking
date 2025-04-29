import { IAutomaticRoleService, IRoleService, ISequentialThinkingService } from "../../domain/interfaces/roleInterfaces.js";
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
        /**
         * Optional suggestion for an external tool to use after this step.
         */
        suggestedTool?: {
            name: string;
            args: any;
        };
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
export declare class ProcessSequentialThinkingUseCase {
    private readonly roleService;
    private readonly automaticRoleService;
    private readonly sequentialThinkingService;
    /**
     * Creates a new ProcessSequentialThinkingUseCase instance.
     * @param roleService The role service to use
     * @param automaticRoleService The automatic role service to use
     * @param sequentialThinkingService The sequential thinking service to use
     */
    constructor(roleService: IRoleService, automaticRoleService: IAutomaticRoleService, sequentialThinkingService: ISequentialThinkingService);
    /**
     * Executes the use case.
     * @param input The sequential thinking request
     * @returns The result of processing the sequential thinking request
     */
    execute(input: SequentialThinkingRequestDto): Promise<ProcessSequentialThinkingResult>;
}
