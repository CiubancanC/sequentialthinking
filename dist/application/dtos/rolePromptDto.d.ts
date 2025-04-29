/**
 * Data Transfer Object for role prompt requests.
 */
export interface RolePromptRequestDto {
    /**
     * The name of the role to adopt.
     */
    role: string;
    /**
     * The context or problem description for the role to address.
     */
    context: string;
    /**
     * Optional scenario ID to use for additional context.
     */
    scenarioId?: string;
}
/**
 * Data Transfer Object for role prompt responses.
 */
export interface RolePromptResponseDto {
    /**
     * The role prompt generated for the AI.
     */
    rolePrompt: string;
    /**
     * The name of the role.
     */
    roleName: string;
    /**
     * Recommendations provided by the role.
     */
    recommendations?: string[];
    /**
     * Next steps suggested by the role.
     */
    nextSteps?: string[];
    /**
     * Testing approach (for QA engineer role).
     */
    testingApproach?: string[];
    /**
     * Risk assessment (for QA engineer role).
     */
    riskAssessment?: string[];
    /**
     * Architecture components (for architect role).
     */
    architectureComponents?: string[];
    /**
     * Code examples (for developer role).
     */
    codeExamples?: string[];
    /**
     * Security controls (for security engineer role).
     */
    securityControls?: string[];
    /**
     * Analytical approach (for data scientist role).
     */
    analyticalApproach?: string[];
    /**
     * Design principles (for UX designer role).
     */
    designPrinciples?: string[];
    /**
     * Product strategy (for product manager role).
     */
    productStrategy?: string[];
    /**
     * Error message if the request failed.
     */
    error?: string;
    /**
     * Status of the response.
     */
    status: 'success' | 'failed';
}
