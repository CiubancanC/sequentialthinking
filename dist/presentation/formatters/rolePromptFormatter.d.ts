import { RolePromptResponseDto } from "../../application/dtos/rolePromptDto.js";
import { Role } from "../../domain/models/role.js";
/**
 * Formatter for role prompt responses.
 */
export declare class RolePromptFormatter {
    /**
     * Formats a role prompt response for console display.
     * @param role The role that generated the response
     * @param context The context that was addressed
     * @returns A formatted string for console display
     */
    static formatForConsole(role: Role, context: string): string;
    /**
     * Formats a role prompt response as JSON.
     * @param response The response to format
     * @returns A JSON string representation of the response
     */
    static formatOutputToJson(response: RolePromptResponseDto | {
        error: string;
        status: 'failed';
    }): string;
}
