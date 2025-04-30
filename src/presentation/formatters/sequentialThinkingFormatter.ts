import { Role } from "../../domain/models/role.js";
import { truncateString } from "../../utils/formatting.js";
import { BaseFormatter } from "./baseFormatter.js";

/**
 * Formatter for sequential thinking outputs.
 */
export class SequentialThinkingFormatter extends BaseFormatter {
  /**
   * Formats a sequential thinking response for console display.
   * @param steps The steps in the sequential thinking workflow
   * @param context The original context
   * @returns A formatted string for console display
   */
  static formatForConsole(steps: { role: Role; context: string; output?: string }[], context: string): string {
    let result = `Sequential Thinking Process for: "${truncateString(context, 100)}"\n\n`;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      result += `Step ${i + 1}: ${step.role.name}\n`;
      result += `Context: ${truncateString(step.context, 100)}\n`;

      if (step.output) {
        result += `Output: ${truncateString(step.output, 100)}\n`;
      } else {
        result += 'Output: Not yet executed\n';
      }

      result += '\n';
    }

    return result;
  }
}
