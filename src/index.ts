#!/usr/bin/env node

// Import with basic error handling first
let main;
try {
  // Use dynamic import to avoid potential circular dependencies
  const serverModule = await import('./infrastructure/server/index.js');
  main = serverModule.main;

  // Now try to import the logger
  const { Logger } = await import('./utils/logger.js');

  // Start the server with error handling
  try {
    Logger.info("Starting Fidora Server");
    main();
  } catch (error) {
    Logger.error("Fatal error in index.ts:", Logger.formatError(error));
    process.exit(1);
  }
} catch (error) {
  // Fallback to basic console if Logger fails to load
  console.error("Critical error during startup:", error);

  // Try to run main if it was loaded
  if (main) {
    try {
      console.error("Attempting to start server without logger...");
      main();
    } catch (runError) {
      console.error("Fatal error running server:", runError);
      process.exit(1);
    }
  } else {
    console.error("Could not load server module. Exiting.");
    process.exit(1);
  }
}
