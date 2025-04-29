import { IRoleService } from "../../domain/interfaces/roleInterfaces.js";
import { RolePromptRequestDto, RolePromptResponseDto } from "../dtos/rolePromptDto.js";

/**
 * Result of processing a role prompt.
 */
export type ProcessRolePromptResult = {
  data?: RolePromptResponseDto;
  error?: {
    error: string;
    status: 'failed';
  };
};

/**
 * Use case for processing role prompts.
 */
export class ProcessRolePromptUseCase {
  /**
   * Creates a new ProcessRolePromptUseCase instance.
   * @param roleService The role service to use
   */
  constructor(private readonly roleService: IRoleService) {}

  /**
   * Executes the use case.
   * @param input The role prompt request
   * @returns The result of processing the role prompt
   */
  async execute(input: RolePromptRequestDto): Promise<ProcessRolePromptResult> {
    try {
      // Check if the role exists
      const role = await this.roleService.getRoleByName(input.role);
      if (!role) {
        return {
          error: {
            error: `Role not found: ${input.role}`,
            status: 'failed'
          }
        };
      }

      // Generate the role prompt
      const rolePrompt = await this.roleService.generateRolePrompt(
        input.role,
        input.context
      );

      // Create a response based on the role
      const response: RolePromptResponseDto = {
        rolePrompt,
        roleName: role.name,
        status: 'success'
      };

      // Add role-specific fields based on the role name
      switch (role.name.toLowerCase()) {
        case 'architect':
          response.recommendations = [
            'Design with scalability in mind',
            'Use appropriate design patterns',
            'Consider security from the start'
          ];
          response.nextSteps = [
            'Create detailed architecture diagrams',
            'Document key design decisions',
            'Review with stakeholders'
          ];
          response.architectureComponents = [
            'API Gateway',
            'Microservices',
            'Data storage',
            'Authentication service'
          ];
          break;
        case 'senior developer':
        case 'developer':
          response.recommendations = [
            'Follow clean code principles',
            'Write comprehensive tests',
            'Document your code'
          ];
          response.nextSteps = [
            'Implement core functionality',
            'Write unit tests',
            'Perform code review'
          ];
          response.codeExamples = [
            'Example implementation code',
            'Test case examples',
            'Configuration examples'
          ];
          break;
        case 'qa engineer':
          response.testingApproach = [
            'Unit testing for all components',
            'Integration testing for service interactions',
            'End-to-end testing for critical flows',
            'Performance testing under load'
          ];
          response.riskAssessment = [
            'Potential failure points',
            'Security vulnerabilities',
            'Performance bottlenecks'
          ];
          response.nextSteps = [
            'Create test plan',
            'Implement test cases',
            'Set up CI/CD pipeline for testing'
          ];
          break;
        case 'devops engineer':
          response.recommendations = [
            'Automate deployment process',
            'Implement monitoring and alerting',
            'Use infrastructure as code'
          ];
          response.nextSteps = [
            'Set up CI/CD pipeline',
            'Configure monitoring tools',
            'Document deployment process'
          ];
          break;
        default:
          response.recommendations = [
            'Analyze the problem thoroughly',
            'Consider multiple approaches',
            'Document your solution'
          ];
          response.nextSteps = [
            'Implement the solution',
            'Test thoroughly',
            'Review and refine'
          ];
      }

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
