# Presentation Layer

This directory contains components responsible for formatting and presenting data to users or external systems.

## Purpose

The Presentation layer handles:

- Formatting output data for display
- Converting application data to presentation formats
- Handling presentation-specific logic

## Guidelines

- Presentation code should depend only on application and domain layers
- Keep presentation logic separate from business logic
- Use formatters to convert domain/application data to presentation formats
- Focus on how data is presented, not on business rules
