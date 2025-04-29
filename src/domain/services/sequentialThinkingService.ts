import { IRoleRepository, IRoleService } from "../interfaces/roleInterfaces.js";
import { Role } from "../models/role.js";
import { Scenario } from "../models/scenario.js";
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
export class SequentialThinkingServiceImpl implements ISequentialThinkingService {
  /**
   * Creates a new SequentialThinkingServiceImpl instance.
   * @param roleService The role service to use
   * @param automaticRoleService The automatic role service to use
   * @param repository The role repository to use
   */
  constructor(
    private readonly roleService: IRoleService,
    private readonly automaticRoleService: IAutomaticRoleService,
    private readonly repository: IRoleRepository
  ) {}

  /**
   * Creates a sequential thinking workflow based on a context.
   * @param context The initial context or problem description
   * @returns An array of sequential steps
   */
  async createWorkflow(context: string): Promise<SequentialStep[]> {
    // First, try to select a scenario based on the context
    const scenario = await this.automaticRoleService.selectScenarioForContext(context);

    if (scenario) {
      // If a scenario was found, create a workflow based on the scenario
      return this.createWorkflowFromScenario(scenario, context);
    } else {
      // If no scenario was found, create a workflow based on the context
      return this.createWorkflowFromContext(context);
    }
  }

  /**
   * Creates a workflow based on a scenario.
   * @param scenario The scenario to use
   * @param context The initial context or problem description
   * @returns An array of sequential steps
   */
  private async createWorkflowFromScenario(scenario: Scenario, context: string): Promise<SequentialStep[]> {
    const steps: SequentialStep[] = [];

    // Get the suggested roles for the scenario
    const suggestedRoles = scenario.suggestedRoles;

    // Create a step for each suggested role
    for (const roleName of suggestedRoles) {
      const role = await this.repository.getRoleByName(roleName);

      if (role) {
        // Add the role to the workflow
        steps.push({
          role,
          context: `${scenario.description}\n\nAdditional context: ${context}`
        });
      }
    }

    // If no steps were created, create a default step with the architect role
    if (steps.length === 0) {
      // Get all available roles
      const roles = await this.repository.getAllRoles();

      if (roles && roles.length > 0) {
        // Try to get the architect role, or use the first available role
        const defaultRole = await this.repository.getRoleByName('Architect') ||
                           await this.repository.getRoleById('architect') ||
                           roles[0];

        steps.push({
          role: defaultRole,
          context: `${scenario.description}\n\nAdditional context: ${context}`
        });
      } else {
        // This should only happen if there are no roles at all in the system
        throw new Error('No roles available for sequential thinking');
      }
    }

    return steps;
  }

  /**
   * Creates a workflow based on a context.
   * @param context The initial context or problem description
   * @returns An array of sequential steps
   */
  private async createWorkflowFromContext(context: string): Promise<SequentialStep[]> {
    // Try to select a role based on the context
    // The automaticRoleService will always return a role if any are available
    const role = await this.automaticRoleService.selectRoleForContext(context);

    if (!role) {
      // This should only happen if there are no roles at all in the system
      throw new Error('No roles available for sequential thinking');
    }

    // Create a workflow with the selected role
    return [{
      role,
      context
    }];
  }

  /**
   * Executes a step in a sequential thinking workflow.
   * @param step The step to execute
   * @param previousSteps The previous steps in the workflow
   * @returns The updated step with output
   */
  async executeStep(step: SequentialStep, previousSteps: SequentialStep[]): Promise<SequentialStep> {
    // Build the context for this step, including outputs from previous steps
    let enhancedContext = step.context;

    if (previousSteps.length > 0) {
      enhancedContext += '\n\nPrevious steps:\n';

      for (let i = 0; i < previousSteps.length; i++) {
        const prevStep = previousSteps[i];
        enhancedContext += `\nStep ${i + 1} (${prevStep.role.name}):\n${prevStep.output}\n`;
      }
    }

    // Generate the role prompt
    const rolePrompt = await this.roleService.generateRolePrompt(
      step.role.name,
      enhancedContext
    );

    // In a real implementation, this would call an LLM to generate the output
    // For now, we'll just return a placeholder
    const output = `This is a placeholder output for the ${step.role.name} role.
Based on the context: ${enhancedContext.substring(0, 50)}...
The role would analyze this and provide expert guidance.`;

    // Return the updated step with output
    return {
      ...step,
      output
    };
  }

  /**
   * Generates the next step in a sequential thinking workflow.
   * @param steps The current steps in the workflow
   * @returns The next step, or null if the workflow is complete
   */
  async generateNextStep(steps: SequentialStep[]): Promise<SequentialStep | null> {
    if (steps.length === 0) {
      return null;
    }

    // Get the last step
    const lastStep = steps[steps.length - 1];

    // If the last step doesn't have output, it hasn't been executed yet
    if (!lastStep.output) {
      return null;
    }

    // In a real implementation, this would analyze the output of the last step
    // and determine if another step is needed and what role should be used
    // For now, we'll use a simple rule-based approach

    // Get all available roles
    const roles = await this.repository.getAllRoles();

    // If there are no roles, the workflow is complete
    if (!roles || roles.length === 0) {
      return null;
    }

    // Find roles that haven't been used yet
    const usedRoleNames = steps.map(step => step.role.name.toLowerCase());
    const unusedRoles = roles.filter(role => !usedRoleNames.includes(role.name.toLowerCase()));

    // If there are no unused roles, or we've already used 3 roles, the workflow is complete
    if (unusedRoles.length === 0 || steps.length >= 3) {
      return null;
    }

    // Select the next role based on the current role
    let nextRole: Role | null = null;

    // Create a map of role IDs to roles for quick lookup
    const roleMap = new Map<string, Role>();
    for (const role of roles) {
      roleMap.set(role.id.toLowerCase(), role);
    }

    // Define the role sequence based on the exact roles in our system
    const roleSequence: Record<string, string> = {
      'architect': 'senior-developer',
      'senior-developer': 'qa-engineer',
      'qa-engineer': 'devops-engineer',
      'devops-engineer': 'architect'
    };

    // Get the current role ID
    const currentRoleId = lastStep.role.id.toLowerCase();

    // Get the next role ID from the sequence
    const nextRoleId = roleSequence[currentRoleId];

    if (nextRoleId) {
      // Try to get the next role from the map
      nextRole = roleMap.get(nextRoleId) || null;
    }

    // If we couldn't find the next role in the sequence, use the first unused role
    if (!nextRole && unusedRoles.length > 0) {
      nextRole = unusedRoles[0];
    }

    // If we still don't have a role, use the first available role
    if (!nextRole && roles.length > 0) {
      nextRole = roles[0];
    }

    // If we couldn't find any role, the workflow is complete
    if (!nextRole) {
      return null;
    }

    // Create the next step
    return {
      role: nextRole,
      context: `Continue the analysis from the previous step: ${lastStep.output?.substring(0, 100)}...`
    };
  }
}
