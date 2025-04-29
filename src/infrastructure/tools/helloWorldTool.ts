import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Definition of the HelloWorld tool for the MCP server.
 * This tool allows clients to interact with the HelloWorld message process.
 */
export const HELLO_WORLD_TOOL: Tool = {
  name: "helloworld",
  description: `A simple "Hello World" tool that demonstrates the basic functionality of the MCP server.
This tool allows you to send a greeting message and optionally specify a name to greet.

When to use this tool:
- When you want to test the basic functionality of the MCP server
- When you want to see a simple example of how to use the MCP server
- When you want to greet someone with a "Hello World" message

Parameters explained:
- message: The greeting message to send (defaults to "Hello" if not specified)
- name: The name of the person to greet (defaults to "World" if not specified)

You should:
1. Provide a greeting message (or use the default "Hello")
2. Optionally provide a name to greet (or use the default "World")
3. Enjoy the response!`,
  inputSchema: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "The greeting message to send"
      },
      name: {
        type: "string",
        description: "The name of the person to greet"
      }
    },
    required: ["message"]
  }
};
