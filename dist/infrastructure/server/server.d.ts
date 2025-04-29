import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
/**
 * Creates and configures the MCP server.
 * @returns The configured server.
 */
export declare function createServer(): McpServer;
/**
 * Initializes and runs the MCP server using standard I/O transport.
 */
export declare function runServer(): Promise<void>;
