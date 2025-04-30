/**
 * Gemini API client for interacting with Google's Gemini models.
 * This service provides methods to generate text using the Gemini API.
 */
import { Logger } from '../../utils/logger.js';
import { config } from '../../config/index.js';

/**
 * Response from the Gemini API.
 */
interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
    finishReason: string;
  }[];
  promptFeedback?: {
    blockReason?: string;
    safetyRatings?: {
      category: string;
      probability: string;
    }[];
  };
}

/**
 * Options for generating text with Gemini.
 */
export interface GeminiGenerateOptions {
  /**
   * The maximum number of tokens to generate.
   */
  maxTokens?: number;
  
  /**
   * The temperature for text generation (0.0 to 1.0).
   * Lower values make output more focused and deterministic.
   * Higher values make output more creative and diverse.
   */
  temperature?: number;
  
  /**
   * The top-k value for sampling.
   */
  topK?: number;
  
  /**
   * The top-p value for sampling.
   */
  topP?: number;
}

/**
 * Client for interacting with the Gemini API.
 */
export class GeminiApiClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly defaultModel: string;
  
  /**
   * Creates a new GeminiApiClient.
   */
  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY || '';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
    this.defaultModel = 'gemini-2.5-flash-preview-04-17';
    
    if (!this.apiKey) {
      Logger.warn('GOOGLE_API_KEY environment variable is not set. Gemini API will not work.');
    }
  }
  
  /**
   * Generates text using the Gemini API.
   * @param prompt The prompt to generate text from
   * @param options Options for text generation
   * @returns The generated text
   * @throws Error if the API request fails
   */
  async generateText(prompt: string, options: GeminiGenerateOptions = {}): Promise<string> {
    if (!this.apiKey) {
      throw new Error('GOOGLE_API_KEY environment variable is not set. Cannot use Gemini API.');
    }
    
    try {
      const model = this.defaultModel;
      const url = `${this.baseUrl}/models/${model}:generateContent?key=${this.apiKey}`;
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: options.maxTokens || 1024,
          temperature: options.temperature || 0.4,
          topK: options.topK || 40,
          topP: options.topP || 0.95
        }
      };
      
      Logger.debug(`Sending request to Gemini API (model: ${model})`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      const data = await response.json() as GeminiResponse;
      
      // Check for safety blocks
      if (data.promptFeedback?.blockReason) {
        throw new Error(`Prompt was blocked by Gemini API: ${data.promptFeedback.blockReason}`);
      }
      
      // Check if we have valid candidates
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No candidates returned from Gemini API');
      }
      
      // Extract the generated text
      const generatedText = data.candidates[0].content.parts
        .map(part => part.text)
        .join('');
      
      return generatedText;
    } catch (error) {
      Logger.error('Error generating text with Gemini API:', Logger.formatError(error));
      throw error;
    }
  }
}
