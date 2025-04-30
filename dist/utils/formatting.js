/**
 * Truncates a string to the specified maximum length and adds an ellipsis if truncated.
 * @param str The string to truncate
 * @param maxLength The maximum length of the string
 * @returns The truncated string
 */
export function truncateString(str, maxLength = 100) {
    if (!str)
        return '';
    return `${str.substring(0, maxLength)}${str.length > maxLength ? '...' : ''}`;
}
/**
 * Formats an object as a JSON string.
 * @param obj The object to format
 * @returns A formatted JSON string
 */
export function formatAsJson(obj) {
    return JSON.stringify(obj, null, 2);
}
/**
 * Formats an array as a bulleted list.
 * @param items The array of items to format
 * @param prefix The prefix to use for each item (default: '- ')
 * @returns A formatted string with each item on a new line
 */
export function formatAsList(items, prefix = '- ') {
    if (!items || items.length === 0)
        return '';
    return items.map(item => `${prefix}${item}`).join('\n');
}
//# sourceMappingURL=formatting.js.map