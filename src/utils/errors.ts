/**
 * Base application error class.
 */
export class AppError extends Error {
  /**
   * Creates a new AppError instance.
   * @param message The error message
   * @param code The error code
   * @param status The HTTP status code
   */
  constructor(
    public readonly message: string,
    public readonly code: string = 'INTERNAL_ERROR',
    public readonly status: number = 500
  ) {
    super(message);
    this.name = 'AppError';
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, AppError.prototype);
  }

  /**
   * Converts the error to a JSON-serializable object.
   * @returns A plain object representation of the error
   */
  toJSON(): Record<string, unknown> {
    return {
      error: this.message,
      code: this.code,
      status: 'failed'
    };
  }
}

/**
 * Error thrown when validation fails.
 */
export class ValidationError extends AppError {
  /**
   * Creates a new ValidationError instance.
   * @param message The error message
   */
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Error thrown when a resource is not found.
 */
export class NotFoundError extends AppError {
  /**
   * Creates a new NotFoundError instance.
   * @param entity The entity type that was not found
   * @param id The ID of the entity that was not found
   */
  constructor(entity: string, id: string) {
    super(`${entity} not found: ${id}`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Creates an error response object.
 * @param error The error to convert
 * @returns An error response object
 */
export function createErrorResponse(error: unknown): { error: string; status: 'failed' } {
  if (error instanceof AppError) {
    return error.toJSON() as { error: string; status: 'failed' };
  }
  
  return {
    error: error instanceof Error ? error.message : String(error),
    status: 'failed'
  };
}
