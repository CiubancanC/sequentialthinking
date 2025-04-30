# Fidora MCP Server

An MCP server implementation that provides role-based prompting tools with Gemini AI integration. This server enables AI models to adopt different professional roles (architect, senior developer, QA engineer, etc.) to enhance problem-solving and software development tasks while following CLEAN architecture principles. It acts as a "second brain" for AI agents, helping them take the path of least resistance and identify potential risks early.

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

- **Role-Based Prompting**: Adopt specific professional roles for enhanced problem-solving
- **Multiple Professional Roles**: Architect, senior developer, QA engineer, and more
- **Gemini AI Integration**: Leverage Google's Gemini 2.5 Flash Preview model for detailed responses
- **Multithreaded Processing**: Handle large computations efficiently with worker threads
- **Agile Pipeline**: Treat each prompt as a ticket in an agile pipeline (requirements → design → implementation → testing → review)
- **Path of Least Resistance**: Identify the optimal solution approach while maintaining quality
- **Early Risk Identification**: Detect potential issues and challenges early in the process
- **Robust Error Handling**: Retry logic for transient errors and comprehensive logging
- **Dependency Injection**: Better testability and maintainability through DI system

## Tools

### rolePrompt

A tool that enables AI models to adopt specific professional roles for enhanced problem-solving. When configured with a Google API key, it can use Gemini 2.5 Flash Preview to provide even more detailed and accurate responses.

**Inputs:**
- `role` (string): The professional role to adopt (e.g., "architect", "senior-developer", "qa-engineer")
- `context` (string): The context or problem description for the role to address
- `scenarioId` (string, optional): ID of a predefined scenario to use for additional context

## Usage

The CEO MCP tools are designed for:
- Enhancing AI model capabilities through role-based prompting
- Enabling systematic division of complex tasks
- Improving software development processes with expert-level guidance
- Ensuring early detection and prevention of bugs
- Promoting readable and maintainable architecture
- Providing AI-enhanced responses with deeper technical insights (with Gemini integration)

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
│       ├── roleService.ts           # Role management service
│       ├── aiModelService.ts        # AI model integration service
│       ├── automaticRoleService.ts  # Automatic role selection service
│       ├── roleLookupService.ts     # Role lookup service
│       └── agileProcessingService.ts # Agile pipeline processing service
├── application/            # Application use cases
│   ├── useCases/           # Use cases/interactors
│   │   └── processRolePrompt.ts     # Role prompt processing use case
│   └── dtos/               # Data Transfer Objects
├── infrastructure/         # External concerns (frameworks, DB, etc.)
│   ├── server/             # Server implementation
│   ├── validation/         # Validation logic
│   ├── repositories/       # Repository implementations
│   ├── tools/              # Tool definitions
│   ├── services/           # Infrastructure services
│   │   ├── geminiApiClient.ts       # Gemini API client
│   │   ├── workerThreadService.ts   # Worker thread service
│   │   ├── workerThread.js          # Worker thread implementation
│   │   └── geminiWorker.js          # Gemini worker implementation
│   └── di/                 # Dependency injection system
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

## Dependency Injection System

The project uses a lightweight dependency injection (DI) system to manage dependencies and improve testability. The DI system is located in the `src/infrastructure/di` directory.

### Key Components

- **DIContainer**: The main container that manages dependency registration and resolution
- **Lifetime Management**: Support for singleton and transient dependencies
- **Centralized Registration**: All dependencies are registered in a single place

### Usage

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

Dependencies can be resolved from the container:

```typescript
// Get the role service
const roleService = container.resolve<IRoleService>(DI_TOKENS.ROLE_SERVICE);
```

### Testing with DI

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

## API Documentation

The project includes OpenAPI/Swagger documentation to help users understand how to interact with the MCP server. Although the server operates via the Model Control Protocol and not as a traditional HTTP API, the documentation represents the MCP tools as if they were API endpoints for easier understanding.

### Viewing the Documentation

To start the documentation server:

```bash
# Start the documentation server in development mode
npm run docs

# Or build and start the documentation server
npm run docs:build
```

The documentation server will be available at:
- http://localhost:3000 - Documentation home page
- http://localhost:3000/api-docs - Swagger UI

### Documentation Features

- Interactive Swagger UI for exploring the API
- Detailed descriptions of all available tools
- Request and response schemas
- Example requests and responses

## Gemini Integration and Multithreading

The server uses Google's Gemini 2.5 Flash Preview model to enhance responses, providing more detailed, accurate, and technically rich content for all roles. The integration is optimized with multithreading to handle large computations efficiently.

### Configuration

1. Get a Google API key from the [Google AI Studio](https://makersuite.google.com/)
2. Create a `.env` file with the following configuration:

```
# Gemini API Configuration
GOOGLE_API_KEY=your_google_api_key_here
USE_GEMINI=true
GEMINI_MODEL=gemini-2.5-flash-preview-04-17
GEMINI_MAX_TOKENS=2048
GEMINI_TEMPERATURE=0.7
GEMINI_TOP_K=40
GEMINI_TOP_P=0.95
GEMINI_MAX_RETRIES=3
GEMINI_RETRY_DELAY=1000

# Worker Thread Configuration
MIN_WORKER_THREADS=2
MAX_WORKER_THREADS=8
MAX_WORKER_QUEUE=100
WORKER_IDLE_TIMEOUT=60000
```

3. Restart the server to apply the changes

When Gemini integration is enabled, responses will include an additional `enhancedResponse` field with the AI-generated content. The response is processed through an agile pipeline that includes requirements gathering, design, implementation, testing, and review stages. Each prompt is treated as a ticket in this pipeline, ensuring comprehensive and well-thought-out responses.

## Example Usage

Here's an example of how to use the rolePrompt tool:

```json
{
  "role": "architect",
  "context": "Design a scalable microservice architecture for an e-commerce platform"
}
```

Response (with Gemini integration enabled):

```json
{
  "rolePrompt": "As a senior architect, I will address the following: Design a scalable microservice architecture for an e-commerce platform...",
  "enhancedResponse": "# TICKET ANALYSIS:\n\n## Requirements\n- Scalable architecture for e-commerce\n- Microservice-based approach\n- Must handle varying loads\n\n## Risks and Challenges\n- Service communication complexity\n- Data consistency across services\n- Deployment and monitoring overhead\n\n# DESIGN APPROACH:\n\n## Recommended Architecture\n...",
  "recommendations": [
    "Use API Gateway for client communication",
    "Implement event-driven communication between services",
    "Design with domain-driven boundaries"
  ],
  "nextSteps": [
    "Define service boundaries",
    "Design data model",
    "Plan deployment strategy"
  ],
  "architectureComponents": [
    "API Gateway",
    "User Service",
    "Product Catalog Service",
    "Order Service",
    "Payment Service"
  ],
  "ticketId": "f8e7d6c5-b4a3-2c1d-0e9f-8g7h6i5j4k3l",
  "status": "success"
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
