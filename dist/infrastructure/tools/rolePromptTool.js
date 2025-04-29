/**
 * Definition of the RolePrompt tool for the MCP server.
 * This tool allows clients to interact with the role-based prompting system.
 */
export const ROLE_PROMPT_TOOL = {
    name: "rolePrompt",
    description: `A tool that enables AI models to adopt specific professional roles for enhanced problem-solving.
This tool allows you to specify a professional role and a context or problem for the role to address.

When to use this tool:
- When you need expert guidance from a specific professional perspective
- When you want to approach a problem with a specific role's expertise
- When you need to systematically divide tasks among different roles

Available roles:
- architect: For system design, architecture decisions, and technical planning
- senior-developer: For implementation guidance, coding best practices, and technical solutions
- qa-engineer: For testing strategies, quality assurance, and bug prevention
- devops-engineer: For deployment, CI/CD, and infrastructure concerns

Parameters explained:
- role: The professional role to adopt (e.g., "architect", "senior-developer", "qa-engineer")
- context: The specific problem or situation that needs to be addressed
- scenarioId (optional): ID of a predefined scenario to use for additional context

You should:
1. Choose the most appropriate role for your current need
2. Provide a clear and detailed context describing the problem or situation
3. Use the response to guide your approach to the problem`,
    inputSchema: {
        type: "object",
        properties: {
            role: {
                type: "string",
                description: "The professional role to adopt"
            },
            context: {
                type: "string",
                description: "The context or problem description for the role to address"
            },
            scenarioId: {
                type: "string",
                description: "Optional ID of a predefined scenario to use"
            }
        },
        required: ["role", "context"]
    }
};
//# sourceMappingURL=rolePromptTool.js.map