/**
 * Application configuration.
 * This file contains configuration values for the application.
 */
export const config = {
  /**
   * Server configuration.
   */
  server: {
    /**
     * The name of the server.
     */
    name: "hello-world-server",

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
};

export default config;
