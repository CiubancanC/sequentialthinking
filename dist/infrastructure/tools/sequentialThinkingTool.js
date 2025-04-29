/**
 * Definition of the SequentialThinking tool for the MCP server.
 * This tool allows clients to interact with the sequential thinking system.
 */
export const SEQUENTIAL_THINKING_TOOL = {
    name: "sequentialThinking",
    description: `A tool that enables AI models to use sequential thinking for complex problem-solving.
This tool automatically selects appropriate roles and scenarios based on the context, and chains multiple prompts together to solve complex problems.

When to use this tool:
- When you need to break down a complex problem into smaller, manageable steps
- When you want to approach a problem from multiple professional perspectives
- When you need a systematic, step-by-step analysis of a problem

The sequential thinking process:
1. The system analyzes your problem and selects the most appropriate role to start with
2. The selected role provides its analysis and recommendations
3. The system automatically determines if additional perspectives are needed
4. If needed, another role is selected to continue the analysis
5. This process continues until a comprehensive solution is reached

Available roles that may be automatically selected:
- architect: For system design, architecture decisions, and technical planning
- senior-developer: For implementation guidance, coding best practices, and technical solutions
- qa-engineer: For testing strategies, quality assurance, and bug prevention
- devops-engineer: For deployment, CI/CD, and infrastructure concerns

You should:
1. Provide a clear and detailed description of the problem or task
2. Let the system handle the role selection and sequential thinking process
3. Review the comprehensive analysis from multiple professional perspectives`,
    inputSchema: {
        type: "object",
        properties: {
            context: {
                type: "string",
                description: "The context or problem description to address with sequential thinking"
            },
            autoStart: {
                type: "boolean",
                description: "Whether to automatically start the sequential thinking process (default: true)"
            }
        },
        required: ["context"]
    }
};
//# sourceMappingURL=sequentialThinkingTool.js.map