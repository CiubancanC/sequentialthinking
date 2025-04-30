/**
 * Interfaces for AI model integration.
 */

/**
 * Options for generating enhanced responses.
 */
export interface EnhancedResponseOptions {
  /**
   * The role name.
   */
  roleName: string;
  
  /**
   * The context or problem to address.
   */
  context: string;
  
  /**
   * The original prompt.
   */
  originalPrompt: string;
}

/**
 * Interface for AI model service.
 */
export interface IAiModelService {
  /**
   * Generates an enhanced response using an AI model.
   * @param options Options for generating the enhanced response
   * @returns The enhanced response
   */
  generateEnhancedResponse(options: EnhancedResponseOptions): Promise<string>;
  
  /**
   * Checks if the AI model service is available.
   * @returns True if the service is available, false otherwise
   */
  isAvailable(): boolean;
}
