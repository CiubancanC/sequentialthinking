import { DIContainer, Factory, Lifetime, RegistrationOptions } from './types.js';

/**
 * Registration entry in the container.
 */
interface Registration<T> {
  factory: Factory<T>;
  lifetime: Lifetime;
  instance?: T;
}

/**
 * Implementation of the dependency injection container.
 */
export class DIContainerImpl implements DIContainer {
  private registrations = new Map<string, Registration<any>>();

  /**
   * Registers a dependency with the container.
   * @param token The token to register the dependency under
   * @param factory The factory function to create the dependency
   * @param options Registration options
   */
  register<T>(token: string, factory: Factory<T>, options: RegistrationOptions = {}): void {
    const lifetime = options.lifetime || Lifetime.SINGLETON;
    
    this.registrations.set(token, {
      factory,
      lifetime
    });
  }

  /**
   * Resolves a dependency from the container.
   * @param token The token to resolve
   * @returns The resolved dependency
   * @throws Error if the dependency is not registered
   */
  resolve<T>(token: string): T {
    const registration = this.registrations.get(token);
    
    if (!registration) {
      throw new Error(`Dependency not registered: ${token}`);
    }
    
    // For singletons, create once and reuse
    if (registration.lifetime === Lifetime.SINGLETON) {
      if (!registration.instance) {
        registration.instance = registration.factory(this);
      }
      return registration.instance;
    }
    
    // For transient, create a new instance each time
    return registration.factory(this);
  }

  /**
   * Checks if a dependency is registered with the container.
   * @param token The token to check
   * @returns True if the dependency is registered, false otherwise
   */
  has(token: string): boolean {
    return this.registrations.has(token);
  }

  /**
   * Clears all registrations from the container.
   * Useful for testing.
   */
  clear(): void {
    this.registrations.clear();
  }
}
