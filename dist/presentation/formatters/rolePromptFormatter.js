import { formatAsList, truncateString } from "../../utils/formatting.js";
import { BaseFormatter } from "./baseFormatter.js";
/**
 * Formatter for role prompt responses.
 */
export class RolePromptFormatter extends BaseFormatter {
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
Context: ${truncateString(context, 200)}

=== Role Information ===
Description: ${role.description}
Responsibilities:
${formatAsList(role.responsibilities, '  - ')}
Expertise:
${formatAsList(role.expertise, '  - ')}
`;
    }
}
//# sourceMappingURL=rolePromptFormatter.js.map