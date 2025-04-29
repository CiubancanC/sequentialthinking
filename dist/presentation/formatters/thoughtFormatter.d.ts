import { Thought } from '../../domain/models/thought.js';
/**
 * Formats a thought for display in the console.
 */
export declare class ThoughtFormatter {
    /**
     * Formats a thought into a string for console display.
     * @param thought The thought to format.
     * @returns A formatted string representing the thought.
     */
    static formatForConsole(thought: Thought): string;
    /**
     * Formats a thought output DTO into a JSON string.
     * @param data The data to format.
     * @returns A formatted JSON string.
     */
    static formatOutputToJson(data: Record<string, any>): string;
}
