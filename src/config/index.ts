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
      model: "gemini-2.5-flash-preview-04-17",

      /**
       * The maximum number of tokens to generate.
       */
      maxTokens: 1024,

      /**
       * The temperature for text generation (0.0 to 1.0).
       */
      temperature: 0.4,

      /**
       * The top-k value for sampling.
       */
      topK: 40,

      /**
       * The top-p value for sampling.
       */
      topP: 0.95
    }
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
