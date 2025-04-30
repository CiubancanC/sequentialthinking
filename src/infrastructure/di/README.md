# Dependency Injection System

This directory contains a lightweight dependency injection (DI) system for the application.

## Purpose

The DI system provides:

- A centralized way to manage dependencies
- Decoupling of interfaces from implementations
- Easier testing through dependency substitution
- Support for different dependency lifetimes

## Usage

### Registering Dependencies

Dependencies are registered in the `registry.ts` file:

```typescript
// Register a singleton dependency
container.register<IRoleRepository>(
  DI_TOKENS.ROLE_REPOSITORY,
  () => new InMemoryRoleRepository(),
  { lifetime: Lifetime.SINGLETON }
);

// Register a dependency that depends on another
container.register<IRoleService>(
  DI_TOKENS.ROLE_SERVICE,
  (c) => new RoleServiceImpl(c.resolve(DI_TOKENS.ROLE_REPOSITORY)),
  { lifetime: Lifetime.SINGLETON }
);
```

### Resolving Dependencies

Dependencies can be resolved from the container:

```typescript
// Get the role service
const roleService = container.resolve<IRoleService>(DI_TOKENS.ROLE_SERVICE);
```

### Dependency Tokens

All dependency tokens are defined in `registry.ts` in the `DI_TOKENS` object:

```typescript
export const DI_TOKENS = {
  ROLE_REPOSITORY: 'roleRepository',
  ROLE_SERVICE: 'roleService',
  // ...
};
```

### Lifetimes

Dependencies can have different lifetimes:

- `Lifetime.SINGLETON`: A single instance is created and reused
- `Lifetime.TRANSIENT`: A new instance is created each time the dependency is resolved

## Testing

For testing, you can register mock implementations:

```typescript
// Clear existing registrations
container.clear();

// Register mock implementations
container.register<IRoleRepository>(
  DI_TOKENS.ROLE_REPOSITORY,
  () => mockRoleRepository
);
```
