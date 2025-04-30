/**
 * Application configuration.
 * This file contains centralized configuration values for the application.
 */
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
  },


};
