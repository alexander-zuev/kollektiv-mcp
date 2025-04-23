# Contributing to Kollektiv MCP

This document provides guidelines and instructions for contributing to the Kollektiv MCP project.

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development Workflow](#development-workflow)
  - [Running Locally](#running-locally)
  - [Making Changes](#making-changes)
  - [Code Quality](#code-quality)
- [Project Structure](#project-structure)
  - [Directory Organization](#directory-organization)
  - [Key Components](#key-components)
- [Coding Standards](#coding-standards)
  - [TypeScript Guidelines](#typescript-guidelines)
  - [Formatting and Linting](#formatting-and-linting)
  - [Naming Conventions](#naming-conventions)
- [Testing Guidelines](#testing-guidelines)
  - [Test Structure](#test-structure)
  - [Running Tests](#running-tests)
  - [Writing Tests](#writing-tests)
- [Deployment](#deployment)
  - [Deployment Process](#deployment-process)
  - [Environment Configuration](#environment-configuration)
- [Pull Request Process](#pull-request-process)
- [Additional Resources](#additional-resources)

## Project Overview

Kollektiv MCP is a remote Model Context Protocol (MCP) server running on Cloudflare Workers with OAuth authentication. It provides a platform for AI models like Claude to access tools and services through a standardized protocol. The project implements the MCP specification to enable AI assistants to perform actions like querying data through a secure, authenticated API.

### Key Features

- MCP server implementation with tool registration and execution
- OAuth authentication flow
- Integration with Supabase for authentication
- Cloudflare Workers deployment
- TypeScript-based codebase with strict typing

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- A Cloudflare account (for deployment)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:your-org/kollektiv-mcp.git
   cd kollektiv-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Husky git hooks:
   ```bash
   npm run prepare
   ```

## Development Workflow

### Running Locally

To run the project locally:

```bash
npm run dev
```

This will start the development server at `http://localhost:8787`.

### Making Changes

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test them locally.

3. Run code quality checks:
   ```bash
   npm run check
   ```

4. Run tests to ensure your changes don't break existing functionality:
   ```bash
   npm run test
   ```

5. Commit your changes with a descriptive commit message.

### Code Quality

Before submitting your changes, ensure they meet the project's quality standards:

- Run formatting: `npm run format`
- Run linting: `npm run lint:fix`
- Run type checking: `npm run cf-typegen`
- Run tests: `npm run test`

## Project Structure

### Directory Organization

```
kollektiv-mcp/
├── src/                  # Source code
│   ├── index.ts          # Entry point
│   ├── mcp/              # MCP server implementation
│   │   ├── api/          # API clients
│   │   ├── server.ts     # MCP server setup
│   │   └── tools/        # MCP tool implementations
│   └── web/              # Web application
│       ├── app.ts        # Web app setup
│       ├── handlers/     # Route handlers
│       ├── middleware/   # Middleware functions
│       ├── routes.ts     # Route definitions
│       ├── schemas/      # Validation schemas
│       ├── templates/    # HTML templates
│       └── utils/        # Utility functions
├── tests/                # Test files
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # End-to-end tests
├── public/               # Static assets
└── wrangler.jsonc        # Cloudflare Workers configuration
```

### Key Components

- **MCP Server**: Implements the Model Context Protocol, registers tools, and handles tool execution.
- **Web Application**: Handles authentication, authorization, and web routes.
- **Tools**: Implementations of MCP tools that can be called by AI models.
- **Authentication**: OAuth flow implementation with Supabase integration.

## Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code.
- Enable strict type checking.
- Use interfaces for object shapes and types for unions/primitives.
- Avoid using `any` type when possible.
- Use type inference where it makes code more readable.

### Formatting and Linting

The project uses Biome for formatting and linting:

- Indentation: 2 spaces
- Line width: 100 characters
- Use semicolons at the end of statements
- Use single quotes for strings
- Follow the recommended rules from Biome

To format your code:

```bash
npm run format
```

To lint your code:

```bash
npm run lint:fix
```

### Naming Conventions

- **Files**: Use camelCase for file names (e.g., `queryTool.ts`)
- **Classes**: Use PascalCase for class names (e.g., `KollektivMCP`)
- **Functions/Methods**: Use camelCase for function and method names (e.g., `getAuthorizeHandler`)
- **Variables**: Use camelCase for variable names (e.g., `authResponse`)
- **Constants**: Use UPPER_SNAKE_CASE for constants (e.g., `MAX_RETRIES`)
- **Interfaces/Types**: Use PascalCase with a descriptive name (e.g., `UserProfile`)
- **Enums**: Use PascalCase for enum names and UPPER_SNAKE_CASE for enum values

## Testing Guidelines

### Test Structure

The project follows a test pyramid approach:

- **Unit Tests (70-80%)**: Test individual components in isolation.
- **Integration Tests (15-25%)**: Test how components work together.
- **End-to-End Tests (5-10%)**: Test complete application flows.

### Running Tests

To run all tests:

```bash
npm run test
```

To run tests in watch mode:

```bash
npm run test:watch
```

To run tests with coverage:

```bash
npm run test:coverage
```

To run specific test types:

```bash
npm run test:unit
npm run test:integration
npm run test:e2e
```

### Writing Tests

- **Test Isolation**: Each test should be independent and not rely on state from other tests.
- **Mock External Dependencies**: Use mocks for external services, APIs, and databases.
- **Test Coverage**: Aim for high test coverage, especially for critical paths.
- **Test Naming**: Use descriptive names that explain what is being tested.

For detailed testing guidelines, refer to the [tests/README.md](tests/README.md) file.

## Deployment

### Deployment Process

To deploy the application to Cloudflare Workers:

1. Ensure you have the necessary Cloudflare credentials configured.
2. Run the deployment command:
   ```bash
   npm run deploy
   ```

For a dry run deployment (to check what would be deployed):

```bash
npm run deploy:dry
```

### Environment Configuration

The project uses Cloudflare Workers environment variables and secrets for configuration:

1. Create a KV namespace for OAuth:
   ```bash
   npx wrangler kv namespace create OAUTH_KV
   ```

2. Add the KV namespace ID to `wrangler.jsonc`.

3. Set up any required secrets:
   ```bash
   npx wrangler secret put SECRET_NAME
   ```

## Pull Request Process

1. Ensure your code passes all tests and quality checks.
2. Update documentation if necessary.
3. Create a pull request with a clear description of the changes.
4. Request review from at least one team member.
5. Address any feedback from reviewers.
6. Once approved, your changes will be merged.

## Additional Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/docs)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Hono Documentation](https://hono.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Biome Documentation](https://biomejs.dev/guides/)
- [Vitest Documentation](https://vitest.dev/)