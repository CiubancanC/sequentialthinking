/**
 * Truncates a string to the specified maximum length and adds an ellipsis if truncated.
 * @param str The string to truncate
 * @param maxLength The maximum length of the string
 * @returns The truncated string
 */
export declare function truncateString(str: string, maxLength?: number): string;
/**
 * Formats an object as a JSON string.
 * @param obj The object to format
 * @returns A formatted JSON string
 */
export declare function formatAsJson(obj: any): string;
/**
 * Formats an array as a bulleted list.
 * @param items The array of items to format
 * @param prefix The prefix to use for each item (default: '- ')
 * @returns A formatted string with each item on a new line
 */
export declare function formatAsList(items: string[], prefix?: string): string;
