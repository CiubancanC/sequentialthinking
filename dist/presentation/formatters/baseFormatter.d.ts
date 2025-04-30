/**
 * Base formatter class with common formatting methods.
 */
export declare abstract class BaseFormatter {
    /**
     * Formats a response as JSON.
     * @param response The response to format
     * @returns A JSON string representation of the response
     */
    static formatOutputToJson(response: any): string;
}
