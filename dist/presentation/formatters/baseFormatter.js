import { formatAsJson } from "../../utils/formatting.js";
/**
 * Base formatter class with common formatting methods.
 */
export class BaseFormatter {
    /**
     * Formats a response as JSON.
     * @param response The response to format
     * @returns A JSON string representation of the response
     */
    static formatOutputToJson(response) {
        return formatAsJson(response);
    }
}
//# sourceMappingURL=baseFormatter.js.map