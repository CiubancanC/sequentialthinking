/**
 * Interfaces for presentation formatters.
 */
import { Role } from "../../domain/models/role.js";

/**
 * Interface for base formatter functionality.
 */
export interface IBaseFormatter {
  /**
   * Formats a response as JSON.
   * @param response The response to format
   * @returns A JSON string representation of the response
   */
  formatOutputToJson(response: any): string;
}

/**
 * Interface for role prompt formatter.
 */
export interface IRolePromptFormatter extends IBaseFormatter {
  /**
   * Formats a role prompt response for console display.
   * @param role The role that generated the response
   * @param context The context that was addressed
   * @returns A formatted string for console display
   */
  formatForConsole(role: Role, context: string): string;
}
