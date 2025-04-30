import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { ROLE_PROMPT_TOOL } from '../../../src/infrastructure/tools/rolePromptTool';
import { RolePromptFormatter } from '../../../src/presentation/formatters/rolePromptFormatter';
import { Role } from '../../../src/domain/models/role';
import * as rolePromptSchemas from '../../../src/infrastructure/validation/rolePromptSchemas';
import { container, DIContainerImpl, Lifetime } from '../../../src/infrastructure/di/index.js';
import { DI_TOKENS } from '../../../src/infrastructure/di/registry.js';
import { ProcessRolePromptUseCase } from '../../../src/application/useCases/processRolePrompt.js';
import { IRoleService } from '../../../src/domain/interfaces/roleInterfaces.js';

// Mock dependencies
const mockProcessRolePromptUseCase = {
  execute: vi.fn(),
};

const mockRoleService = {
  getRoleByName: vi.fn(),
};

// Mock the DI container
vi.mock('../../../src/infrastructure/di/index.js', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    container: {
      resolve: vi.fn((token) => {
        if (token === DI_TOKENS.PROCESS_ROLE_PROMPT_USE_CASE) {
          return mockProcessRolePromptUseCase;
        }
        if (token === DI_TOKENS.ROLE_SERVICE) {
          return mockRoleService;
        }
        throw new Error(`Unexpected token: ${token}`);
      }),
      register: vi.fn(),
      has: vi.fn(),
      clear: vi.fn(),
    },
  };
});

// Mock the validation module and provide a mock implementation for validateRolePromptData
vi.mock('../../../src/infrastructure/validation/rolePromptSchemas', async (importOriginal) => {
  const actual = await importOriginal<typeof rolePromptSchemas>();
  return {
    ...actual,
    validateRolePromptData: vi.fn(),
  };
});

vi.mock('../../../src/presentation/formatters/rolePromptFormatter', () => ({
  RolePromptFormatter: {
    formatForConsole: vi.fn(),
    formatOutputToJson: vi.fn(),
  },
}));

// Define the handlers based on the logic in createServer
const listToolsHandler = async () => ({
  tools: [ROLE_PROMPT_TOOL],
});

const callToolHandler = async (request: any) => {
  // Handle RolePrompt tool
  if (request.params.name === ROLE_PROMPT_TOOL.name) {
    try {
      // Validate the input
      const validatedInput = rolePromptSchemas.validateRolePromptData(request.params.arguments);

      // Process the role prompt using the use case
      const result = await mockProcessRolePromptUseCase.execute(validatedInput);

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
        const role = await mockRoleService.getRoleByName(validatedInput.role);
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
};


describe('MCP Server Handlers', () => { // Renamed describe block
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ListToolsRequestSchema Handler', () => {
    it('should return the list of available tools', async () => {
      const request = { params: {} };
      const response = await listToolsHandler(); // Call the extracted handler

      expect(response).toEqual({
        tools: [ROLE_PROMPT_TOOL],
      });
    });
  });

  describe('CallToolRequestSchema Handler', () => {
    it('should handle rolePrompt tool call with valid input and successful execution', async () => {
      const validArguments = { role: 'architect', context: 'design system' };
      const mockUseCaseResult = { data: { response: 'analysis result' } };
      const mockFormattedJson = '{"status":"success","data":{"response":"analysis result"}}';
      const mockRole = Role.create('id', 'architect', 'desc', ['resp'], ['exp']);

      // Set up mock return values
      (mockProcessRolePromptUseCase.execute as any).mockResolvedValue(mockUseCaseResult);
      (RolePromptFormatter.formatOutputToJson as any).mockReturnValue(mockFormattedJson);
      (mockRoleService.getRoleByName as any).mockResolvedValue(mockRole);
      (RolePromptFormatter.formatForConsole as any).mockReturnValue('formatted console output');
      (rolePromptSchemas.validateRolePromptData as any).mockReturnValue(validArguments);


      const request = { params: { name: 'rolePrompt', arguments: validArguments } };
      const response = await callToolHandler(request); // Call the extracted handler

      expect(rolePromptSchemas.validateRolePromptData).toHaveBeenCalledWith(validArguments);
      expect(mockProcessRolePromptUseCase.execute).toHaveBeenCalledWith(validArguments);
      expect(mockRoleService.getRoleByName).toHaveBeenCalledWith(validArguments.role);
      expect(RolePromptFormatter.formatForConsole).toHaveBeenCalledWith(mockRole, validArguments.context);
      expect(RolePromptFormatter.formatOutputToJson).toHaveBeenCalledWith(mockUseCaseResult.data);
      expect(response).toEqual({
        content: [{
          type: "text",
          text: mockFormattedJson
        }]
      });
      expect(response.isError).toBeUndefined();
    });

    it('should handle rolePrompt tool call with invalid input', async () => {
      const invalidArguments = { role: 123, context: 'design system' };
      const mockValidationError = new Error('Invalid input: role must be a string');
      const mockFormattedErrorJson = '{"error":"Invalid input: role must be a string","status":"failed"}';

      // Set up mock to throw validation error
      (rolePromptSchemas.validateRolePromptData as any).mockImplementation(() => {
        throw mockValidationError;
      });
      (RolePromptFormatter.formatOutputToJson as any).mockReturnValue(mockFormattedErrorJson);

      const request = { params: { name: 'rolePrompt', arguments: invalidArguments } };
      const response = await callToolHandler(request); // Call the extracted handler

      expect(rolePromptSchemas.validateRolePromptData).toHaveBeenCalledWith(invalidArguments);
      expect(mockProcessRolePromptUseCase.execute).not.toHaveBeenCalled();
      expect(RolePromptFormatter.formatOutputToJson).toHaveBeenCalledWith({
        error: mockValidationError.message,
        status: 'failed'
      });
      expect(response).toEqual({
        content: [{
          type: "text",
          text: mockFormattedErrorJson
        }],
        isError: true
      });
    });

    it('should handle rolePrompt tool call with use case error', async () => {
      const validArguments = { role: 'architect', context: 'design system' };
      const mockUseCaseError = { error: { error: 'Use case failed' }, status: 'failed' };
      const mockFormattedErrorJson = '{"error":"Use case failed","status":"failed"}';

      // Set up mock to return a use case error
      (rolePromptSchemas.validateRolePromptData as any).mockReturnValue(validArguments);
      (mockProcessRolePromptUseCase.execute as any).mockResolvedValue({ error: mockUseCaseError });
      (RolePromptFormatter.formatOutputToJson as any).mockReturnValue(mockFormattedErrorJson);


      const request = { params: { name: 'rolePrompt', arguments: validArguments } };
      const response = await callToolHandler(request); // Call the extracted handler

      expect(rolePromptSchemas.validateRolePromptData).toHaveBeenCalledWith(validArguments);
      expect(mockProcessRolePromptUseCase.execute).toHaveBeenCalledWith(validArguments);
      expect(RolePromptFormatter.formatOutputToJson).toHaveBeenCalledWith(mockUseCaseError);
      expect(response).toEqual({
        content: [{
          type: "text",
          text: mockFormattedErrorJson
        }],
        isError: true
      });
    });

    it('should handle unknown tool call', async () => {
      vi.clearAllMocks(); // Add this line

      const unknownToolArguments = { data: 'some data' };
      const mockFormattedErrorJson = '{"error":"Unknown tool: unknownTool","status":"failed"}';

      // Set up mock
      (RolePromptFormatter.formatOutputToJson as any).mockReturnValue(mockFormattedErrorJson);

      const request = { params: { name: 'unknownTool', arguments: unknownToolArguments } };
      const response = await callToolHandler(request); // Call the extracted handler

      expect(rolePromptSchemas.validateRolePromptData).not.toHaveBeenCalled();
      expect(mockProcessRolePromptUseCase.execute).not.toHaveBeenCalled();
      expect(RolePromptFormatter.formatOutputToJson).toHaveBeenCalledWith({
        error: 'Unknown tool: unknownTool',
        status: 'failed'
      });
      expect(response).toEqual({
        content: [{
          type: "text",
          text: mockFormattedErrorJson
        }],
        isError: true
      });
    });
  });
});
