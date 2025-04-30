import { ValidationError, ValidationResult } from "../interfaces/domainTypes.js";

/**
 * Validates that a string is not empty.
 * @param value The value to validate
 * @param fieldName The name of the field being validated
 * @returns A validation error if the value is invalid, null otherwise
 */
export function validateRequired(value: string | undefined | null, fieldName: string): ValidationError | null {
  if (!value || value.trim() === "") {
    return {
      field: fieldName,
      message: `${fieldName} is required`
    };
  }
  return null;
}

/**
 * Validates that an array is not empty.
 * @param value The array to validate
 * @param fieldName The name of the field being validated
 * @returns A validation error if the array is invalid, null otherwise
 */
export function validateNonEmptyArray<T>(value: T[] | undefined | null, fieldName: string): ValidationError | null {
  if (!value || value.length === 0) {
    return {
      field: fieldName,
      message: `${fieldName} must have at least one item`
    };
  }
  return null;
}

/**
 * Combines multiple validation errors into a validation result.
 * @param errors Array of potential validation errors (can include null values)
 * @returns A validation result object
 */
export function combineValidationErrors(errors: (ValidationError | null)[]): ValidationResult {
  const validationErrors = errors.filter((error): error is ValidationError => error !== null);
  
  return {
    valid: validationErrors.length === 0,
    errors: validationErrors
  };
}

/**
 * Throws an error if validation fails.
 * @param result The validation result
 * @throws Error with validation error messages if validation fails
 */
export function throwIfInvalid(result: ValidationResult): void {
  if (!result.valid) {
    const errorMessages = result.errors.map(error => `${error.field}: ${error.message}`).join(", ");
    throw new Error(errorMessages);
  }
}
