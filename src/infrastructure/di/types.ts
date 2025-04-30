/**
 * Type definitions for the dependency injection system.
 */

/**
 * Lifetime options for registered dependencies.
 */
export enum Lifetime {
  /**
   * A new instance is created each time the dependency is resolved.
   */
  TRANSIENT = 'transient',
  
  /**
   * A single instance is created and reused for all resolutions.
   */
  SINGLETON = 'singleton'
}

/**
 * Factory function for creating a dependency.
 */
export type Factory<T> = (container: DIContainer) => T;

/**
 * Registration options for dependencies.
 */
export interface RegistrationOptions {
  /**
   * The lifetime of the dependency.
   * @default Lifetime.SINGLETON
   */
  lifetime?: Lifetime;
}

/**
 * Interface for the dependency injection container.
 */
export interface DIContainer {
  /**
   * Registers a dependency with the container.
   * @param token The token to register the dependency under
   * @param factory The factory function to create the dependency
   * @param options Registration options
   */
  register<T>(token: string, factory: Factory<T>, options?: RegistrationOptions): void;
  
  /**
   * Resolves a dependency from the container.
   * @param token The token to resolve
   * @returns The resolved dependency
   * @throws Error if the dependency is not registered
   */
  resolve<T>(token: string): T;
  
  /**
   * Checks if a dependency is registered with the container.
   * @param token The token to check
   * @returns True if the dependency is registered, false otherwise
   */
  has(token: string): boolean;
}
