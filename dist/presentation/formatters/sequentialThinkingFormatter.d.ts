import { SequentialThinkingResponseDto, SequentialThinkingErrorDto } from "../../application/useCases/processSequentialThinking.js";
import { Role } from "../../domain/models/role.js";
/**
 * Formatter for sequential thinking outputs.
 */
export declare class SequentialThinkingFormatter {
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
    /**
     * Formats a sequential thinking response as JSON.
     * @param response The sequential thinking response or error
     * @returns A JSON string
     */
    static formatOutputToJson(response: SequentialThinkingResponseDto | SequentialThinkingErrorDto): string;
}
