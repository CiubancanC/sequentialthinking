/**
 * Entry point for the API documentation server.
 */
import { startSwaggerServer } from './swagger.js';
import { Logger } from '../../utils/logger.js';

/**
 * Main function to start the documentation server.
 */
export function main(): void {
  try {
    // Default port is 3000, but can be overridden with the PORT environment variable
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    startSwaggerServer(port);
  } catch (error) {
    Logger.error('Error starting documentation server:', Logger.formatError(error));
    process.exit(1);
  }
}

// If this file is run directly, start the server
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
