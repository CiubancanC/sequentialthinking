import { formatAsJson } from "../../utils/formatting.js";

/**
 * Base formatter class with common formatting methods.
 */
export abstract class BaseFormatter {
  /**
   * Formats a response as JSON.
   * @param response The response to format
   * @returns A JSON string representation of the response
   */
  public static formatOutputToJson(response: any): string {
    return formatAsJson(response);
  }
}
