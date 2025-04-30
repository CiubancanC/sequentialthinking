/**
 * Re-export all dependency injection components.
 */
export * from './types.js';
export * from './container.js';

import { DIContainerImpl } from './container.js';

/**
 * The global container instance.
 * This is the main entry point for the dependency injection system.
 */
export const container = new DIContainerImpl();
