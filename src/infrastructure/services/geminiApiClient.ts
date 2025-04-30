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

  /**
   * The maximum number of retries for failed requests.
   */
  maxRetries?: number;

  /**
   * The base delay in milliseconds between retries.
   * Actual delay will be this value multiplied by the retry attempt number.
   */
  retryDelay?: number;
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

    // Use the latest Gemini model available
    // The model can be configured via environment variable or defaults to the latest
    this.defaultModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash-preview-04-17';

    if (!this.apiKey) {
      Logger.warn('GOOGLE_API_KEY environment variable is not set. Gemini API will not work.');
    } else {
      Logger.info(`GeminiApiClient initialized with model: ${this.defaultModel}`);
    }
  }

  /**
   * Generates text using the Gemini API.
   * @param prompt The prompt to generate text from
   * @param options Options for text generation
   * @returns The generated text
   * @throws Error if the API request fails after retries
   */
  async generateText(prompt: string, options: GeminiGenerateOptions = {}): Promise<string> {
    if (!this.apiKey) {
      throw new Error('GOOGLE_API_KEY environment variable is not set. Cannot use Gemini API.');
    }

    // Set up retry parameters
    const maxRetries = options.maxRetries || 3;
    const retryDelay = options.retryDelay || 1000; // ms
    let retryCount = 0;

    while (true) {
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
            maxOutputTokens: options.maxTokens || 2048, // Increased from 1024 for more detailed responses
            temperature: options.temperature || 0.7,    // Increased from 0.4 for more creative responses
            topK: options.topK || 40,
            topP: options.topP || 0.95
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH"
            }
          ]
        };

        Logger.debug(`Sending request to Gemini API (model: ${model})`);
        const startTime = Date.now();

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        const requestDuration = Date.now() - startTime;
        Logger.debug(`Gemini API request completed in ${requestDuration}ms`);

        if (!response.ok) {
          const errorText = await response.text();
          const errorMessage = `Gemini API request failed: ${response.status} ${response.statusText} - ${errorText}`;

          // Check if we should retry based on status code
          if (this.isRetryableError(response.status) && retryCount < maxRetries) {
            retryCount++;
            const waitTime = retryDelay * retryCount;
            Logger.warn(`${errorMessage} - Retrying in ${waitTime}ms (attempt ${retryCount}/${maxRetries})`);
            await this.delay(waitTime);
            continue;
          }

          throw new Error(errorMessage);
        }

        const data = await response.json() as GeminiResponse;

        // Check for safety blocks
        if (data.promptFeedback?.blockReason) {
          throw new Error(`Prompt was blocked by Gemini API: ${data.promptFeedback.blockReason}`);
        }

        // Check if we have valid candidates
        if (!data.candidates || data.candidates.length === 0) {
          if (retryCount < maxRetries) {
            retryCount++;
            const waitTime = retryDelay * retryCount;
            Logger.warn(`No candidates returned from Gemini API - Retrying in ${waitTime}ms (attempt ${retryCount}/${maxRetries})`);
            await this.delay(waitTime);
            continue;
          }
          throw new Error('No candidates returned from Gemini API after multiple attempts');
        }

        // Extract the generated text
        const generatedText = data.candidates[0].content.parts
          .map(part => part.text)
          .join('');

        Logger.debug(`Successfully generated text with Gemini API (${generatedText.length} characters)`);
        return generatedText;

      } catch (error) {
        // If we've exhausted our retries, or this is not a retryable error, throw
        if (retryCount >= maxRetries || !(error instanceof Error && this.isNetworkError(error))) {
          Logger.error('Error generating text with Gemini API:', Logger.formatError(error));
          throw error;
        }

        // Otherwise, retry
        retryCount++;
        const waitTime = retryDelay * retryCount;
        Logger.warn(`Network error with Gemini API - Retrying in ${waitTime}ms (attempt ${retryCount}/${maxRetries}): ${error.message}`);
        await this.delay(waitTime);
      }
    }
  }

  /**
   * Determines if an error is likely a network error that can be retried.
   * @param error The error to check
   * @returns True if the error is a network error, false otherwise
   */
  private isNetworkError(error: Error): boolean {
    return error.message.includes('network') ||
           error.message.includes('connection') ||
           error.message.includes('timeout') ||
           error.message.includes('ECONNRESET') ||
           error.message.includes('ETIMEDOUT');
  }

  /**
   * Determines if an HTTP status code is retryable.
   * @param statusCode The HTTP status code
   * @returns True if the status code is retryable, false otherwise
   */
  private isRetryableError(statusCode: number): boolean {
    // 429: Too Many Requests
    // 500, 502, 503, 504: Server errors
    return statusCode === 429 || (statusCode >= 500 && statusCode < 600);
  }

  /**
   * Delays execution for the specified number of milliseconds.
   * @param ms The number of milliseconds to delay
   * @returns A promise that resolves after the delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
