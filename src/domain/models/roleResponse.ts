import { IRoleResponse } from "../interfaces/domainTypes.js";
import { combineValidationErrors, throwIfInvalid, validateNonEmptyArray, validateRequired } from "../utils/validation.js";

/**
 * Represents a response generated by a role-based prompt.
 * Contains the structured output from the role's analysis.
 */
export class RoleResponse implements IRoleResponse {
  /**
   * Creates a new RoleResponse instance.
   * @param roleId ID of the role that generated the response
   * @param roleName Name of the role that generated the response
   * @param context The context or problem that was addressed
   * @param analysis The detailed analysis provided by the role
   * @param recommendations Key recommendations from the role
   * @param nextSteps Suggested next steps to take
   * @param codeExamples Code examples provided by the role
   * @throws Error if any required fields are missing or invalid
   */
  constructor(
    public readonly roleId: string,
    public readonly roleName: string,
    public readonly context: string,
    public readonly analysis: string,
    public readonly recommendations: readonly string[],
    public readonly nextSteps: readonly string[] = [],
    public readonly codeExamples: readonly string[] = []
  ) {
    const validationResult = combineValidationErrors([
      validateRequired(roleId, 'roleId'),
      validateRequired(roleName, 'roleName'),
      validateRequired(context, 'context'),
      validateRequired(analysis, 'analysis'),
      validateNonEmptyArray(recommendations as string[], 'recommendations')
    ]);

    throwIfInvalid(validationResult);
  }

  /**
   * Creates a new RoleResponse instance.
   * @param roleId ID of the role that generated the response
   * @param roleName Name of the role that generated the response
   * @param context The context or problem that was addressed
   * @param analysis The detailed analysis provided by the role
   * @param recommendations Key recommendations from the role
   * @param nextSteps Suggested next steps to take
   * @param codeExamples Code examples provided by the role
   * @returns A new RoleResponse instance
   */
  public static create(
    roleId: string,
    roleName: string,
    context: string,
    analysis: string,
    recommendations: string[],
    nextSteps: string[] = [],
    codeExamples: string[] = []
  ): RoleResponse {
    return new RoleResponse(
      roleId,
      roleName,
      context,
      analysis,
      recommendations,
      nextSteps,
      codeExamples
    );
  }

  /**
   * Converts the response to a JSON-serializable object.
   * @returns A plain object representation of the response
   */
  public toJSON(): Record<string, unknown> {
    return {
      roleId: this.roleId,
      roleName: this.roleName,
      context: this.context,
      analysis: this.analysis,
      recommendations: this.recommendations,
      nextSteps: this.nextSteps,
      codeExamples: this.codeExamples
    };
  }
}
