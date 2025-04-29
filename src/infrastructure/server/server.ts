import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { ProcessThoughtUseCase } from "../../application/useCases/processThought.js";
import { ThoughtServiceImpl } from "../../domain/services/thoughtService.js";
import { InMemoryThoughtRepository } from "../repositories/thoughtRepository.js";
import { CEOMCP_TOOL } from "../tools/ceomcpTool.js";
import { validateThoughtData } from "../validation/schemas.js";
import { ThoughtFormatter } from "../../presentation/formatters/thoughtFormatter.js";
import { Thought } from "../../domain/models/thought.js";

/**
 * Creates and configures the MCP server.
 * @returns The configured server.
 */
export function createServer(): Server {
  // Create the server with metadata
  const server = new Server(
    {
      name: "ceomcp-server",
      version: "0.2.0",
    },
    {
      capabilities: {
        tools: {}, // Tools are listed via the request handler
      },
    }
  );

  // Set up the domain and application layers
  const repository = new InMemoryThoughtRepository();
  const thoughtService = new ThoughtServiceImpl(repository);
  const processThoughtUseCase = new ProcessThoughtUseCase(thoughtService);

  // Handler for listing available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [CEOMCP_TOOL],
  }));

  // Handler for calling a tool
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === CEOMCP_TOOL.name) {
      try {
        // Validate the input
        const validatedInput = validateThoughtData(request.params.arguments);
        
        // Process the thought using the use case
        const result = processThoughtUseCase.execute(validatedInput);
        
        if (result.error) {
          // Handle error case
          console.error(`Error processing thought: ${result.error.error}`);
          return {
            content: [{
              type: "text",
              text: ThoughtFormatter.formatOutputToJson(result.error)
            }],
            isError: true
          };
        } else if (result.data) {
          // Handle success case
          // Format the thought for console display
          const thought = Thought.create(validatedInput);
          console.error(ThoughtFormatter.formatForConsole(thought));
          
          // Return the result as JSON
          return {
            content: [{
              type: "text",
              text: ThoughtFormatter.formatOutputToJson(result.data)
            }]
          };
        }
      } catch (error) {
        // Handle unexpected errors
        console.error(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
        return {
          content: [{
            type: "text",
            text: ThoughtFormatter.formatOutputToJson({
              error: error instanceof Error ? error.message : String(error),
              status: 'failed'
            })
          }],
          isError: true
        };
      }
    }

    // Handle unknown tool requests
    return {
      content: [{
        type: "text",
        text: ThoughtFormatter.formatOutputToJson({
          error: `Unknown tool: ${request.params.name}`,
          status: 'failed'
        })
      }],
      isError: true
    };
  });

  return server;
}

/**
 * Initializes and runs the MCP server using standard I/O transport.
 */
export async function runServer(): Promise<void> {
  console.error("CEOMCP MCP Server: Starting runServer function");
  const server = createServer();
  const transport = new StdioServerTransport();
  
  try {
    await server.connect(transport);
    console.error("CEOMCP MCP Server running on stdio");
    // Keep the process alive indefinitely
    await new Promise(() => { /* Keep alive */ });
  } catch (error) {
    console.error("Error during server connection or operation:", error);
    throw error;
  } finally {
    console.error("CEOMCP MCP Server: runServer function potentially finishing");
  }
}
