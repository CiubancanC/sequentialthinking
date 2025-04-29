import chalk from 'chalk';
import { z } from 'zod';
import { ThoughtData, ThoughtDataSchema } from './types.js';

/**
 * Manages the state and processing logic for the CEOMCP thinking process.
 */
export class CeomcpProcessor {
  /**
   * Stores the history of thoughts processed by the server.
   */
  private thoughtHistory: ThoughtData[] = [];
  /**
   * Stores any branched lines of reasoning, keyed by a branch ID.
   */
  private branches: Record<string, ThoughtData[]> = {};

  /**
   * Validates the structure of a thought data object using the Zod schema.
   * @param input The input to validate.
   * @returns The validated thought data.
   * @throws Error if the input is invalid, with a message describing the validation error.
   */
  public validateThoughtData(input: unknown): ThoughtData {
    try {
      return ThoughtDataSchema.parse(input);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
      }
      throw error;
    }
  }

  /**
   * Formats a thought data object into a string for logging to the console.
   * @param thoughtData The thought data to format.
   * @returns A formatted string representing the thought.
   */
  private formatThought(thoughtData: ThoughtData): string {
    const { thoughtNumber, totalThoughts, thought, isRevision, revisesThought, branchFromThought, branchId } = thoughtData;

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
    const thoughtLength = thought ? thought.length : 0;
    const border = '─'.repeat(Math.max(header.length, thoughtLength) + 4);

    return `
┌${border}┐
│ ${header} │
├${border}┤
│ ${(thought || '').padEnd(border.length - 2)} │
└${border}┘`;
  }


  /**
   * Processes a thought by validating it, adding it to the history, and formatting it for output.
   * @param input The input to process.
   * @returns An object containing the processed thought data as a JSON string.
   */
  public processThought(input: unknown): { content: Array<{ type: string; text: string }>; isError?: boolean } {
    try {
      const validatedInput = this.validateThoughtData(input);

      if (validatedInput.thoughtNumber > validatedInput.totalThoughts) {
        validatedInput.totalThoughts = validatedInput.thoughtNumber;
      }

      this.thoughtHistory.push(validatedInput);

      if (validatedInput.branchFromThought && validatedInput.branchId) {
        if (!this.branches[validatedInput.branchId]) {
          this.branches[validatedInput.branchId] = [];
        }
        this.branches[validatedInput.branchId].push(validatedInput);
      }

      const formattedThought = this.formatThought(validatedInput);
      console.error(formattedThought); // Log formatted thought to stderr

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            thoughtNumber: validatedInput.thoughtNumber,
            totalThoughts: validatedInput.totalThoughts,
            nextThoughtNeeded: validatedInput.nextThoughtNeeded,
            branches: Object.keys(this.branches),
            thoughtHistoryLength: this.thoughtHistory.length
          }, null, 2)
        }]
      };
    } catch (error) {
      console.error(chalk.red(`Error processing thought: ${error instanceof Error ? error.message : String(error)}`)); // Log error to stderr
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error: error instanceof Error ? error.message : String(error),
            status: 'failed'
          }, null, 2)
        }],
        isError: true
      };
    }
  }

  // Added for testing purposes if needed
  public getThoughtHistory(): ThoughtData[] {
    return [...this.thoughtHistory];
  }

  public getBranches(): Record<string, ThoughtData[]> {
    return { ...this.branches };
  }

  public resetState(): void {
    this.thoughtHistory = [];
    this.branches = {};
  }
}
