import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { ProcessRolePromptUseCase } from "../../application/useCases/processRolePrompt.js";
import { RoleServiceImpl } from "../../domain/services/roleService.js";
import { InMemoryRoleRepository } from "../repositories/roleRepository.js";
import { ROLE_PROMPT_TOOL } from "../tools/rolePromptTool.js";
import { validateRolePromptData } from "../validation/rolePromptSchemas.js";
import { RolePromptFormatter } from "../../presentation/formatters/rolePromptFormatter.js";
import { Logger } from "../../utils/logger.js";
import { config } from "../../config/index.js";
import { createErrorResponse } from "../../utils/errors.js";

/**
 * Creates and configures the MCP server.
 * @returns The configured server.
 */
export function createServer(): McpServer {
  Logger.info("Creating Fidora server instance");

  try {
    // Create the server with metadata
    const server = new McpServer({
      name: config.server.name,
      version: config.server.version,
    });

    // Set up the domain and application layers
    const roleRepository = new InMemoryRoleRepository();
    const roleService = new RoleServiceImpl(roleRepository);

    // Set up the use cases
    const processRolePromptUseCase = new ProcessRolePromptUseCase(roleService);

    Logger.debug("Adding rolePrompt tool");

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
            Logger.warn(`Error processing role prompt: ${result.error.error}`);
            return {
              content: [{
                type: "text",
                text: RolePromptFormatter.formatOutputToJson(result.error)
              }],
              isError: true
            };
          }

          if (result.data) {
            // Format the role prompt for console display if in debug mode
            if (config.logging.debug) {
              const role = await roleService.getRoleByName(validatedInput.role);
              if (role) {
                Logger.debug("Role prompt processed successfully", {
                  role: role.id,
                  context: validatedInput.context.substring(0, 50) + "..."
                });
              }
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
          Logger.error("Unexpected error processing role prompt:", Logger.formatError(error));
          return {
            content: [{
              type: "text",
              text: RolePromptFormatter.formatOutputToJson(createErrorResponse(error))
            }],
            isError: true
          };
        }
      }
    );

    Logger.debug("Server configuration complete");
    return server;
  } catch (error) {
    Logger.error("Error creating server:", Logger.formatError(error));
    throw error;
  }
}

/**
 * Initializes and runs the MCP server using standard I/O transport.
 */
export async function runServer(): Promise<void> {
  Logger.info("Starting Fidora Server");

  try {
    // Create server instance
    const server = createServer();

    // Create transport
    Logger.debug("Creating stdio transport");
    const transport = new StdioServerTransport();

    try {
      // Connect to transport
      Logger.info("Connecting to transport");
      await server.connect(transport);
      Logger.info("Fidora Server running on stdio");

      // Log available tools
      Logger.info(`Available tool: ${ROLE_PROMPT_TOOL.name}`);

      // Keep the process alive indefinitely
      // The McpServer will handle the connection lifecycle
      await new Promise<void>(() => {
        // This promise intentionally never resolves to keep the server running
      });
    } catch (error) {
      Logger.error("Error during server connection:", Logger.formatError(error));
      throw error;
    }
  } catch (error) {
    Logger.error("Fatal error in runServer:", Logger.formatError(error));
    throw error;
  }
}
