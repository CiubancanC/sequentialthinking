/**
 * Worker module for processing Gemini API requests in a separate thread.
 * This file is loaded by the WorkerThreadService to process requests in parallel.
 */
import { GeminiApiClient } from './geminiApiClient.js';

/**
 * Generates an enhanced response using the Gemini API.
 * @param {Object} options Options for generating the enhanced response
 * @param {string} options.roleName The role name
 * @param {string} options.context The context or problem to address
 * @param {string} options.originalPrompt The original prompt
 * @returns {Promise<string>} The enhanced response
 */
export async function generateEnhancedResponse(options) {
  const geminiClient = new GeminiApiClient();
  
  // Create a prompt for Gemini that includes the role context and original prompt
  const geminiPrompt = createGeminiPrompt(options);
  
  // Generate the response using Gemini with optimized parameters for detailed responses
  const response = await geminiClient.generateText(geminiPrompt, {
    maxTokens: 2048,
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxRetries: 3,
    retryDelay: 1000
  });
  
  return response;
}

/**
 * Creates a prompt for Gemini based on the role and context.
 * @param {Object} options Options for generating the enhanced response
 * @param {string} options.roleName The role name
 * @param {string} options.context The context or problem to address
 * @param {string} options.originalPrompt The original prompt
 * @returns {string} The Gemini prompt
 */
function createGeminiPrompt(options) {
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
