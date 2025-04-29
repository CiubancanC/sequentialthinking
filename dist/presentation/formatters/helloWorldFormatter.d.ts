import { HelloWorld } from '../../domain/models/helloWorld.js';
/**
 * Formats a HelloWorld message for display in the console.
 */
export declare class HelloWorldFormatter {
    /**
     * Formats a HelloWorld message into a string for console display.
     * @param helloWorld The HelloWorld message to format.
     * @returns A formatted string representing the HelloWorld message.
     */
    static formatForConsole(helloWorld: HelloWorld): string;
    /**
     * Formats a HelloWorld output DTO into a JSON string.
     * @param data The data to format.
     * @returns A formatted JSON string.
     */
    static formatOutputToJson(data: Record<string, any>): string;
}
