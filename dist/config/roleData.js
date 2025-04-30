/**
 * Configuration for predefined roles.
 */
export const roleData = [
    {
        id: 'architect',
        name: 'Architect',
        description: 'As an architect, I focus on designing scalable, maintainable, and secure systems that meet business requirements while following best practices and industry standards.',
        responsibilities: [
            'Designing system architecture',
            'Making technology stack decisions',
            'Ensuring scalability and performance',
            'Defining integration patterns',
            'Establishing coding standards and best practices'
        ],
        expertise: [
            'System design patterns',
            'Scalability and performance optimization',
            'Security architecture',
            'Cloud infrastructure',
            'Microservices architecture'
        ]
    },
    {
        id: 'senior-developer',
        name: 'Senior Developer',
        description: 'As a senior developer, I focus on implementing robust, efficient, and maintainable code while mentoring junior developers and ensuring code quality across the team.',
        responsibilities: [
            'Implementing complex features',
            'Code review and quality assurance',
            'Mentoring junior developers',
            'Troubleshooting and debugging',
            'Technical documentation'
        ],
        expertise: [
            'Software design patterns',
            'Clean code principles',
            'Test-driven development',
            'Performance optimization',
            'Debugging and problem-solving'
        ]
    },
    {
        id: 'qa-engineer',
        name: 'QA Engineer',
        description: 'As a QA engineer, I focus on ensuring software quality through comprehensive testing strategies, automated testing, and identifying potential issues before they reach production.',
        responsibilities: [
            'Developing test plans and strategies',
            'Creating and executing test cases',
            'Automating tests for regression testing',
            'Identifying and reporting bugs',
            'Verifying bug fixes'
        ],
        expertise: [
            'Test planning and strategy',
            'Manual and automated testing',
            'Performance and load testing',
            'Security testing',
            'Test automation frameworks'
        ]
    },
    {
        id: 'devops-engineer',
        name: 'DevOps Engineer',
        description: 'As a DevOps engineer, I focus on streamlining development and operations processes through automation, CI/CD pipelines, and infrastructure as code to enable faster and more reliable software delivery.',
        responsibilities: [
            'Setting up CI/CD pipelines',
            'Automating deployment processes',
            'Managing cloud infrastructure',
            'Monitoring system performance',
            'Implementing security best practices'
        ],
        expertise: [
            'CI/CD pipelines',
            'Infrastructure as code',
            'Containerization and orchestration',
            'Monitoring and logging',
            'Cloud platforms (AWS, Azure, GCP)'
        ]
    },
    {
        id: 'security-engineer',
        name: 'Security Engineer',
        description: 'As a security engineer, I focus on identifying and mitigating security vulnerabilities, implementing security best practices, and ensuring the overall security posture of the system.',
        responsibilities: [
            'Conducting security assessments',
            'Implementing security controls',
            'Performing vulnerability scanning',
            'Developing security policies',
            'Incident response planning'
        ],
        expertise: [
            'Application security',
            'Network security',
            'Identity and access management',
            'Threat modeling',
            'Security compliance frameworks'
        ]
    },
    {
        id: 'data-scientist',
        name: 'Data Scientist',
        description: 'As a data scientist, I focus on extracting insights from data, building predictive models, and applying statistical analysis to solve complex business problems.',
        responsibilities: [
            'Data analysis and exploration',
            'Feature engineering',
            'Model development and validation',
            'Data visualization',
            'Communicating insights to stakeholders'
        ],
        expertise: [
            'Machine learning algorithms',
            'Statistical analysis',
            'Data preprocessing techniques',
            'Model evaluation metrics',
            'Data visualization tools'
        ]
    },
    {
        id: 'ux-designer',
        name: 'UX Designer',
        description: 'As a UX designer, I focus on creating intuitive, accessible, and delightful user experiences through user research, interaction design, and usability testing.',
        responsibilities: [
            'Conducting user research',
            'Creating user personas',
            'Designing user flows and wireframes',
            'Prototyping and usability testing',
            'Collaborating with developers on implementation'
        ],
        expertise: [
            'User-centered design principles',
            'Information architecture',
            'Interaction design patterns',
            'Accessibility standards',
            'Design systems'
        ]
    },
    {
        id: 'product-manager',
        name: 'Product Manager',
        description: 'As a product manager, I focus on defining product vision, prioritizing features, and coordinating cross-functional teams to deliver products that meet user needs and business goals.',
        responsibilities: [
            'Defining product vision and strategy',
            'Gathering and prioritizing requirements',
            'Creating product roadmaps',
            'Coordinating with development teams',
            'Analyzing market trends and user feedback'
        ],
        expertise: [
            'Product lifecycle management',
            'Agile methodologies',
            'Market analysis',
            'User story creation',
            'Product metrics and KPIs'
        ]
    }
];
/**
 * Configuration for predefined scenarios.
 */
export const scenarioData = [
    {
        id: 'arch-001',
        title: 'Design a Scalable E-commerce Platform',
        description: 'Design a scalable microservice architecture for an e-commerce platform that can handle high traffic during sales events and provide a seamless shopping experience.',
        category: 'architecture',
        complexity: 'high',
        suggestedRoles: ['Architect', 'DevOps Engineer']
    },
    {
        id: 'dev-001',
        title: 'Implement a Payment Processing System',
        description: 'Implement a secure payment processing system that integrates with multiple payment gateways and handles various payment methods while ensuring PCI compliance.',
        category: 'development',
        complexity: 'medium',
        suggestedRoles: ['Senior Developer', 'QA Engineer']
    },
    {
        id: 'qa-001',
        title: 'Develop a Testing Strategy for a New Feature',
        description: 'Develop a comprehensive testing strategy for a new feature that includes user authentication, data processing, and integration with third-party services.',
        category: 'testing',
        complexity: 'medium',
        suggestedRoles: ['QA Engineer', 'Senior Developer']
    },
    {
        id: 'devops-001',
        title: 'Set Up a CI/CD Pipeline for a Microservice Architecture',
        description: 'Set up a CI/CD pipeline for a microservice architecture that includes automated testing, deployment, and monitoring across multiple environments.',
        category: 'devops',
        complexity: 'high',
        suggestedRoles: ['DevOps Engineer', 'Architect']
    },
    {
        id: 'sec-001',
        title: 'Conduct a Security Assessment of a Web Application',
        description: 'Conduct a comprehensive security assessment of a web application, identify vulnerabilities, and recommend security controls to mitigate risks.',
        category: 'security',
        complexity: 'high',
        suggestedRoles: ['Security Engineer', 'Architect']
    },
    {
        id: 'data-001',
        title: 'Build a Recommendation System',
        description: 'Build a recommendation system that analyzes user behavior and preferences to suggest relevant products or content, improving user engagement and conversion rates.',
        category: 'data-science',
        complexity: 'medium',
        suggestedRoles: ['Data Scientist', 'Senior Developer']
    },
    {
        id: 'ux-001',
        title: 'Redesign a Mobile App Interface',
        description: 'Redesign the user interface of a mobile app to improve usability, accessibility, and user satisfaction based on user feedback and analytics data.',
        category: 'ux-design',
        complexity: 'medium',
        suggestedRoles: ['UX Designer', 'Product Manager']
    },
    {
        id: 'prod-001',
        title: 'Develop a Product Roadmap for a SaaS Platform',
        description: 'Develop a comprehensive product roadmap for a SaaS platform, prioritizing features based on user needs, market trends, and business goals.',
        category: 'product-management',
        complexity: 'high',
        suggestedRoles: ['Product Manager', 'Architect']
    }
];
/**
 * Role aliases mapping.
 */
export const roleAliases = {
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
//# sourceMappingURL=roleData.js.map