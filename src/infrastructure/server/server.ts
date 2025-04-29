import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { ProcessRolePromptUseCase } from "../../application/useCases/processRolePrompt.js";
import { RoleServiceImpl } from "../../domain/services/roleService.js";
import { InMemoryRoleRepository } from "../repositories/roleRepository.js";
import { ROLE_PROMPT_TOOL } from "../tools/rolePromptTool.js";
import { validateRolePromptData } from "../validation/rolePromptSchemas.js";
import { RolePromptFormatter } from "../../presentation/formatters/rolePromptFormatter.js";

/**
 * Creates and configures the MCP server.
 * @returns The configured server.
 */
export function createServer(): Server {
  // Create the server with metadata
  const server = new Server(
    {
      name: "ceomcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {}, // Tools are listed via the request handler
      },
    }
  );

  // Set up the domain and application layers for RolePrompt
  const roleRepository = new InMemoryRoleRepository();
  const roleService = new RoleServiceImpl(roleRepository);
  const processRolePromptUseCase = new ProcessRolePromptUseCase(roleService);

  // Handler for listing available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [ROLE_PROMPT_TOOL],
  }));

  // Handler for calling a tool
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    // Handle RolePrompt tool
    if (request.params.name === ROLE_PROMPT_TOOL.name) {
      try {
        // Validate the input
        const validatedInput = validateRolePromptData(request.params.arguments);

        // Process the role prompt using the use case
        const result = await processRolePromptUseCase.execute(validatedInput);

        if (result.error) {
          // Handle error case
          console.error(`Error processing role prompt: ${result.error.error}`);
          return {
            content: [{
              type: "text",
              text: RolePromptFormatter.formatOutputToJson(result.error)
            }],
            isError: true
          };
        } else if (result.data) {
          // Handle success case
          // Format the role prompt for console display
          const role = await roleService.getRoleByName(validatedInput.role);
          if (role) {
            console.error(RolePromptFormatter.formatForConsole(role, validatedInput.context));
          }

          // Return the result as JSON
          return {
            content: [{
              type: "text",
              text: RolePromptFormatter.formatOutputToJson(result.data)
            }]
          };
        }
      } catch (error) {
        // Handle unexpected errors
        console.error(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
        return {
          content: [{
            type: "text",
            text: RolePromptFormatter.formatOutputToJson({
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
        text: RolePromptFormatter.formatOutputToJson({
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
  console.error("CEO MCP Server: Starting runServer function");
  const server = createServer();
  const transport = new StdioServerTransport();

  try {
    await server.connect(transport);
    console.error("CEO MCP Server running on stdio");
    console.error("Available tools: rolePrompt");
    // Keep the process alive indefinitely
    await new Promise(() => { /* Keep alive */ });
  } catch (error) {
    console.error("Error during server connection or operation:", error);
    throw error;
  } finally {
    console.error("CEO MCP Server: runServer function potentially finishing");
  }
}
