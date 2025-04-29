# Application Layer

This directory contains the application use cases and orchestration logic.

## Purpose

The Application layer coordinates the flow of data between the domain layer and the external world. It:

- Implements use cases that represent application-specific business rules
- Orchestrates the flow of data to and from domain entities
- Defines DTOs (Data Transfer Objects) for communication with external layers

## Guidelines

- Application code should depend only on the domain layer
- Use cases should be focused on a single responsibility
- DTOs should be used to transfer data between layers
- Keep this layer free from infrastructure concerns (databases, frameworks, etc.)
