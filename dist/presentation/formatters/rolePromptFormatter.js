/**
 * Formatter for role prompt responses.
 */
export class RolePromptFormatter {
    /**
     * Formats a role prompt response for console display.
     * @param role The role that generated the response
     * @param context The context that was addressed
     * @returns A formatted string for console display
     */
    static formatForConsole(role, context) {
        return `
=== Role Prompt Request ===
Role: ${role.name}
Context: ${context}

=== Role Information ===
Description: ${role.description}
Responsibilities:
${role.responsibilities.map(r => `  - ${r}`).join('\n')}
Expertise:
${role.expertise.map(e => `  - ${e}`).join('\n')}
`;
    }
    /**
     * Formats a role prompt response as JSON.
     * @param response The response to format
     * @returns A JSON string representation of the response
     */
    static formatOutputToJson(response) {
        return JSON.stringify(response, null, 2);
    }
}
//# sourceMappingURL=rolePromptFormatter.js.map