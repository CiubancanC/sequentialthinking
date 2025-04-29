#!/usr/bin/env node
import { runServer } from './server.js';
/**
 * Entry point for the Hello World MCP server.
 * Starts the server and handles any fatal errors.
 */
export function main() {
    runServer().catch((error) => {
        console.error("Fatal error running server:", error);
        process.exit(1);
    });
}
// If this file is run directly, start the server
// In ES modules, we can check if this is the main module by comparing import.meta.url
// against the process.argv[1] converted to URL format
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
//# sourceMappingURL=index.js.map