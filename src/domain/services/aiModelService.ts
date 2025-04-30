/**
 * Implementation of the AI model service.
 * This service provides methods for generating enhanced responses using AI models.
 */
import { Logger } from '../../utils/logger.js';
import { config } from '../../config/index.js';
import { EnhancedResponseOptions, IAiModelService } from '../interfaces/aiModelInterfaces.js';
import { GeminiApiClient } from '../../infrastructure/services/geminiApiClient.js';

/**
 * Implementation of the AI model service using Gemini.
 */
export class AiModelServiceImpl implements IAiModelService {
  /**
   * Creates a new AiModelServiceImpl instance.
   * @param geminiClient The Gemini API client
   */
  constructor(private readonly geminiClient: GeminiApiClient) {}
  
  /**
   * Checks if the AI model service is available.
   * @returns True if the service is available, false otherwise
   */
  isAvailable(): boolean {
    return config.ai.useGemini && !!process.env.GOOGLE_API_KEY;
  }
  
  /**
   * Generates an enhanced response using the Gemini model.
   * @param options Options for generating the enhanced response
   * @returns The enhanced response
   * @throws Error if the service is not available
   */
  async generateEnhancedResponse(options: EnhancedResponseOptions): Promise<string> {
    if (!this.isAvailable()) {
      throw new Error('AI model service is not available. Check your configuration and API key.');
    }
    
    try {
      Logger.debug(`Generating enhanced response for role: ${options.roleName}`);
      
      // Create a prompt for Gemini that includes the role context and original prompt
      const geminiPrompt = this.createGeminiPrompt(options);
      
      // Generate the response using Gemini
      const response = await this.geminiClient.generateText(geminiPrompt, {
        maxTokens: config.ai.gemini.maxTokens,
        temperature: config.ai.gemini.temperature,
        topK: config.ai.gemini.topK,
        topP: config.ai.gemini.topP
      });
      
      return response;
    } catch (error) {
      Logger.error('Error generating enhanced response:', Logger.formatError(error));
      throw error;
    }
  }
  
  /**
   * Creates a prompt for Gemini based on the role and context.
   * @param options Options for generating the enhanced response
   * @returns The Gemini prompt
   */
  private createGeminiPrompt(options: EnhancedResponseOptions): string {
    return `You are a senior ${options.roleName} providing expert guidance on the following task:

TASK: ${options.context}

You were given this prompt:
"""
${options.originalPrompt}
"""

Provide a comprehensive, expert-level response that demonstrates your deep knowledge as a ${options.roleName}. 
Your response should include:

1. A detailed analysis of the problem
2. Specific, actionable recommendations
3. Clear next steps to implement the solution
4. Relevant examples or code snippets where appropriate

Focus on being precise, technically accurate, and providing practical guidance that can be immediately implemented.`;
  }
}
