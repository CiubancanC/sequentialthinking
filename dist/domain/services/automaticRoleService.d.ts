import { IRoleRepository } from "../interfaces/roleInterfaces.js";
import { Role } from "../models/role.js";
import { Scenario } from "../models/scenario.js";
/**
 * Interface for the automatic role selection service.
 */
export interface IAutomaticRoleService {
    /**
     * Automatically selects the most appropriate role based on the context.
     * @param context The context or problem description
     * @returns The selected role, or null if no appropriate role is found
     */
    selectRoleForContext(context: string): Promise<Role | null>;
    /**
     * Automatically selects the most appropriate scenario based on the context.
     * @param context The context or problem description
     * @returns The selected scenario, or null if no appropriate scenario is found
     */
    selectScenarioForContext(context: string): Promise<Scenario | null>;
    /**
     * Automatically selects the most appropriate role for a given scenario.
     * @param scenarioId The ID of the scenario
     * @returns The selected role, or null if no appropriate role is found
     */
    selectRoleForScenario(scenarioId: string): Promise<Role | null>;
}
/**
 * Implementation of the automatic role selection service.
 * This service analyzes context and automatically selects appropriate roles and scenarios.
 */
export declare class AutomaticRoleServiceImpl implements IAutomaticRoleService {
    private readonly repository;
    /**
     * Creates a new AutomaticRoleServiceImpl instance.
     * @param repository The role repository to use
     */
    constructor(repository: IRoleRepository);
    /**
     * Automatically selects the most appropriate role based on the context.
     * @param context The context or problem description
     * @returns The selected role, or a default role if no appropriate role is found
     */
    selectRoleForContext(context: string): Promise<Role | null>;
    /**
     * Automatically selects the most appropriate scenario based on the context.
     * @param context The context or problem description
     * @returns The selected scenario, or null if no appropriate scenario is found
     */
    selectScenarioForContext(context: string): Promise<Scenario | null>;
    /**
     * Automatically selects the most appropriate role for a given scenario.
     * @param scenarioId The ID of the scenario
     * @returns The selected role, or a default role if no appropriate role is found
     */
    selectRoleForScenario(scenarioId: string): Promise<Role | null>;
}
