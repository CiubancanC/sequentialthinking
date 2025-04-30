import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Logger } from '../../utils/logger.js';
import { config } from '../../config/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Options for the Swagger JSDoc generator.
 */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fidora MCP Server API Documentation',
      version: config.server.version,
      description: 'API documentation for the Fidora MCP server',
    },
  },
  // Path to the OpenAPI YAML file
  apis: [resolve(__dirname, 'openapi.yaml')],
};

/**
 * Starts the Swagger documentation server.
 * @param port The port to listen on
 */
export function startSwaggerServer(port: number = 3000): void {
  try {
    const app = express();
    
    // Parse the OpenAPI specification
    const swaggerSpec = swaggerJsdoc(options);
    
    // Serve the Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
    // Serve the raw OpenAPI spec
    app.get('/api-docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
    
    // Serve a simple index page
    app.get('/', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Fidora MCP Server Documentation</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 40px;
                line-height: 1.6;
              }
              h1 {
                color: #333;
              }
              .container {
                max-width: 800px;
                margin: 0 auto;
              }
              a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                border-radius: 4px;
              }
              a:hover {
                background-color: #45a049;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Fidora MCP Server Documentation</h1>
              <p>
                Welcome to the Fidora MCP Server documentation. This server provides role-based prompting tools
                for AI models, allowing them to adopt different professional roles to enhance problem-solving
                and software development tasks.
              </p>
              <p>
                Click the button below to access the API documentation:
              </p>
              <a href="/api-docs">View API Documentation</a>
            </div>
          </body>
        </html>
      `);
    });
    
    // Start the server
    app.listen(port, () => {
      Logger.info(`Swagger documentation server running at http://localhost:${port}`);
      Logger.info(`API documentation available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    Logger.error('Error starting Swagger server:', Logger.formatError(error));
  }
}
