import { Server } from "@modelcontextprotocol/sdk/server/index.js";
/**
 * Creates and configures the MCP server.
 * @returns The configured server.
 */
export declare function createServer(): Server;
/**
 * Initializes and runs the MCP server using standard I/O transport.
 */
export declare function runServer(): Promise<void>;
