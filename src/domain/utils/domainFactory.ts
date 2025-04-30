import { Role } from "../models/role.js";
import { RoleResponse } from "../models/roleResponse.js";
import { Scenario } from "../models/scenario.js";

/**
 * Factory for creating domain objects.
 * Provides a simplified interface for creating domain objects with default values.
 */
export class DomainFactory {
  /**
   * Creates a new Role instance.
   * @param params Role parameters
   * @returns A new Role instance
   */
  static createRole(params: {
    id: string;
    name: string;
    description: string;
    responsibilities: string[];
    expertise: string[];
  }): Role {
    return new Role(
      params.id,
      params.name,
      params.description,
      params.responsibilities,
      params.expertise
    );
  }

  /**
   * Creates a new Scenario instance.
   * @param params Scenario parameters
   * @returns A new Scenario instance
   */
  static createScenario(params: {
    id: string;
    title: string;
    description: string;
    category: string;
    complexity: 'low' | 'medium' | 'high';
    suggestedRoles: string[];
  }): Scenario {
    return new Scenario(
      params.id,
      params.title,
      params.description,
      params.category,
      params.complexity,
      params.suggestedRoles
    );
  }

  /**
   * Creates a new RoleResponse instance.
   * @param params RoleResponse parameters
   * @returns A new RoleResponse instance
   */
  static createRoleResponse(params: {
    roleId: string;
    roleName: string;
    context: string;
    analysis: string;
    recommendations: string[];
    nextSteps?: string[];
    codeExamples?: string[];
  }): RoleResponse {
    return new RoleResponse(
      params.roleId,
      params.roleName,
      params.context,
      params.analysis,
      params.recommendations,
      params.nextSteps || [],
      params.codeExamples || []
    );
  }
}
