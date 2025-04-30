/**
 * Application configuration.
 * This file contains centralized configuration values for the application.
 */
import { roleData, scenarioData, roleAliases } from './roleData.js';

export const config = {
  /**
   * Server configuration.
   */
  server: {
    /**
     * The name of the server.
     */
    name: "fidora-server",

    /**
     * The version of the server.
     */
    version: "1.0.0",
  },

  /**
   * Logging configuration.
   */
  logging: {
    /**
     * Whether to enable debug logging.
     */
    debug: process.env.DEBUG === "true",

    /**
     * Whether to enable colorized output.
     */
    colorize: true,

    /**
     * Whether to log timestamps.
     */
    timestamps: true,

    /**
     * Minimum log level to display.
     */
    minLevel: process.env.LOG_LEVEL || 'INFO'
  },

  /**
   * AI model configuration.
   */
  ai: {
    /**
     * Whether to use Gemini for enhanced responses.
     */
    useGemini: process.env.USE_GEMINI === "true",

    /**
     * Gemini model configuration.
     */
    gemini: {
      /**
       * The model to use.
       */
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash-preview-04-17",

      /**
       * The maximum number of tokens to generate.
       */
      maxTokens: parseInt(process.env.GEMINI_MAX_TOKENS || "2048"),

      /**
       * The temperature for text generation (0.0 to 1.0).
       */
      temperature: parseFloat(process.env.GEMINI_TEMPERATURE || "0.7"),

      /**
       * The top-k value for sampling.
       */
      topK: parseInt(process.env.GEMINI_TOP_K || "40"),

      /**
       * The top-p value for sampling.
       */
      topP: parseFloat(process.env.GEMINI_TOP_P || "0.95"),

      /**
       * The maximum number of retries for failed requests.
       */
      maxRetries: parseInt(process.env.GEMINI_MAX_RETRIES || "3"),

      /**
       * The base delay in milliseconds between retries.
       */
      retryDelay: parseInt(process.env.GEMINI_RETRY_DELAY || "1000")
    }
  },

  /**
   * Worker thread configuration.
   */
  workerThreads: {
    /**
     * The minimum number of worker threads to keep alive.
     */
    minThreads: parseInt(process.env.MIN_WORKER_THREADS || "2"),

    /**
     * The maximum number of worker threads to create.
     */
    maxThreads: parseInt(process.env.MAX_WORKER_THREADS || "8"),

    /**
     * The maximum number of tasks to queue before rejecting new tasks.
     */
    maxQueue: parseInt(process.env.MAX_WORKER_QUEUE || "100"),

    /**
     * The idle timeout in milliseconds before a worker thread is terminated.
     */
    idleTimeout: parseInt(process.env.WORKER_IDLE_TIMEOUT || "60000")
  },

  /**
   * Role configuration.
   */
  roles: {
    /**
     * Default role to use when no appropriate role is found.
     */
    defaultRole: "architect",
  },

  /**
   * Role keywords for automatic role selection.
   */
  roleKeywords: {
    'architect': [
      'architecture', 'design', 'system', 'structure', 'scalable',
      'microservice', 'infrastructure', 'solution', 'framework', 'blueprint'
    ],
    'senior-developer': [
      'code', 'implement', 'develop', 'programming', 'function',
      'class', 'method', 'algorithm', 'feature', 'library', 'api'
    ],
    'qa-engineer': [
      'test', 'quality', 'bug', 'issue', 'verify', 'validation',
      'testing', 'qa', 'quality assurance', 'regression', 'defect'
    ],
    'devops-engineer': [
      'deploy', 'pipeline', 'ci/cd', 'infrastructure', 'container',
      'docker', 'kubernetes', 'automation', 'devops', 'jenkins', 'terraform'
    ],
    'security-engineer': [
      'security', 'vulnerability', 'threat', 'risk', 'compliance',
      'authentication', 'authorization', 'encryption', 'firewall', 'penetration'
    ],
    'data-scientist': [
      'data', 'analytics', 'machine learning', 'ai', 'model',
      'prediction', 'statistics', 'dataset', 'algorithm', 'neural network', 'classification'
    ],
    'ux-designer': [
      'user experience', 'ui', 'ux', 'interface', 'usability',
      'wireframe', 'prototype', 'user research', 'accessibility', 'design system'
    ],
    'product-manager': [
      'product', 'roadmap', 'feature', 'requirement', 'user story',
      'backlog', 'prioritization', 'market', 'customer', 'stakeholder'
    ]
  }
};

// Export role data for easy access
export { roleData, scenarioData, roleAliases };
