import { IRoleRepository, IRoleService } from "../interfaces/roleInterfaces.js";
import { Role } from "../models/role.js";
import { IAutomaticRoleService } from "./automaticRoleService.js";
/**
 * Represents a step in a sequential thinking workflow.
 */
export interface SequentialStep {
    /**
     * The role to use for this step.
     */
    role: Role;
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
}
/**
 * Interface for the sequential thinking service.
 */
export interface ISequentialThinkingService {
    /**
     * Creates a sequential thinking workflow based on a context.
     * @param context The initial context or problem description
     * @returns An array of sequential steps
     */
    createWorkflow(context: string): Promise<SequentialStep[]>;
    /**
     * Executes a step in a sequential thinking workflow.
     * @param step The step to execute
     * @param previousSteps The previous steps in the workflow
     * @returns The updated step with output
     */
    executeStep(step: SequentialStep, previousSteps: SequentialStep[]): Promise<SequentialStep>;
    /**
     * Generates the next step in a sequential thinking workflow.
     * @param steps The current steps in the workflow
     * @returns The next step, or null if the workflow is complete
     */
    generateNextStep(steps: SequentialStep[]): Promise<SequentialStep | null>;
}
/**
 * Implementation of the sequential thinking service.
 * This service manages sequential thinking workflows.
 */
export declare class SequentialThinkingServiceImpl implements ISequentialThinkingService {
    private readonly roleService;
    private readonly automaticRoleService;
    private readonly repository;
    /**
     * Creates a new SequentialThinkingServiceImpl instance.
     * @param roleService The role service to use
     * @param automaticRoleService The automatic role service to use
     * @param repository The role repository to use
     */
    constructor(roleService: IRoleService, automaticRoleService: IAutomaticRoleService, repository: IRoleRepository);
    /**
     * Creates a sequential thinking workflow based on a context.
     * @param context The initial context or problem description
     * @returns An array of sequential steps
     */
    createWorkflow(context: string): Promise<SequentialStep[]>;
    /**
     * Creates a workflow based on a scenario.
     * @param scenario The scenario to use
     * @param context The initial context or problem description
     * @returns An array of sequential steps
     */
    private createWorkflowFromScenario;
    /**
     * Creates a workflow based on a context.
     * @param context The initial context or problem description
     * @returns An array of sequential steps
     */
    private createWorkflowFromContext;
    /**
     * Executes a step in a sequential thinking workflow.
     * @param step The step to execute
     * @param previousSteps The previous steps in the workflow
     * @returns The updated step with output
     */
    executeStep(step: SequentialStep, previousSteps: SequentialStep[]): Promise<SequentialStep>;
    /**
     * Generates the next step in a sequential thinking workflow.
     * @param steps The current steps in the workflow
     * @returns The next step, or null if the workflow is complete
     */
    generateNextStep(steps: SequentialStep[]): Promise<SequentialStep | null>;
}
