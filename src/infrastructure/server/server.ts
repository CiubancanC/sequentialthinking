import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

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
export function createServer(): McpServer {
  console.error("Fidora Server: Creating server instance");
  try {
    // Create the server with metadata
    const server = new McpServer({
      name: "fidora-server",
      version: "1.0.0",
    });

    // Set up the domain and application layers for RolePrompt
    const roleRepository = new InMemoryRoleRepository();
    const roleService = new RoleServiceImpl(roleRepository);
    const processRolePromptUseCase = new ProcessRolePromptUseCase(roleService);

    // Add the rolePrompt tool
    server.tool(
      ROLE_PROMPT_TOOL.name,
      {
        role: z.string().describe("The professional role to adopt"),
        context: z.string().describe("The context or problem description for the role to address"),
        scenarioId: z.string().optional().describe("Optional ID of a predefined scenario to use")
      },
      async (args) => {
        try {
          // Validate the input
          const validatedInput = validateRolePromptData(args);

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

          // Fallback for unexpected cases
          return {
            content: [{
              type: "text",
              text: "Unknown error occurred"
            }],
            isError: true
          };
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
    );

    return server;
  } catch (error) {
    console.error("Error creating server:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    throw error;
  }
}

/**
 * Initializes and runs the MCP server using standard I/O transport.
 */
export async function runServer(): Promise<void> {
  console.error("Fidora Server: Starting runServer function");

  try {
    console.error("Fidora Server: Creating server instance");
    const server = createServer();

    console.error("Fidora Server: Creating transport");
    const transport = new StdioServerTransport();

    try {
      console.error("Fidora Server: Connecting to transport");
      await server.connect(transport);
      console.error("Fidora Server running on stdio");
      console.error("Available tools: rolePrompt");

      // Keep the process alive indefinitely
      // The McpServer will handle the connection lifecycle
      await new Promise<void>((resolve) => {
        // This promise intentionally never resolves to keep the server running
      });
    } catch (error) {
      console.error("Error during server connection or operation:", error);
      console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      throw error;
    } finally {
      console.error("Fidora Server: runServer function potentially finishing");
    }
  } catch (error) {
    console.error("Fatal error in runServer:", error);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    throw error;
  }
}
