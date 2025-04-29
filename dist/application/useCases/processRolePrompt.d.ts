import { IRoleService } from "../../domain/interfaces/roleInterfaces.js";
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
 * Use case for processing role prompts.
 */
export declare class ProcessRolePromptUseCase {
    private readonly roleService;
    /**
     * Creates a new ProcessRolePromptUseCase instance.
     * @param roleService The role service to use
     */
    constructor(roleService: IRoleService);
    /**
     * Executes the use case.
     * @param input The role prompt request
     * @returns The result of processing the role prompt
     */
    execute(input: RolePromptRequestDto): Promise<ProcessRolePromptResult>;
}
