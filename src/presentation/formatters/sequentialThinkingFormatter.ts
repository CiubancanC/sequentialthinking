import { SequentialThinkingResponseDto, SequentialThinkingErrorDto } from "../../application/useCases/processSequentialThinking.js";
import { Role } from "../../domain/models/role.js";

/**
 * Formatter for sequential thinking outputs.
 */
export class SequentialThinkingFormatter {
  /**
   * Formats a sequential thinking response for console display.
   * @param steps The steps in the sequential thinking workflow
   * @param context The original context
   * @returns A formatted string for console display
   */
  static formatForConsole(steps: { role: Role; context: string; output?: string }[], context: string): string {
    let result = `Sequential Thinking Process for: "${context.substring(0, 100)}${context.length > 100 ? '...' : ''}"\n\n`;
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      result += `Step ${i + 1}: ${step.role.name}\n`;
      result += `Context: ${step.context.substring(0, 100)}${step.context.length > 100 ? '...' : ''}\n`;
      
      if (step.output) {
        result += `Output: ${step.output.substring(0, 100)}${step.output.length > 100 ? '...' : ''}\n`;
      } else {
        result += 'Output: Not yet executed\n';
      }
      
      result += '\n';
    }
    
    return result;
  }

  /**
   * Formats a sequential thinking response as JSON.
   * @param response The sequential thinking response or error
   * @returns A JSON string
   */
  static formatOutputToJson(response: SequentialThinkingResponseDto | SequentialThinkingErrorDto): string {
    return JSON.stringify(response, null, 2);
  }
}
