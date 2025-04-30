/**
 * Interfaces for application use cases.
 */
import { RolePromptRequestDto, RolePromptResponseDto } from "../dtos/rolePromptDto.js";

/**
 * Result of processing a role prompt.
 */
export type ProcessRolePromptResult = {
  data?: RolePromptResponseDto;
  error?: {
    error: string;
    status: 'failed';
  };
};

/**
 * Interface for the process role prompt use case.
 */
export interface IProcessRolePromptUseCase {
  /**
   * Executes the use case.
   * @param input The role prompt request
   * @returns The result of processing the role prompt
   */
  execute(input: RolePromptRequestDto): Promise<ProcessRolePromptResult>;
}
