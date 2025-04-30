import { describe, it, expect, beforeEach } from 'vitest';
import { DIContainerImpl, Lifetime } from '../../../src/infrastructure/di/index.js';

describe('DIContainer', () => {
  let container: DIContainerImpl;

  beforeEach(() => {
    container = new DIContainerImpl();
  });

  describe('register and resolve', () => {
    it('should register and resolve a singleton dependency', () => {
      // Arrange
      const token = 'testToken';
      let counter = 0;
      const factory = () => {
        counter++;
        return { value: counter };
      };

      // Act
      container.register(token, factory, { lifetime: Lifetime.SINGLETON });
      const instance1 = container.resolve(token);
      const instance2 = container.resolve(token);

      // Assert
      expect(instance1).toBe(instance2); // Same instance
      expect(instance1.value).toBe(1);
      expect(instance2.value).toBe(1);
      expect(counter).toBe(1); // Factory called only once
    });

    it('should register and resolve a transient dependency', () => {
      // Arrange
      const token = 'testToken';
      let counter = 0;
      const factory = () => {
        counter++;
        return { value: counter };
      };

      // Act
      container.register(token, factory, { lifetime: Lifetime.TRANSIENT });
      const instance1 = container.resolve(token);
      const instance2 = container.resolve(token);

      // Assert
      expect(instance1).not.toBe(instance2); // Different instances
      expect(instance1.value).toBe(1);
      expect(instance2.value).toBe(2);
      expect(counter).toBe(2); // Factory called twice
    });

    it('should use singleton lifetime by default', () => {
      // Arrange
      const token = 'testToken';
      let counter = 0;
      const factory = () => {
        counter++;
        return { value: counter };
      };

      // Act
      container.register(token, factory); // No lifetime specified
      const instance1 = container.resolve(token);
      const instance2 = container.resolve(token);

      // Assert
      expect(instance1).toBe(instance2); // Same instance
      expect(counter).toBe(1); // Factory called only once
    });

    it('should throw an error when resolving an unregistered dependency', () => {
      // Act & Assert
      expect(() => container.resolve('nonExistentToken')).toThrow('Dependency not registered');
    });
  });

  describe('has', () => {
    it('should return true for registered dependencies', () => {
      // Arrange
      const token = 'testToken';
      container.register(token, () => ({}));

      // Act & Assert
      expect(container.has(token)).toBe(true);
    });

    it('should return false for unregistered dependencies', () => {
      // Act & Assert
      expect(container.has('nonExistentToken')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear all registrations', () => {
      // Arrange
      const token1 = 'token1';
      const token2 = 'token2';
      container.register(token1, () => ({}));
      container.register(token2, () => ({}));
      expect(container.has(token1)).toBe(true);
      expect(container.has(token2)).toBe(true);

      // Act
      container.clear();

      // Assert
      expect(container.has(token1)).toBe(false);
      expect(container.has(token2)).toBe(false);
    });
  });

  describe('dependency resolution', () => {
    it('should resolve dependencies that depend on other dependencies', () => {
      // Arrange
      const tokenA = 'serviceA';
      const tokenB = 'serviceB';
      const tokenC = 'serviceC';

      // Register dependencies
      container.register(tokenA, () => ({ name: 'A' }));
      container.register(tokenB, (c) => {
        const a = c.resolve(tokenA);
        return { name: 'B', dependsOn: a };
      });
      container.register(tokenC, (c) => {
        const b = c.resolve(tokenB);
        return { name: 'C', dependsOn: b };
      });

      // Act
      const serviceC = container.resolve(tokenC);

      // Assert
      expect(serviceC.name).toBe('C');
      expect(serviceC.dependsOn.name).toBe('B');
      expect(serviceC.dependsOn.dependsOn.name).toBe('A');
    });
  });
});
