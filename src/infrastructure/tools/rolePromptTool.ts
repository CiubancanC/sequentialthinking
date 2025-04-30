import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Definition of the RolePrompt tool for the MCP server.
 * This tool allows clients to interact with the role-based prompting system.
 */
export const ROLE_PROMPT_TOOL: Tool = {
  name: "rolePrompt",
  description: `A tool that enables AI models to adopt specific professional roles for enhanced problem-solving.
This tool allows you to specify a professional role and a context or problem for the role to address.
When configured, it can use Google's Gemini 2.5 Flash Preview model to provide even more detailed and accurate responses.

When to use this tool:
- When you need expert guidance from a specific professional perspective
- When you want to approach a problem with a specific role's expertise
- When you need to systematically divide tasks among different roles
- When you want AI-enhanced responses with deeper technical insights

Available roles (use EXACTLY these role names):
- architect: For system design, architecture decisions, and technical planning
- senior-developer: For implementation guidance, coding best practices, and technical solutions
- qa-engineer: For testing strategies, quality assurance, and bug prevention
- devops-engineer: For deployment, CI/CD, and infrastructure concerns
- security-engineer: For security assessments, vulnerability management, and security best practices
- data-scientist: For data analysis, machine learning, and statistical insights
- ux-designer: For user experience design, interface improvements, and usability considerations
- product-manager: For product strategy, feature prioritization, and roadmap planning

IMPORTANT: You must use the exact role names listed above. The system supports fuzzy matching and aliases,
but using the exact role names is recommended for best results.

Parameters explained:
- role: The professional role to adopt (one of the roles listed above)
- context: The specific problem or situation that needs to be addressed
- scenarioId (optional): ID of a predefined scenario to use for additional context

You should:
1. Choose the most appropriate role for your current need
2. Provide a clear and detailed context describing the problem or situation
3. Use the response to guide your approach to the problem

When Gemini integration is enabled, you'll receive an enhanced response with:
- More detailed technical analysis
- More specific and actionable recommendations
- More comprehensive code examples and solutions
- Better tailored guidance for your specific context`,
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
