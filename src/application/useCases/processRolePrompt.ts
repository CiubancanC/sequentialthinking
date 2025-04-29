import { IRoleService } from "../../domain/interfaces/roleInterfaces.js";
import { RolePromptRequestDto, RolePromptResponseDto } from "../dtos/rolePromptDto.js";

/**
 * Result of processing a role prompt.
 */
export type ProcessRolePromptResult = {
  data?: RolePromptResponseDto;
  error?: {
    error: string;
    status: 'failed';
  };
};

/**
 * Use case for processing role prompts.
 */
export class ProcessRolePromptUseCase {
  /**
   * Creates a new ProcessRolePromptUseCase instance.
   * @param roleService The role service to use
   */
  constructor(private readonly roleService: IRoleService) {}

  /**
   * Executes the use case.
   * @param input The role prompt request
   * @returns The result of processing the role prompt
   */
  async execute(input: RolePromptRequestDto): Promise<ProcessRolePromptResult> {
    try {
      // Check if the role exists
      const role = await this.roleService.getRoleByName(input.role);
      if (!role) {
        return {
          error: {
            error: `Role not found: ${input.role}`,
            status: 'failed'
          }
        };
      }

      // Generate the role prompt
      const rolePrompt = await this.roleService.generateRolePrompt(
        input.role,
        input.context
      );

      // Create a response based on the role
      const response: RolePromptResponseDto = {
        rolePrompt,
        roleName: role.name,
        status: 'success'
      };

      // Add role-specific fields based on the role name
      switch (role.name.toLowerCase()) {
        case 'architect':
          response.recommendations = [
            'Design with scalability in mind',
            'Use appropriate design patterns',
            'Consider security from the start'
          ];
          response.nextSteps = [
            'Create detailed architecture diagrams',
            'Document key design decisions',
            'Review with stakeholders'
          ];
          response.architectureComponents = [
            'API Gateway',
            'Microservices',
            'Data storage',
            'Authentication service'
          ];
          response.codeExamples = [
            '```text\n# Architecture Diagram (ASCII)\n\n+----------------+     +-------------------+\n|                |     |                   |\n|  Client App    |---->|   API Gateway     |\n|  (Next.js)     |     |                   |\n+----------------+     +-------------------+\n                              |\n                              v\n+----------------+     +-------------------+     +-------------------+\n|                |     |                   |     |                   |\n|  Auth Service  |<--->|  User Service     |---->|  Database         |\n|                |     |                   |     |  (PostgreSQL)     |\n+----------------+     +-------------------+     +-------------------+\n```',
            '```javascript\n// Next.js API route that acts as a gateway\nexport default async function handler(req, res) {\n  // Authenticate the request\n  const token = req.headers.authorization?.split(" ")[1];\n  if (!token) {\n    return res.status(401).json({ error: "Unauthorized" });\n  }\n\n  try {\n    // Verify the token\n    const user = await verifyToken(token);\n    \n    // Route the request to the appropriate microservice\n    const path = req.url.split("/api/")[1];\n    \n    if (path.startsWith("users")) {\n      // Forward to user service\n      const response = await fetch(`${process.env.USER_SERVICE_URL}/${path}`, {\n        method: req.method,\n        headers: {\n          "Content-Type": "application/json",\n          "X-User-Id": user.id\n        },\n        body: req.method !== "GET" ? JSON.stringify(req.body) : undefined\n      });\n      \n      const data = await response.json();\n      return res.status(response.status).json(data);\n    }\n    \n    // Handle other services...\n    \n    return res.status(404).json({ error: "Service not found" });\n  } catch (error) {\n    return res.status(500).json({ error: "Internal server error" });\n  }\n}\n```',
            '```yaml\n# Docker Compose configuration for the architecture\nversion: "3.8"\n\nservices:\n  nextjs-app:\n    build: ./client\n    ports:\n      - "3000:3000"\n    environment:\n      - API_URL=http://api-gateway:4000\n\n  api-gateway:\n    build: ./api-gateway\n    ports:\n      - "4000:4000"\n    environment:\n      - AUTH_SERVICE_URL=http://auth-service:4001\n      - USER_SERVICE_URL=http://user-service:4002\n\n  auth-service:\n    build: ./auth-service\n    ports:\n      - "4001:4001"\n    environment:\n      - DATABASE_URL=postgres://user:password@db:5432/auth\n      - JWT_SECRET=your-secret-key\n\n  user-service:\n    build: ./user-service\n    ports:\n      - "4002:4002"\n    environment:\n      - DATABASE_URL=postgres://user:password@db:5432/users\n\n  db:\n    image: postgres:14\n    ports:\n      - "5432:5432"\n    environment:\n      - POSTGRES_USER=user\n      - POSTGRES_PASSWORD=password\n      - POSTGRES_MULTIPLE_DATABASES=auth,users\n    volumes:\n      - postgres-data:/var/lib/postgresql/data\n\nvolumes:\n  postgres-data:\n```'
          ];
          break;
        case 'senior developer':
        case 'developer':
          response.recommendations = [
            'Follow clean code principles',
            'Write comprehensive tests',
            'Document your code'
          ];
          response.nextSteps = [
            'Implement core functionality',
            'Write unit tests',
            'Perform code review'
          ];
          response.codeExamples = [
            '```javascript\n// Example implementation of a Next.js API route for authentication\nexport default async function handler(req, res) {\n  if (req.method === "POST") {\n    const { email, password } = req.body;\n    \n    try {\n      // Validate user credentials\n      const user = await validateUser(email, password);\n      \n      if (user) {\n        // Create session or JWT token\n        const token = generateToken(user);\n        res.status(200).json({ token, user: { id: user.id, email: user.email } });\n      } else {\n        res.status(401).json({ error: "Invalid credentials" });\n      }\n    } catch (error) {\n      res.status(500).json({ error: "Authentication failed" });\n    }\n  } else {\n    res.setHeader("Allow", ["POST"]);\n    res.status(405).end(`Method ${req.method} Not Allowed`);\n  }\n}\n```',
            '```javascript\n// Example of a React login component\nimport { useState } from "react";\nimport { useRouter } from "next/router";\n\nexport default function Login() {\n  const [email, setEmail] = useState("");\n  const [password, setPassword] = useState("");\n  const [error, setError] = useState("");\n  const router = useRouter();\n\n  async function handleSubmit(e) {\n    e.preventDefault();\n    setError("");\n    \n    try {\n      const response = await fetch("/api/auth/login", {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify({ email, password }),\n      });\n      \n      const data = await response.json();\n      \n      if (!response.ok) {\n        throw new Error(data.error || "Login failed");\n      }\n      \n      // Store token in localStorage or cookies\n      localStorage.setItem("token", data.token);\n      \n      // Redirect to dashboard\n      router.push("/dashboard");\n    } catch (err) {\n      setError(err.message);\n    }\n  }\n\n  return (\n    <div className="login-container">\n      <h1>Login</h1>\n      {error && <p className="error">{error}</p>}\n      <form onSubmit={handleSubmit}>\n        <div className="form-group">\n          <label htmlFor="email">Email</label>\n          <input\n            type="email"\n            id="email"\n            value={email}\n            onChange={(e) => setEmail(e.target.value)}\n            required\n          />\n        </div>\n        <div className="form-group">\n          <label htmlFor="password">Password</label>\n          <input\n            type="password"\n            id="password"\n            value={password}\n            onChange={(e) => setPassword(e.target.value)}\n            required\n          />\n        </div>\n        <button type="submit">Login</button>\n      </form>\n    </div>\n  );\n}\n```',
            '```javascript\n// Example of a database connection utility\nimport { Pool } from "pg";\n\nlet pool;\n\nif (!pool) {\n  pool = new Pool({\n    user: process.env.DB_USER,\n    password: process.env.DB_PASSWORD,\n    host: process.env.DB_HOST,\n    port: parseInt(process.env.DB_PORT || "5432"),\n    database: process.env.DB_NAME,\n  });\n}\n\nexport async function query(text, params) {\n  const client = await pool.connect();\n  try {\n    const result = await client.query(text, params);\n    return result;\n  } finally {\n    client.release();\n  }\n}\n\nexport async function getUserByEmail(email) {\n  const result = await query("SELECT * FROM users WHERE email = $1", [email]);\n  return result.rows[0];\n}\n\nexport async function createUser(email, hashedPassword) {\n  const result = await query(\n    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",\n    [email, hashedPassword]\n  );\n  return result.rows[0];\n}\n```'
          ];
          break;
        case 'qa engineer':
          response.testingApproach = [
            'Unit testing for all components',
            'Integration testing for service interactions',
            'End-to-end testing for critical flows',
            'Performance testing under load'
          ];
          response.riskAssessment = [
            'Potential failure points',
            'Security vulnerabilities',
            'Performance bottlenecks'
          ];
          response.nextSteps = [
            'Create test plan',
            'Implement test cases',
            'Set up CI/CD pipeline for testing'
          ];
          response.codeExamples = [
            '```javascript\n// Unit test for login API using Jest\nimport { handler } from "../pages/api/auth/login";\nimport { validateUser, generateToken } from "../lib/auth";\n\n// Mock dependencies\njest.mock("../lib/auth", () => ({\n  validateUser: jest.fn(),\n  generateToken: jest.fn(),\n}));\n\ndescribe("Login API", () => {\n  let req, res;\n\n  beforeEach(() => {\n    req = {\n      method: "POST",\n      body: { email: "test@example.com", password: "password123" },\n    };\n    res = {\n      status: jest.fn().mockReturnThis(),\n      json: jest.fn(),\n      setHeader: jest.fn(),\n      end: jest.fn(),\n    };\n  });\n\n  afterEach(() => {\n    jest.clearAllMocks();\n  });\n\n  test("returns 405 for non-POST requests", async () => {\n    req.method = "GET";\n    await handler(req, res);\n    expect(res.setHeader).toHaveBeenCalledWith("Allow", ["POST"]);\n    expect(res.status).toHaveBeenCalledWith(405);\n    expect(res.end).toHaveBeenCalled();\n  });\n\n  test("returns 401 for invalid credentials", async () => {\n    validateUser.mockResolvedValue(null);\n    await handler(req, res);\n    expect(validateUser).toHaveBeenCalledWith("test@example.com", "password123");\n    expect(res.status).toHaveBeenCalledWith(401);\n    expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });\n  });\n\n  test("returns 200 with token for valid credentials", async () => {\n    const mockUser = { id: "123", email: "test@example.com" };\n    const mockToken = "jwt-token";\n    validateUser.mockResolvedValue(mockUser);\n    generateToken.mockReturnValue(mockToken);\n\n    await handler(req, res);\n\n    expect(validateUser).toHaveBeenCalledWith("test@example.com", "password123");\n    expect(generateToken).toHaveBeenCalledWith(mockUser);\n    expect(res.status).toHaveBeenCalledWith(200);\n    expect(res.json).toHaveBeenCalledWith({\n      token: mockToken,\n      user: { id: mockUser.id, email: mockUser.email },\n    });\n  });\n\n  test("returns 500 when an error occurs", async () => {\n    validateUser.mockRejectedValue(new Error("Database error"));\n    await handler(req, res);\n    expect(res.status).toHaveBeenCalledWith(500);\n    expect(res.json).toHaveBeenCalledWith({ error: "Authentication failed" });\n  });\n});\n```',
            '```javascript\n// E2E test for login flow using Cypress\ndescribe("Login Flow", () => {\n  beforeEach(() => {\n    // Reset database or mock API responses\n    cy.intercept("POST", "/api/auth/login", (req) => {\n      // Mock successful login for test@example.com\n      if (req.body.email === "test@example.com" && req.body.password === "password123") {\n        req.reply({\n          statusCode: 200,\n          body: {\n            token: "fake-jwt-token",\n            user: { id: "123", email: "test@example.com" }\n          }\n        });\n      } else {\n        // Mock failed login\n        req.reply({\n          statusCode: 401,\n          body: { error: "Invalid credentials" }\n        });\n      }\n    }).as("loginRequest");\n\n    // Visit the login page\n    cy.visit("/login");\n  });\n\n  it("displays validation errors for empty fields", () => {\n    // Try to submit without entering data\n    cy.get("button[type=submit]").click();\n    \n    // Check for validation messages\n    cy.get("input:invalid").should("have.length", 2);\n  });\n\n  it("shows error message for invalid credentials", () => {\n    // Enter invalid credentials\n    cy.get("input[type=email]").type("wrong@example.com");\n    cy.get("input[type=password]").type("wrongpassword");\n    cy.get("button[type=submit]").click();\n    \n    // Wait for the API call\n    cy.wait("@loginRequest");\n    \n    // Check for error message\n    cy.get(".error").should("be.visible").and("contain", "Invalid credentials");\n  });\n\n  it("redirects to dashboard after successful login", () => {\n    // Enter valid credentials\n    cy.get("input[type=email]").type("test@example.com");\n    cy.get("input[type=password]").type("password123");\n    cy.get("button[type=submit]").click();\n    \n    // Wait for the API call\n    cy.wait("@loginRequest");\n    \n    // Check that we\'re redirected to dashboard\n    cy.url().should("include", "/dashboard");\n    \n    // Check that token is stored in localStorage\n    cy.window().its("localStorage.token").should("exist");\n  });\n});\n```',
            '```yaml\n# GitHub Actions workflow for running tests\nname: Test Suite\n\non:\n  push:\n    branches: [ main, develop ]\n  pull_request:\n    branches: [ main, develop ]\n\njobs:\n  unit-tests:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Set up Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: 18\n          cache: "npm"\n      - name: Install dependencies\n        run: npm ci\n      - name: Run unit tests\n        run: npm test\n\n  e2e-tests:\n    runs-on: ubuntu-latest\n    needs: unit-tests\n    steps:\n      - uses: actions/checkout@v3\n      - name: Set up Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: 18\n          cache: "npm"\n      - name: Install dependencies\n        run: npm ci\n      - name: Build application\n        run: npm run build\n      - name: Run Cypress tests\n        uses: cypress-io/github-action@v5\n        with:\n          start: npm start\n          wait-on: "http://localhost:3000"\n          browser: chrome\n          headed: false\n```'
          ];
          break;
        case 'devops engineer':
          response.recommendations = [
            'Automate deployment process',
            'Implement monitoring and alerting',
            'Use infrastructure as code'
          ];
          response.nextSteps = [
            'Set up CI/CD pipeline',
            'Configure monitoring tools',
            'Document deployment process'
          ];
          response.codeExamples = [
            '```yaml\n# Docker Compose for Next.js app with hot reloading\nversion: "3.8"\n\nservices:\n  nextjs:\n    build:\n      context: .\n      dockerfile: Dockerfile.dev\n    ports:\n      - "3000:3000"\n    volumes:\n      - ./:/app\n      - /app/node_modules\n      - /app/.next\n    environment:\n      - NODE_ENV=development\n      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp\n    depends_on:\n      - db\n\n  db:\n    image: postgres:14-alpine\n    ports:\n      - "5432:5432"\n    environment:\n      - POSTGRES_USER=postgres\n      - POSTGRES_PASSWORD=password\n      - POSTGRES_DB=myapp\n    volumes:\n      - postgres-data:/var/lib/postgresql/data\n\nvolumes:\n  postgres-data:\n```',
            '```dockerfile\n# Dockerfile.dev for Next.js with hot reloading\nFROM node:18-alpine\n\nWORKDIR /app\n\n# Install dependencies based on the preferred package manager\nCOPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./\nRUN \\\\n  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \\\\n  elif [ -f package-lock.json ]; then npm ci; \\\\n  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \\\\n  else npm i; \\\\n  fi\n\n# Copy source files\nCOPY . .\n\n# Set environment variables\nENV NODE_ENV development\nENV PORT 3000\n\n# Expose port\nEXPOSE 3000\n\n# Start development server with hot reloading\nCMD ["npm", "run", "dev"]\n```',
            '```yaml\n# GitHub Actions workflow for CI/CD\nname: CI/CD Pipeline\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  build-and-test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      \n      - name: Set up Node.js\n        uses: actions/setup-node@v3\n        with:\n          node-version: 18\n          cache: "npm"\n          \n      - name: Install dependencies\n        run: npm ci\n        \n      - name: Run linting\n        run: npm run lint\n        \n      - name: Run tests\n        run: npm test\n        \n      - name: Build application\n        run: npm run build\n        \n      - name: Upload build artifacts\n        uses: actions/upload-artifact@v3\n        with:\n          name: build\n          path: .next\n          retention-days: 1\n\n  deploy:\n    needs: build-and-test\n    if: github.ref == \'refs/heads/main\'\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      \n      - name: Download build artifacts\n        uses: actions/download-artifact@v3\n        with:\n          name: build\n          path: .next\n          \n      - name: Set up Docker Buildx\n        uses: docker/setup-buildx-action@v2\n        \n      - name: Login to Docker Hub\n        uses: docker/login-action@v2\n        with:\n          username: ${{ secrets.DOCKER_HUB_USERNAME }}\n          password: ${{ secrets.DOCKER_HUB_TOKEN }}\n          \n      - name: Build and push Docker image\n        uses: docker/build-push-action@v4\n        with:\n          context: .\n          push: true\n          tags: yourusername/nextjs-app:latest\n          \n      - name: Deploy to production\n        run: |\n          # Add deployment commands here\n          echo "Deploying to production server..."\n```'
          ];
          break;
        case 'security engineer':
          response.recommendations = [
            'Implement defense in depth',
            'Follow the principle of least privilege',
            'Conduct regular security assessments'
          ];
          response.nextSteps = [
            'Perform threat modeling',
            'Implement security controls',
            'Conduct penetration testing'
          ];
          response.securityControls = [
            'Authentication and authorization',
            'Data encryption',
            'Input validation',
            'Secure coding practices',
            'Security monitoring'
          ];
          break;
        case 'data scientist':
          response.recommendations = [
            'Clean and preprocess data thoroughly',
            'Use appropriate algorithms for the problem',
            'Validate models with multiple metrics'
          ];
          response.nextSteps = [
            'Collect and prepare data',
            'Develop and train models',
            'Evaluate and refine results'
          ];
          response.analyticalApproach = [
            'Exploratory data analysis',
            'Feature engineering',
            'Model selection and training',
            'Hyperparameter tuning',
            'Model evaluation'
          ];
          break;
        case 'ux designer':
          response.recommendations = [
            'Focus on user needs and goals',
            'Create intuitive and accessible interfaces',
            'Test designs with real users'
          ];
          response.nextSteps = [
            'Conduct user research',
            'Create wireframes and prototypes',
            'Perform usability testing'
          ];
          response.designPrinciples = [
            'User-centered design',
            'Visual hierarchy',
            'Consistency and standards',
            'Accessibility',
            'Feedback and affordances'
          ];
          break;
        case 'product manager':
          response.recommendations = [
            'Align features with user needs and business goals',
            'Prioritize based on value and effort',
            'Communicate clearly with stakeholders'
          ];
          response.nextSteps = [
            'Define product vision and strategy',
            'Create and prioritize backlog',
            'Coordinate with development team'
          ];
          response.productStrategy = [
            'Market analysis',
            'User personas and journeys',
            'Feature prioritization',
            'Roadmap planning',
            'Success metrics'
          ];
          break;
        default:
          response.recommendations = [
            'Analyze the problem thoroughly',
            'Consider multiple approaches',
            'Document your solution'
          ];
          response.nextSteps = [
            'Implement the solution',
            'Test thoroughly',
            'Review and refine'
          ];
      }

      return { data: response };
    } catch (error) {
      return {
        error: {
          error: error instanceof Error ? error.message : String(error),
          status: 'failed'
        }
      };
    }
  }
}
