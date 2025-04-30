#!/usr/bin/env node

import { runServer } from './server.js';
import { Logger } from '../../utils/logger.js';

/**
 * Entry point for the Fidora server.
 * Starts the server and handles any fatal errors.
 */
export function main(): void {
  Logger.info("Fidora Server: Starting main function");
  try {
    runServer().catch((error) => {
      Logger.error("Fatal error running server:", Logger.formatError(error));
      process.exit(1);
    });
  } catch (error) {
    Logger.error("Unexpected error in main function:", Logger.formatError(error));
    process.exit(1);
  }
}

// If this file is run directly, start the server
// In ES modules, we can check if this is the main module by comparing import.meta.url
// against the process.argv[1] converted to URL format
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
