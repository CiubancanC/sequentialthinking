/**
 * Base application error class.
 */
export declare class AppError extends Error {
    readonly message: string;
    readonly code: string;
    readonly status: number;
    /**
     * Creates a new AppError instance.
     * @param message The error message
     * @param code The error code
     * @param status The HTTP status code
     */
    constructor(message: string, code?: string, status?: number);
    /**
     * Converts the error to a JSON-serializable object.
     * @returns A plain object representation of the error
     */
    toJSON(): Record<string, unknown>;
}
/**
 * Error thrown when validation fails.
 */
export declare class ValidationError extends AppError {
    /**
     * Creates a new ValidationError instance.
     * @param message The error message
     */
    constructor(message: string);
}
/**
 * Error thrown when a resource is not found.
 */
export declare class NotFoundError extends AppError {
    /**
     * Creates a new NotFoundError instance.
     * @param entity The entity type that was not found
     * @param id The ID of the entity that was not found
     */
    constructor(entity: string, id: string);
}
/**
 * Creates an error response object.
 * @param error The error to convert
 * @returns An error response object
 */
export declare function createErrorResponse(error: unknown): {
    error: string;
    status: 'failed';
};
