# Domain Layer

This directory contains the core business logic and entities of the application.

## Purpose

The Domain layer is the heart of the application and represents the business and its rules. It is independent of any external concerns and contains:

- **Models**: Core business entities and value objects
- **Interfaces**: Contracts that define how the domain interacts with other layers
- **Services**: Domain-specific business logic that operates on multiple entities

## Guidelines

- Domain code should have no dependencies on other layers
- Domain models should encapsulate business rules and validation
- Domain services should implement complex business logic that spans multiple entities
- Keep this layer free from infrastructure concerns (databases, frameworks, etc.)
