import { Role } from "../../domain/models/role.js";
import { BaseFormatter } from "./baseFormatter.js";
/**
 * Formatter for sequential thinking outputs.
 */
export declare class SequentialThinkingFormatter extends BaseFormatter {
    /**
     * Formats a sequential thinking response for console display.
     * @param steps The steps in the sequential thinking workflow
     * @param context The original context
     * @returns A formatted string for console display
     */
    static formatForConsole(steps: {
        role: Role;
        context: string;
        output?: string;
    }[], context: string): string;
}
