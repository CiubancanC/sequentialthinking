#!/usr/bin/env node

import { runServer } from './server.js';

/**
 * Entry point for the CEOMCP server.
 * Starts the server and handles any fatal errors.
 */
export function main(): void {
  runServer().catch((error) => {
    console.error("Fatal error running server:", error);
    process.exit(1);
  });
}

// If this file is run directly, start the server
if (require.main === module) {
  main();
}
