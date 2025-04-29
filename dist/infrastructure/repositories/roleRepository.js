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
    // Role aliases mapping
    roleAliases = {
        'architect': [
            'system architect',
            'software architect',
            'solution architect',
            'technical architect',
            'enterprise architect',
            'application architect',
            'infrastructure architect',
            'cloud architect',
            'systems architect',
            'software system architect'
        ],
        'senior-developer': [
            'senior software developer',
            'senior programmer',
            'senior software engineer',
            'lead developer',
            'principal developer',
            'senior coder',
            'senior engineer',
            'tech lead',
            'software development lead',
            'principal engineer'
        ],
        'qa-engineer': [
            'quality assurance engineer',
            'test engineer',
            'quality engineer',
            'software tester',
            'test analyst',
            'qa analyst',
            'quality analyst',
            'test automation engineer',
            'sdet',
            'quality assurance specialist'
        ],
        'devops-engineer': [
            'devops specialist',
            'site reliability engineer',
            'sre',
            'platform engineer',
            'infrastructure engineer',
            'release engineer',
            'deployment engineer',
            'cloud engineer',
            'ci/cd engineer',
            'operations engineer'
        ],
        'security-engineer': [
            'security specialist',
            'cybersecurity engineer',
            'information security engineer',
            'application security engineer',
            'security analyst',
            'security consultant',
            'penetration tester',
            'ethical hacker',
            'security architect',
            'compliance specialist'
        ],
        'data-scientist': [
            'data analyst',
            'machine learning engineer',
            'ai engineer',
            'analytics specialist',
            'data mining specialist',
            'statistical analyst',
            'research scientist',
            'quantitative analyst',
            'ml engineer',
            'ai researcher'
        ],
        'ux-designer': [
            'user experience designer',
            'ui designer',
            'interaction designer',
            'user interface designer',
            'product designer',
            'experience designer',
            'ui/ux designer',
            'visual designer',
            'web designer',
            'interface architect'
        ],
        'product-manager': [
            'product owner',
            'program manager',
            'project manager',
            'technical product manager',
            'product lead',
            'feature owner',
            'business analyst',
            'product strategist',
            'product marketing manager',
            'requirements analyst'
        ]
    };
    /**
     * Gets a role by its name or ID.
     * @param name The role name or ID
     * @returns The role if found, null otherwise
     */
    async getRoleByName(name) {
        console.error(`[DEBUG] getRoleByName called with name: "${name}"`);
        if (!name) {
            console.error(`[DEBUG] Name is empty or undefined`);
            return null;
        }
        const normalizedName = name.toLowerCase().trim();
        console.error(`[DEBUG] Normalized name: "${normalizedName}"`);
        // Log all available roles for debugging
        console.error(`[DEBUG] Available roles:`);
        for (const [id, role] of this.roles.entries()) {
            console.error(`[DEBUG]   - ID: "${id}", Name: "${role.name}"`);
        }
        // 1. Direct ID lookup
        const roleById = this.roles.get(normalizedName);
        if (roleById) {
            console.error(`[DEBUG] Found role by ID: "${roleById.id}"`);
            return roleById;
        }
        console.error(`[DEBUG] Role not found by ID lookup`);
        // 2. Exact name match
        for (const role of this.roles.values()) {
            console.error(`[DEBUG] Comparing name: "${role.name.toLowerCase()}" with "${normalizedName}"`);
            if (role.name.toLowerCase() === normalizedName) {
                console.error(`[DEBUG] Found role by name: "${role.name}"`);
                return role;
            }
        }
        console.error(`[DEBUG] Role not found by name lookup`);
        // 3. Check against aliases
        for (const [roleId, aliases] of Object.entries(this.roleAliases)) {
            if (aliases.includes(normalizedName)) {
                const role = this.roles.get(roleId);
                if (role) {
                    console.error(`[DEBUG] Found role by alias match: "${role.id}" for alias "${normalizedName}"`);
                    return role;
                }
            }
        }
        console.error(`[DEBUG] Role not found by alias lookup`);
        // 4. Format normalization (hyphens vs spaces)
        const normalizedNameNoHyphens = normalizedName.replace(/-/g, ' ');
        console.error(`[DEBUG] Normalized name without hyphens: "${normalizedNameNoHyphens}"`);
        for (const role of this.roles.values()) {
            const roleIdNoHyphens = role.id.toLowerCase().replace(/-/g, ' ');
            console.error(`[DEBUG] Comparing ID without hyphens: "${roleIdNoHyphens}" with "${normalizedNameNoHyphens}"`);
            if (roleIdNoHyphens === normalizedNameNoHyphens) {
                console.error(`[DEBUG] Found role by ID without hyphens: "${role.id}"`);
                return role;
            }
            const roleNameNoHyphens = role.name.toLowerCase().replace(/-/g, ' ');
            if (roleNameNoHyphens === normalizedNameNoHyphens) {
                console.error(`[DEBUG] Found role by name without hyphens: "${role.name}"`);
                return role;
            }
        }
        // 5. Check if the normalized name is a partial match for any alias
        for (const [roleId, aliases] of Object.entries(this.roleAliases)) {
            for (const alias of aliases) {
                if (alias.includes(normalizedName) || normalizedName.includes(alias)) {
                    const role = this.roles.get(roleId);
                    if (role) {
                        console.error(`[DEBUG] Found role by partial alias match: "${role.id}" for partial alias "${normalizedName}"`);
                        return role;
                    }
                }
            }
        }
        // 6. Fuzzy substring matching
        for (const role of this.roles.values()) {
            // Check if the normalized name is a substring of the role ID or vice versa
            if (role.id.toLowerCase().includes(normalizedName) || normalizedName.includes(role.id.toLowerCase())) {
                console.error(`[DEBUG] Found role by fuzzy ID match: "${role.id}"`);
                return role;
            }
            // Check if the normalized name is a substring of the role name or vice versa
            if (role.name.toLowerCase().includes(normalizedName) || normalizedName.includes(role.name.toLowerCase())) {
                console.error(`[DEBUG] Found role by fuzzy name match: "${role.name}"`);
                return role;
            }
        }
        console.error(`[DEBUG] Role not found: "${name}"`);
        // 7. Keyword-based fallbacks
        // If the role is not found but we're looking for a developer role, return the senior-developer role
        if (normalizedName.includes('developer') || normalizedName.includes('engineer') ||
            normalizedName.includes('programmer') || normalizedName.includes('coder') ||
            normalizedName.includes('software') || normalizedName.includes('coding')) {
            const seniorDeveloper = this.roles.get('senior-developer');
            if (seniorDeveloper) {
                console.error(`[DEBUG] Falling back to senior-developer role based on keywords`);
                return seniorDeveloper;
            }
        }
        // If the role is not found but we're looking for an architect role, return the architect role
        if (normalizedName.includes('architect') || normalizedName.includes('design') ||
            normalizedName.includes('system') || normalizedName.includes('solution') ||
            normalizedName.includes('structure') || normalizedName.includes('framework')) {
            const architect = this.roles.get('architect');
            if (architect) {
                console.error(`[DEBUG] Falling back to architect role based on keywords`);
                return architect;
            }
        }
        // If the role is not found but we're looking for a QA role, return the qa-engineer role
        if (normalizedName.includes('qa') || normalizedName.includes('test') ||
            normalizedName.includes('quality') || normalizedName.includes('assurance') ||
            normalizedName.includes('verification') || normalizedName.includes('validation')) {
            const qaEngineer = this.roles.get('qa-engineer');
            if (qaEngineer) {
                console.error(`[DEBUG] Falling back to qa-engineer role based on keywords`);
                return qaEngineer;
            }
        }
        // If the role is not found but we're looking for a DevOps role, return the devops-engineer role
        if (normalizedName.includes('devops') || normalizedName.includes('ops') ||
            normalizedName.includes('operations') || normalizedName.includes('deployment') ||
            normalizedName.includes('infrastructure') || normalizedName.includes('platform')) {
            const devopsEngineer = this.roles.get('devops-engineer');
            if (devopsEngineer) {
                console.error(`[DEBUG] Falling back to devops-engineer role based on keywords`);
                return devopsEngineer;
            }
        }
        // 8. Last resort: return the first available role (preferably architect)
        const architect = this.roles.get('architect');
        if (architect) {
            console.error(`[DEBUG] Falling back to architect role as last resort`);
            return architect;
        }
        if (this.roles.size > 0) {
            const firstRole = Array.from(this.roles.values())[0];
            console.error(`[DEBUG] Falling back to first available role: "${firstRole.id}"`);
            return firstRole;
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
        // Security Engineer role
        const securityEngineer = Role.create('security-engineer', 'Security Engineer', 'As a security engineer, I focus on identifying and mitigating security vulnerabilities, implementing security best practices, and ensuring the overall security posture of the system.', [
            'Conducting security assessments',
            'Implementing security controls',
            'Performing vulnerability scanning',
            'Developing security policies',
            'Incident response planning'
        ], [
            'Application security',
            'Network security',
            'Identity and access management',
            'Threat modeling',
            'Security compliance frameworks'
        ]);
        this.roles.set(securityEngineer.id, securityEngineer);
        // Data Scientist role
        const dataScientist = Role.create('data-scientist', 'Data Scientist', 'As a data scientist, I focus on extracting insights from data, building predictive models, and applying statistical analysis to solve complex business problems.', [
            'Data analysis and exploration',
            'Feature engineering',
            'Model development and validation',
            'Data visualization',
            'Communicating insights to stakeholders'
        ], [
            'Machine learning algorithms',
            'Statistical analysis',
            'Data preprocessing techniques',
            'Model evaluation metrics',
            'Data visualization tools'
        ]);
        this.roles.set(dataScientist.id, dataScientist);
        // UX Designer role
        const uxDesigner = Role.create('ux-designer', 'UX Designer', 'As a UX designer, I focus on creating intuitive, accessible, and delightful user experiences through user research, interaction design, and usability testing.', [
            'Conducting user research',
            'Creating user personas',
            'Designing user flows and wireframes',
            'Prototyping and usability testing',
            'Collaborating with developers on implementation'
        ], [
            'User-centered design principles',
            'Information architecture',
            'Interaction design patterns',
            'Accessibility standards',
            'Design systems'
        ]);
        this.roles.set(uxDesigner.id, uxDesigner);
        // Product Manager role
        const productManager = Role.create('product-manager', 'Product Manager', 'As a product manager, I focus on defining product vision, prioritizing features, and coordinating cross-functional teams to deliver products that meet user needs and business goals.', [
            'Defining product vision and strategy',
            'Gathering and prioritizing requirements',
            'Creating product roadmaps',
            'Coordinating with development teams',
            'Analyzing market trends and user feedback'
        ], [
            'Product lifecycle management',
            'Agile methodologies',
            'Market analysis',
            'User story creation',
            'Product metrics and KPIs'
        ]);
        this.roles.set(productManager.id, productManager);
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
        // Security scenario
        const securityScenario = Scenario.create('sec-001', 'Conduct a Security Assessment of a Web Application', 'Conduct a comprehensive security assessment of a web application, identify vulnerabilities, and recommend security controls to mitigate risks.', 'security', 'high', ['Security Engineer', 'Architect']);
        this.scenarios.set(securityScenario.id, securityScenario);
        // Data Science scenario
        const dataScenario = Scenario.create('data-001', 'Build a Recommendation System', 'Build a recommendation system that analyzes user behavior and preferences to suggest relevant products or content, improving user engagement and conversion rates.', 'data-science', 'medium', ['Data Scientist', 'Senior Developer']);
        this.scenarios.set(dataScenario.id, dataScenario);
        // UX Design scenario
        const uxScenario = Scenario.create('ux-001', 'Redesign a Mobile App Interface', 'Redesign the user interface of a mobile app to improve usability, accessibility, and user satisfaction based on user feedback and analytics data.', 'ux-design', 'medium', ['UX Designer', 'Product Manager']);
        this.scenarios.set(uxScenario.id, uxScenario);
        // Product Management scenario
        const productScenario = Scenario.create('prod-001', 'Develop a Product Roadmap for a SaaS Platform', 'Develop a comprehensive product roadmap for a SaaS platform, prioritizing features based on user needs, market trends, and business goals.', 'product-management', 'high', ['Product Manager', 'Architect']);
        this.scenarios.set(productScenario.id, productScenario);
    }
}
//# sourceMappingURL=roleRepository.js.map