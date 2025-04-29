import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { ProcessHelloWorldUseCase } from "../../application/useCases/processHelloWorld.js";
import { ProcessRolePromptUseCase } from "../../application/useCases/processRolePrompt.js";
import { HelloWorldServiceImpl } from "../../domain/services/helloWorldService.js";
import { RoleServiceImpl } from "../../domain/services/roleService.js";
import { InMemoryHelloWorldRepository } from "../repositories/helloWorldRepository.js";
import { InMemoryRoleRepository } from "../repositories/roleRepository.js";
import { HELLO_WORLD_TOOL } from "../tools/helloWorldTool.js";
import { ROLE_PROMPT_TOOL } from "../tools/rolePromptTool.js";
import { validateHelloWorldData } from "../validation/helloWorldSchemas.js";
import { validateRolePromptData } from "../validation/rolePromptSchemas.js";
import { HelloWorldFormatter } from "../../presentation/formatters/helloWorldFormatter.js";
import { RolePromptFormatter } from "../../presentation/formatters/rolePromptFormatter.js";
import { HelloWorld } from "../../domain/models/helloWorld.js";
/**
 * Creates and configures the MCP server.
 * @returns The configured server.
 */
export function createServer() {
    // Create the server with metadata
    const server = new Server({
        name: "ceomcp-server",
        version: "1.0.0",
    }, {
        capabilities: {
            tools: {}, // Tools are listed via the request handler
        },
    });
    // Set up the domain and application layers for HelloWorld
    const helloWorldRepository = new InMemoryHelloWorldRepository();
    const helloWorldService = new HelloWorldServiceImpl(helloWorldRepository);
    const processHelloWorldUseCase = new ProcessHelloWorldUseCase(helloWorldService);
    // Set up the domain and application layers for RolePrompt
    const roleRepository = new InMemoryRoleRepository();
    const roleService = new RoleServiceImpl(roleRepository);
    const processRolePromptUseCase = new ProcessRolePromptUseCase(roleService);
    // Handler for listing available tools
    server.setRequestHandler(ListToolsRequestSchema, async () => ({
        tools: [HELLO_WORLD_TOOL, ROLE_PROMPT_TOOL],
    }));
    // Handler for calling a tool
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        // Handle HelloWorld tool
        if (request.params.name === HELLO_WORLD_TOOL.name) {
            try {
                // Validate the input
                const validatedInput = validateHelloWorldData(request.params.arguments);
                // Process the HelloWorld message using the use case
                const result = processHelloWorldUseCase.execute(validatedInput);
                if (result.error) {
                    // Handle error case
                    console.error(`Error processing HelloWorld message: ${result.error.error}`);
                    return {
                        content: [{
                                type: "text",
                                text: HelloWorldFormatter.formatOutputToJson(result.error)
                            }],
                        isError: true
                    };
                }
                else if (result.data) {
                    // Handle success case
                    // Format the HelloWorld message for console display
                    const helloWorld = HelloWorld.create(validatedInput);
                    console.error(HelloWorldFormatter.formatForConsole(helloWorld));
                    // Return the result as JSON
                    return {
                        content: [{
                                type: "text",
                                text: HelloWorldFormatter.formatOutputToJson(result.data)
                            }]
                    };
                }
            }
            catch (error) {
                // Handle unexpected errors
                console.error(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
                return {
                    content: [{
                            type: "text",
                            text: HelloWorldFormatter.formatOutputToJson({
                                error: error instanceof Error ? error.message : String(error),
                                status: 'failed'
                            })
                        }],
                    isError: true
                };
            }
        }
        // Handle RolePrompt tool
        else if (request.params.name === ROLE_PROMPT_TOOL.name) {
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
                }
                else if (result.data) {
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
            }
            catch (error) {
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
                    text: HelloWorldFormatter.formatOutputToJson({
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
export async function runServer() {
    console.error("CEO MCP Server: Starting runServer function");
    const server = createServer();
    const transport = new StdioServerTransport();
    try {
        await server.connect(transport);
        console.error("CEO MCP Server running on stdio");
        console.error("Available tools: helloworld, rolePrompt");
        // Keep the process alive indefinitely
        await new Promise(() => { });
    }
    catch (error) {
        console.error("Error during server connection or operation:", error);
        throw error;
    }
    finally {
        console.error("CEO MCP Server: runServer function potentially finishing");
    }
}
//# sourceMappingURL=server.js.map