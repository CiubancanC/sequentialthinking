# Tests

This directory contains test files for the application.

## Structure

The test directory mirrors the structure of the `src` directory:

- `domain/`: Tests for domain models, services, and interfaces
- `application/`: Tests for application use cases and DTOs
- `infrastructure/`: Tests for infrastructure implementations

## Guidelines

- Write unit tests for each component
- Use mocks for dependencies when testing a specific layer
- Follow the AAA pattern (Arrange, Act, Assert)
- Aim for high test coverage, especially in domain and application layers
