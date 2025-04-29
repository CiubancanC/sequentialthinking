#!/usr/bin/env node
import { main } from './infrastructure/server/index.js';
// Start the server with error handling
try {
    console.error("Starting Fidora Server from index.ts with hot reloading enabled!");
    main();
}
catch (error) {
    console.error("Fatal error in index.ts:", error);
    process.exit(1);
}
//# sourceMappingURL=index.js.map