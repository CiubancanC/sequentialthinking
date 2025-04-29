import chalk from 'chalk';
import { HelloWorld } from '../../domain/models/helloWorld.js';

/**
 * Formats a HelloWorld message for display in the console.
 */
export class HelloWorldFormatter {
  /**
   * Formats a HelloWorld message into a string for console display.
   * @param helloWorld The HelloWorld message to format.
   * @returns A formatted string representing the HelloWorld message.
   */
  public static formatForConsole(helloWorld: HelloWorld): string {
    const greeting = helloWorld.getGreeting();
    const border = '─'.repeat(greeting.length + 4);

    return `
┌${border}┐
│ ${chalk.green('👋 Hello World')} │
├${border}┤
│ ${greeting.padEnd(border.length - 2)} │
└${border}┘`;
  }

  /**
   * Formats a HelloWorld output DTO into a JSON string.
   * @param data The data to format.
   * @returns A formatted JSON string.
   */
  public static formatOutputToJson(data: Record<string, any>): string {
    return JSON.stringify(data, null, 2);
  }
}
