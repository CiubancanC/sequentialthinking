#!/usr/bin/env node

import { main } from './infrastructure/server/index.js';
import { Logger } from './utils/logger.js';

// Start the server with error handling
try {
  Logger.info("Starting Fidora Server");
  main();
} catch (error) {
  Logger.error("Fatal error in index.ts:", Logger.formatError(error));
  process.exit(1);
}
