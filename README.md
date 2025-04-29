# CEOMCP MCP Server

An MCP server implementation that provides a tool for dynamic and reflective problem-solving using the CEOMCP approach.

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

- Break down complex problems into manageable steps
- Revise and refine thoughts as understanding deepens
- Branch into alternative paths of reasoning
- Adjust the total number of thoughts dynamically
- Generate and verify solution hypotheses

## Tool

### ceomcp

Facilitates a detailed, step-by-step thinking process for problem-solving and analysis using the CEOMCP approach.

**Inputs:**
- `thought` (string): The current thinking step
- `nextThoughtNeeded` (boolean): Whether another thought step is needed
- `thoughtNumber` (integer): Current thought number
- `totalThoughts` (integer): Estimated total thoughts needed
- `isRevision` (boolean, optional): Whether this revises previous thinking
- `revisesThought` (integer, optional): Which thought is being reconsidered
- `branchFromThought` (integer, optional): Branching point thought number
- `branchId` (string, optional): Branch identifier
- `needsMoreThoughts` (boolean, optional): If more thoughts are needed

## Usage

The CEOMCP tool is designed for:
- Breaking down complex problems into steps
- Planning and design with room for revision
- Analysis that might need course correction
- Problems where the full scope might not be clear initially
- Tasks that need to maintain context over multiple steps
- Situations where irrelevant information needs to be filtered out

## Configuration

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

#### npx

```json
{
  "mcpServers": {
    "ceomcp": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-ceomcp"
      ]
    }
  }
}
```

#### docker

```json
{
  "mcpServers": {
    "ceomcp": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "mcp/ceomcp"
      ]
    }
  }
}
```

### Usage with VS Code

For quick installation, click one of the installation buttons below...

[![Install with NPX in VS Code](https://img.shields.io/badge/VS_Code-NPM-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=ceomcp&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40modelcontextprotocol%2Fserver-ceomcp%22%5D%7D) [![Install with NPX in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-NPM-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=ceomcp&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40modelcontextprotocol%2Fserver-ceomcp%22%5D%7D&quality=insiders)

[![Install with Docker in VS Code](https://img.shields.io/badge/VS_Code-Docker-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=ceomcp&config=%7B%22command%22%3A%22docker%22%2C%22args%22%3A%5B%22run%22%2C%22--rm%22%2C%22-i%22%2C%22mcp%2Fceomcp%22%5D%7D) [![Install with Docker in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Docker-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=ceomcp&config=%7B%22command%22%3A%22docker%22%2C%22args%22%3A%5B%22run%22%2C%22--rm%22%2C%22-i%22%2C%22mcp%2Fceomcp%22%5D%7D&quality=insiders)

For manual installation, add the following JSON block to your User Settings (JSON) file in VS Code. You can do this by pressing `Ctrl + Shift + P` and typing `Preferences: Open Settings (JSON)`.

Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with others.

> Note that the `mcp` key is not needed in the `.vscode/mcp.json` file.

For NPX installation:

```json
{
  "mcp": {
    "servers": {
      "ceomcp": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-ceomcp"
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
      "ceomcp": {
        "command": "docker",
        "args": [
          "run",
          "--rm",
          "-i",
          "mcp/ceomcp"
        ]
      }
    }
  }
}
```

### Development Configuration (cline_mcp_settings.json)

For development purposes using the VS Code extension, you might use the following configuration in your `cline_mcp_settings.json` file (typically located in the extension's global storage):

```json
{
  "ceomcp": {
    "command": "docker",
    "args": [
      "run",
      "-i",
      "--rm",
      "ceomcp-app"
    ],
    "disabled": false,
    "autoApprove": [
      "ceomcp"
    ]
  }
}
```
Note the use of `ceomcp-app` as the image name, which should correspond to a local build

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
