# Hello World MCP Server

A simple MCP server implementation that provides a "Hello World" greeting tool. This server demonstrates the basic functionality of the MCP protocol while following CLEAN architecture principles.

## Architecture

This project follows CLEAN architecture principles to ensure maintainability, testability, and scalability. The codebase is organized into the following layers:

### Domain Layer

The core business logic and entities of the application. This layer is independent of any external concerns and contains:

- **Models**: Core business entities and value objects
- **Interfaces**: Contracts that define how the domain interacts with other layers
- **Services**: Domain-specific business logic that operates on multiple entities

### Application Layer

Coordinates the flow of data between the domain layer and the external world. It:

- Implements use cases that represent application-specific business rules
- Orchestrates the flow of data to and from domain entities
- Defines DTOs (Data Transfer Objects) for communication with external layers

### Infrastructure Layer

Provides concrete implementations for interfaces defined in the domain layer and handles external concerns:

- External services and APIs
- Databases and data access
- Frameworks and libraries
- Server and network communication

### Presentation Layer

Handles formatting and presenting data to users or external systems:

- Formatting output data for display
- Converting application data to presentation formats
- Handling presentation-specific logic

## Features

- Simple "Hello World" greeting functionality
- Customizable greeting message
- Optional name parameter to personalize the greeting
- Maintains a history of all greetings
- Demonstrates CLEAN architecture principles in a minimal implementation

## Tool

### helloworld

A simple tool that provides a customizable "Hello World" greeting.

**Inputs:**
- `message` (string): The greeting message to send (e.g., "Hello", "Hi", "Greetings")
- `name` (string, optional): The name of the person to greet (defaults to "World" if not specified)

## Usage

The Hello World tool is designed for:
- Demonstrating the basic functionality of the MCP protocol
- Learning how to implement a simple MCP server
- Testing the connection between a client and the MCP server
- Providing a template for more complex MCP implementations

## Configuration

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

#### npx

```json
{
  "mcpServers": {
    "helloworld": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-helloworld"
      ]
    }
  }
}
```

#### docker

```json
{
  "mcpServers": {
    "helloworld": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "mcp/helloworld"
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
      "helloworld": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-helloworld"
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
      "helloworld": {
        "command": "docker",
        "args": [
          "run",
          "--rm",
          "-i",
          "mcp/helloworld"
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
git clone https://github.com/yourusername/hello-world-mcp.git

# Navigate to the project directory
cd hello-world-mcp

# Install dependencies
npm install

# Start the server in development mode
npm run dev
```

## Project Structure

```
src/
├── domain/                 # Core business logic and entities
│   ├── models/             # Domain models and entities
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

## Building

Docker:

```bash
docker build -t mcp/ceomcp -f src/ceomcp/Dockerfile .
```

## Development

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test

# Start the server in development mode (with auto-reload)
pnpm dev
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
