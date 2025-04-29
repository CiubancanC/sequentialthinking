/**
 * Validates the input data for a role prompt request.
 * @param data The data to validate
 * @returns The validated data
 * @throws Error if the data is invalid
 */
export function validateRolePromptData(data) {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid input: expected an object');
    }
    const input = data;
    // Validate role
    if (!input.role || typeof input.role !== 'string') {
        throw new Error('Invalid input: role must be a non-empty string');
    }
    // Validate context
    if (!input.context || typeof input.context !== 'string') {
        throw new Error('Invalid input: context must be a non-empty string');
    }
    // Validate optional scenarioId
    if (input.scenarioId !== undefined && (typeof input.scenarioId !== 'string' || input.scenarioId === '')) {
        throw new Error('Invalid input: scenarioId must be a non-empty string if provided');
    }
    return {
        role: input.role,
        context: input.context,
        scenarioId: input.scenarioId
    };
}
//# sourceMappingURL=rolePromptSchemas.js.map