# CEO MCP Server

An MCP server implementation that provides role-based prompting tools. This server enables AI models to adopt different professional roles (architect, senior developer, QA engineer, etc.) to enhance problem-solving and software development tasks while following CLEAN architecture principles.

## Architecture

This project follows CLEAN architecture principles to ensure maintainability, testability, and scalability. The codebase is organized into the following layers:

### Domain Layer

The core business logic and entities of the application. This layer is independent of any external concerns and contains:

- **Models**: Core business entities and value objects (roles, scenarios)
- **Interfaces**: Contracts that define how the domain interacts with other layers
- **Services**: Domain-specific business logic that operates on multiple entities

### Application Layer

Coordinates the flow of data between the domain layer and the external world. It:

- Implements use cases that represent application-specific business rules
- Orchestrates the flow of data to and from domain entities
- Defines DTOs (Data Transfer Objects) for communication with external layers

### Infrastructure Layer

Provides concrete implementations for interfaces defined in the domain layer and handles external concerns:

- Role-based prompting mechanisms
- Scenario management
- Frameworks and libraries
- Server and network communication

### Presentation Layer

Handles formatting and presenting data to users or external systems:

- Formatting output data for display
- Converting application data to presentation formats
- Handling presentation-specific logic

## Features

- Role-based prompting system for AI models
- Multiple professional roles (architect, senior developer, QA engineer, etc.)
- Scenario-based problem-solving approach
- Systematic division of tasks through prompting
- Early detection and prevention of bugs
- Ensures readable and maintainable architecture
- Professional-level expertise in each role

## Tools

### rolePrompt

A tool that enables AI models to adopt specific professional roles for enhanced problem-solving.

**Inputs:**
- `role` (string): The professional role to adopt (e.g., "architect", "senior-developer", "qa-engineer")
- `context` (string): The context or problem description for the role to address

## Usage

The CEO MCP tools are designed for:
- Enhancing AI model capabilities through role-based prompting
- Enabling systematic division of complex tasks
- Improving software development processes with expert-level guidance
- Ensuring early detection and prevention of bugs
- Promoting readable and maintainable architecture

## Configuration

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

#### npx

```json
{
  "mcpServers": {
    "fidora": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-fidora"
      ]
    }
  }
}
```

#### docker

```json
{
  "mcpServers": {
    "fidora": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "fidora-app"
      ]
    }
  }
}
```

### Usage with VS Code

For manual installation, add the following JSON block to your User Settings (JSON) file in VS Code. You can do this by pressing `Ctrl + Shift + P` and typing `Preferences: Open Settings (JSON)`.

Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with others.

> Note that the `mcp` key is not needed in the `.vscode/mcp.json` file.

For NPX installation:

```json
{
  "mcp": {
    "servers": {
      "fidora": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-fidora"
        ]
      }
    }
  }
}
```

For Docker installation:

```json
{
  "mcp": {
    "servers": {
      "fidora": {
        "command": "docker",
        "args": [
          "run",
          "--rm",
          "-i",
          "fidora-app"
        ]
      }
    }
  }
}
```

### Development Configuration

For development purposes, you can run the server directly from the source code:

```bash
# Clone the repository
git clone https://github.com/yourusername/fidora.git

# Navigate to the project directory
cd fidora

# Install dependencies
npm install

# Start the server in development mode
npm run dev
```

## Project Structure

```
src/
├── domain/                 # Core business logic and entities
│   ├── models/             # Domain models and entities (roles, scenarios)
│   ├── interfaces/         # Interfaces for repositories and services
│   └── services/           # Domain services
├── application/            # Application use cases
│   ├── useCases/           # Use cases/interactors
│   └── dtos/               # Data Transfer Objects
├── infrastructure/         # External concerns (frameworks, DB, etc.)
│   ├── server/             # Server implementation
│   ├── validation/         # Validation logic
│   ├── repositories/       # Repository implementations
│   └── tools/              # Tool definitions
├── presentation/           # Presentation logic
│   └── formatters/         # Output formatters
└── utils/                  # Utility functions
tests/                      # Test files mirroring src structure
config/                     # Configuration files
```

## Building and Deployment

### Docker

Build the Docker image:

```bash
# Build the Docker image
npm run docker:build
```

Run the Docker container:

```bash
# Run the Docker container
npm run docker:run
```

Or use the all-in-one deployment script:

```bash
# Stop any existing container, build a new image, and run it
npm run docker:deploy
```

### Available Docker Scripts

- `docker:build`: Builds the TypeScript project and creates a new Docker image tagged as `fidora-app:latest`
- `docker:run`: Runs a Docker container named `fidora` using the latest image
- `docker:stop`: Stops the running `fidora` container (if it exists)
- `docker:deploy`: Combines the above scripts to stop any existing container, build a new image, and run it

### Manual Docker Build

If you prefer to use Docker commands directly:

```bash
docker build -t fidora-app -f Dockerfile .
docker run --name fidora --rm -i fidora-app
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Start the server in development mode (with auto-reload)
npm run dev
```

## Example Usage

Here's an example of how to use the rolePrompt tool:

```json
{
  "role": "architect",
  "context": "Design a scalable microservice architecture for an e-commerce platform"
}
```

Response:

```json
{
  "rolePrompt": "As a senior architect, I'll design a scalable microservice architecture for an e-commerce platform...",
  "recommendations": [
    "Use API Gateway for client communication",
    "Implement event-driven communication between services",
    "Design with domain-driven boundaries"
  ],
  "nextSteps": [
    "Define service boundaries",
    "Design data model",
    "Plan deployment strategy"
  ]
}
```

Using a different role:

```json
{
  "role": "qa-engineer",
  "context": "Develop a testing strategy for a new payment processing system"
}
```

Response:

```json
{
  "rolePrompt": "As a senior QA engineer, I'll develop a comprehensive testing strategy for the new payment processing system...",
  "testingApproach": [
    "Unit testing for all components",
    "Integration testing for service interactions",
    "End-to-end testing for critical payment flows",
    "Security testing for payment data"
  ],
  "riskAssessment": [
    "Payment failures",
    "Data security vulnerabilities",
    "Performance under high load"
  ]
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
