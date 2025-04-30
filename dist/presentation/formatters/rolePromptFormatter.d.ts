import { Role } from "../../domain/models/role.js";
import { BaseFormatter } from "./baseFormatter.js";
/**
 * Formatter for role prompt responses.
 */
export declare class RolePromptFormatter extends BaseFormatter {
    /**
     * Formats a role prompt response for console display.
     * @param role The role that generated the response
     * @param context The context that was addressed
     * @returns A formatted string for console display
     */
    static formatForConsole(role: Role, context: string): string;
}
