#!/usr/bin/env node
import { runServer } from './server.js';
/**
 * Entry point for the CEO MCP server.
 * Starts the server and handles any fatal errors.
 */
export function main() {
    console.error("CEO MCP Server: Starting main function in server/index.ts");
    try {
        runServer().catch((error) => {
            console.error("Fatal error running server:", error);
            console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
            process.exit(1);
        });
    }
    catch (error) {
        console.error("Unexpected error in main function:", error);
        console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
        process.exit(1);
    }
}
// If this file is run directly, start the server
// In ES modules, we can check if this is the main module by comparing import.meta.url
// against the process.argv[1] converted to URL format
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
//# sourceMappingURL=index.js.map