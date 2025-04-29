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
        case 'security engineer':
          response.recommendations = [
            'Implement defense in depth',
            'Follow the principle of least privilege',
            'Conduct regular security assessments'
          ];
          response.nextSteps = [
            'Perform threat modeling',
            'Implement security controls',
            'Conduct penetration testing'
          ];
          response.securityControls = [
            'Authentication and authorization',
            'Data encryption',
            'Input validation',
            'Secure coding practices',
            'Security monitoring'
          ];
          break;
        case 'data scientist':
          response.recommendations = [
            'Clean and preprocess data thoroughly',
            'Use appropriate algorithms for the problem',
            'Validate models with multiple metrics'
          ];
          response.nextSteps = [
            'Collect and prepare data',
            'Develop and train models',
            'Evaluate and refine results'
          ];
          response.analyticalApproach = [
            'Exploratory data analysis',
            'Feature engineering',
            'Model selection and training',
            'Hyperparameter tuning',
            'Model evaluation'
          ];
          break;
        case 'ux designer':
          response.recommendations = [
            'Focus on user needs and goals',
            'Create intuitive and accessible interfaces',
            'Test designs with real users'
          ];
          response.nextSteps = [
            'Conduct user research',
            'Create wireframes and prototypes',
            'Perform usability testing'
          ];
          response.designPrinciples = [
            'User-centered design',
            'Visual hierarchy',
            'Consistency and standards',
            'Accessibility',
            'Feedback and affordances'
          ];
          break;
        case 'product manager':
          response.recommendations = [
            'Align features with user needs and business goals',
            'Prioritize based on value and effort',
            'Communicate clearly with stakeholders'
          ];
          response.nextSteps = [
            'Define product vision and strategy',
            'Create and prioritize backlog',
            'Coordinate with development team'
          ];
          response.productStrategy = [
            'Market analysis',
            'User personas and journeys',
            'Feature prioritization',
            'Roadmap planning',
            'Success metrics'
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
