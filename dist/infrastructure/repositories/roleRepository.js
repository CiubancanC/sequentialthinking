import { Role } from "../../domain/models/role.js";
import { Scenario } from "../../domain/models/scenario.js";
/**
 * In-memory implementation of the role repository.
 */
export class InMemoryRoleRepository {
    roles = new Map();
    scenarios = new Map();
    responses = [];
    /**
     * Creates a new InMemoryRoleRepository instance with predefined roles and scenarios.
     */
    constructor() {
        // Initialize with predefined roles
        this.initializeRoles();
        this.initializeScenarios();
    }
    /**
     * Gets a role by its ID.
     * @param id The role ID
     * @returns The role if found, null otherwise
     */
    async getRoleById(id) {
        return this.roles.get(id) || null;
    }
    /**
     * Gets a role by its name.
     * @param name The role name
     * @returns The role if found, null otherwise
     */
    async getRoleByName(name) {
        const normalizedName = name.toLowerCase();
        for (const role of this.roles.values()) {
            if (role.name.toLowerCase() === normalizedName) {
                return role;
            }
        }
        return null;
    }
    /**
     * Gets all available roles.
     * @returns Array of all roles
     */
    async getAllRoles() {
        return Array.from(this.roles.values());
    }
    /**
     * Saves a role response.
     * @param response The role response to save
     * @returns The saved role response
     */
    async saveRoleResponse(response) {
        this.responses.push(response);
        return response;
    }
    /**
     * Gets all scenarios.
     * @returns Array of all scenarios
     */
    async getAllScenarios() {
        return Array.from(this.scenarios.values());
    }
    /**
     * Gets a scenario by its ID.
     * @param id The scenario ID
     * @returns The scenario if found, null otherwise
     */
    async getScenarioById(id) {
        return this.scenarios.get(id) || null;
    }
    /**
     * Initializes the repository with predefined roles.
     */
    initializeRoles() {
        // Architect role
        const architect = Role.create('architect', 'Architect', 'As an architect, I focus on designing scalable, maintainable, and secure systems that meet business requirements while following best practices and industry standards.', [
            'Designing system architecture',
            'Making technology stack decisions',
            'Ensuring scalability and performance',
            'Defining integration patterns',
            'Establishing coding standards and best practices'
        ], [
            'System design patterns',
            'Scalability and performance optimization',
            'Security architecture',
            'Cloud infrastructure',
            'Microservices architecture'
        ]);
        this.roles.set(architect.id, architect);
        // Senior Developer role
        const seniorDeveloper = Role.create('senior-developer', 'Senior Developer', 'As a senior developer, I focus on implementing robust, efficient, and maintainable code while mentoring junior developers and ensuring code quality across the team.', [
            'Implementing complex features',
            'Code review and quality assurance',
            'Mentoring junior developers',
            'Troubleshooting and debugging',
            'Technical documentation'
        ], [
            'Software design patterns',
            'Clean code principles',
            'Test-driven development',
            'Performance optimization',
            'Debugging and problem-solving'
        ]);
        this.roles.set(seniorDeveloper.id, seniorDeveloper);
        // QA Engineer role
        const qaEngineer = Role.create('qa-engineer', 'QA Engineer', 'As a QA engineer, I focus on ensuring software quality through comprehensive testing strategies, automated testing, and identifying potential issues before they reach production.', [
            'Developing test plans and strategies',
            'Creating and executing test cases',
            'Automating tests for regression testing',
            'Identifying and reporting bugs',
            'Verifying bug fixes'
        ], [
            'Test planning and strategy',
            'Manual and automated testing',
            'Performance and load testing',
            'Security testing',
            'Test automation frameworks'
        ]);
        this.roles.set(qaEngineer.id, qaEngineer);
        // DevOps Engineer role
        const devopsEngineer = Role.create('devops-engineer', 'DevOps Engineer', 'As a DevOps engineer, I focus on streamlining development and operations processes through automation, CI/CD pipelines, and infrastructure as code to enable faster and more reliable software delivery.', [
            'Setting up CI/CD pipelines',
            'Automating deployment processes',
            'Managing cloud infrastructure',
            'Monitoring system performance',
            'Implementing security best practices'
        ], [
            'CI/CD pipelines',
            'Infrastructure as code',
            'Containerization and orchestration',
            'Monitoring and logging',
            'Cloud platforms (AWS, Azure, GCP)'
        ]);
        this.roles.set(devopsEngineer.id, devopsEngineer);
    }
    /**
     * Initializes the repository with predefined scenarios.
     */
    initializeScenarios() {
        // Architecture scenario
        const architectureScenario = Scenario.create('arch-001', 'Design a Scalable E-commerce Platform', 'Design a scalable microservice architecture for an e-commerce platform that can handle high traffic during sales events and provide a seamless shopping experience.', 'architecture', 'high', ['Architect', 'DevOps Engineer']);
        this.scenarios.set(architectureScenario.id, architectureScenario);
        // Development scenario
        const developmentScenario = Scenario.create('dev-001', 'Implement a Payment Processing System', 'Implement a secure payment processing system that integrates with multiple payment gateways and handles various payment methods while ensuring PCI compliance.', 'development', 'medium', ['Senior Developer', 'QA Engineer']);
        this.scenarios.set(developmentScenario.id, developmentScenario);
        // Testing scenario
        const testingScenario = Scenario.create('qa-001', 'Develop a Testing Strategy for a New Feature', 'Develop a comprehensive testing strategy for a new feature that includes user authentication, data processing, and integration with third-party services.', 'testing', 'medium', ['QA Engineer', 'Senior Developer']);
        this.scenarios.set(testingScenario.id, testingScenario);
        // DevOps scenario
        const devopsScenario = Scenario.create('devops-001', 'Set Up a CI/CD Pipeline for a Microservice Architecture', 'Set up a CI/CD pipeline for a microservice architecture that includes automated testing, deployment, and monitoring across multiple environments.', 'devops', 'high', ['DevOps Engineer', 'Architect']);
        this.scenarios.set(devopsScenario.id, devopsScenario);
    }
}
//# sourceMappingURL=roleRepository.js.map