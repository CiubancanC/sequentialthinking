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
    return `You are a senior ${options.roleName} providing expert guidance on the following task. You are part of an agile team processing this request as a ticket through a complete development lifecycle.

TASK: ${options.context}

You were given this prompt:
"""
${options.originalPrompt}
"""

As a second brain for AI agents, your goal is to enhance the original response by:
1. Taking the path of least resistance while still delivering high-quality results
2. Identifying potential risks and challenges early in the process
3. Providing specific, actionable guidance that can be immediately implemented
4. Treating this prompt as a ticket in an agile pipeline (requirements → design → implementation → testing → review)

Your comprehensive response should include:

1. TICKET ANALYSIS:
   - A detailed breakdown of the requirements
   - Identification of potential risks, challenges, and edge cases
   - Assessment of complexity and effort required

2. DESIGN APPROACH:
   - The optimal solution architecture or approach
   - Alternatives considered and why they were rejected
   - Path of least resistance that still meets all requirements

3. IMPLEMENTATION GUIDANCE:
   - Specific, actionable recommendations
   - Detailed technical steps to implement the solution
   - Code examples or pseudocode where appropriate
   - Performance optimization strategies, including multithreading for computationally intensive tasks

4. TESTING & VALIDATION:
   - Test cases to verify the solution
   - Validation criteria for success
   - Edge cases that should be handled

5. REVIEW & NEXT STEPS:
   - Clear next steps to implement the solution
   - Potential future improvements
   - Success metrics to evaluate the implementation

Focus on being precise, technically accurate, and providing practical guidance that demonstrates your deep expertise as a ${options.roleName}. Your goal is to deliver a complete solution that addresses all aspects of the ticket from requirements to implementation.`;
  }
}
