import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { CeomcpProcessor } from "./CeomcpProcessor.js";
import { CEOMCP_TOOL } from "./toolDefinition.js";

const server = new Server(
  {
    name: "ceomcp-server",
    version: "0.2.0", // Consider updating version if making significant changes
  },
  {
    capabilities: {
      tools: {}, // Tools are listed via the request handler
    },
  }
);

const processor = new CeomcpProcessor();

// Handler for listing available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [CEOMCP_TOOL],
}));

// Handler for calling a tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === CEOMCP_TOOL.name) {
    return processor.processThought(request.params.arguments);
  }

  // Handle unknown tool requests
  return {
    content: [{
      type: "text",
      text: `Unknown tool: ${request.params.name}`
    }],
    isError: true
  };
});

/**
 * Initializes and runs the MCP server using standard I/O transport.
 */
export async function runServer() {
  console.error("CEOMCP MCP Server: Starting runServer function");
  const transport = new StdioServerTransport();
  try {
    await server.connect(transport);
    console.error("CEOMCP MCP Server running on stdio");
    // Keep the process alive indefinitely. In a real-world scenario,
    // you might want a more graceful shutdown mechanism.
    await new Promise(() => { /* Keep alive */ });
  } catch (error) {
    console.error("Error during server connection or operation:", error);
    // Optionally re-throw or handle specific errors
  } finally {
    // Cleanup resources if necessary, though StdioTransport might not require explicit cleanup
    console.error("CEOMCP MCP Server: runServer function potentially finishing (e.g., due to error)");
  }
}
