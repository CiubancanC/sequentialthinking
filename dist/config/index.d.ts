/**
 * Application configuration.
 * This file contains centralized configuration values for the application.
 */
export declare const config: {
    /**
     * Server configuration.
     */
    server: {
        /**
         * The name of the server.
         */
        name: string;
        /**
         * The version of the server.
         */
        version: string;
    };
    /**
     * Logging configuration.
     */
    logging: {
        /**
         * Whether to enable debug logging.
         */
        debug: boolean;
        /**
         * Whether to enable colorized output.
         */
        colorize: boolean;
    };
    /**
     * Role configuration.
     */
    roles: {
        /**
         * Default role to use when no appropriate role is found.
         */
        defaultRole: string;
    };
    /**
     * Role keywords for automatic role selection.
     */
    roleKeywords: {
        architect: string[];
        'senior-developer': string[];
        'qa-engineer': string[];
        'devops-engineer': string[];
        'security-engineer': string[];
        'data-scientist': string[];
        'ux-designer': string[];
        'product-manager': string[];
    };
    /**
     * Sequential thinking configuration.
     */
    sequentialThinking: {
        /**
         * Maximum number of steps in a sequential thinking workflow.
         */
        maxSteps: number;
        /**
         * Role sequence for sequential thinking.
         */
        roleSequence: {
            architect: string;
            'senior-developer': string;
            'qa-engineer': string;
            'devops-engineer': string;
        };
    };
};
