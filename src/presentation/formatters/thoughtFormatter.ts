import chalk from 'chalk';
import { Thought } from '../../domain/models/thought.js';

/**
 * Formats a thought for display in the console.
 */
export class ThoughtFormatter {
  /**
   * Formats a thought into a string for console display.
   * @param thought The thought to format.
   * @returns A formatted string representing the thought.
   */
  public static formatForConsole(thought: Thought): string {
    const { thoughtNumber, totalThoughts, isRevision, revisesThought, branchFromThought, branchId } = thought;
    const thoughtText = thought.thought;

    let prefix = '';
    let context = '';

    if (isRevision) {
      prefix = chalk.yellow('🔄 Revision');
      context = ` (revising thought ${revisesThought})`;
    } else if (branchFromThought) {
      prefix = chalk.green('🌿 Branch');
      context = ` (from thought ${branchFromThought}, ID: ${branchId})`;
    } else {
      prefix = chalk.blue('💭 Thought');
      context = '';
    }

    const header = `${prefix} ${thoughtNumber}/${totalThoughts}${context}`;
    // Ensure border calculation handles potentially empty thought strings gracefully
    const thoughtLength = thoughtText ? thoughtText.length : 0;
    const border = '─'.repeat(Math.max(header.length, thoughtLength) + 4);

    return `
┌${border}┐
│ ${header} │
├${border}┤
│ ${(thoughtText || '').padEnd(border.length - 2)} │
└${border}┘`;
  }

  /**
   * Formats a thought output DTO into a JSON string.
   * @param data The data to format.
   * @returns A formatted JSON string.
   */
  public static formatOutputToJson(data: Record<string, any>): string {
    return JSON.stringify(data, null, 2);
  }
}
