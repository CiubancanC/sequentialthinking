/**
 * Use case for processing sequential thinking requests.
 */
export class ProcessSequentialThinkingUseCase {
    roleService;
    automaticRoleService;
    sequentialThinkingService;
    /**
     * Creates a new ProcessSequentialThinkingUseCase instance.
     * @param roleService The role service to use
     * @param automaticRoleService The automatic role service to use
     * @param sequentialThinkingService The sequential thinking service to use
     */
    constructor(roleService, automaticRoleService, sequentialThinkingService) {
        this.roleService = roleService;
        this.automaticRoleService = automaticRoleService;
        this.sequentialThinkingService = sequentialThinkingService;
    }
    /**
     * Executes the use case.
     * @param input The sequential thinking request
     * @returns The result of processing the sequential thinking request
     */
    async execute(input) {
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
                    }
                    else {
                        workflow.push(currentSteps[i]);
                    }
                }
            }
            // Create the response
            const response = {
                steps: workflow.map(step => ({
                    roleName: step.role.name,
                    context: step.context,
                    output: step.output
                })),
                isComplete: workflow.every(step => !!step.output),
                status: 'success'
            };
            return { data: response };
        }
        catch (error) {
            return {
                error: {
                    error: error instanceof Error ? error.message : String(error),
                    status: 'failed'
                }
            };
        }
    }
}
//# sourceMappingURL=processSequentialThinking.js.map