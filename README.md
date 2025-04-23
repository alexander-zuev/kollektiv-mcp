# Kollektiv MCP

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-4.12-orange.svg)](https://workers.cloudflare.com/)
[![Hono](https://img.shields.io/badge/Hono-4.7-brightgreen.svg)](https://hono.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.49-blueviolet.svg)](https://supabase.io/)
[![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.10-yellow.svg)](https://modelcontextprotocol.io/)
[![MCP Server](https://img.shields.io/badge/MCP_Server-1.0-purple.svg)](https://modelcontextprotocol.io/)
[![Zod](https://img.shields.io/badge/Zod-3.24-red.svg)](https://zod.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-3.1-green.svg)](https://vitest.dev/)
[![codecov](https://codecov.io/gh/your-org/kollektiv-mcp/branch/main/graph/badge.svg)](https://codecov.io/gh/your-org/kollektiv-mcp)

## Overview

Kollektiv MCP is a remote Model Context Protocol (MCP) server running on Cloudflare Workers. It provides a platform for AI models like Claude to access tools and services through a standardized protocol.

> **Note on Badges:**
> - **MCP Server 1.0**: This badge indicates compliance with version 1.0 of the Model Context Protocol specification.
> - **Coverage**: We use Codecov for dynamic coverage reporting instead of hardcoded values. The badge above shows the current test coverage from the main branch.

## Features

- **OAuth Authentication**: Secure authentication flow with Supabase integration
- **MCP Server Implementation**: Full implementation of the Model Context Protocol
- **Tool Registry**: Register and manage tools for AI models to use
- **Cloudflare Workers Deployment**: Global distribution with low latency
- **TypeScript & Zod**: Type-safe code and schema validation

## Architecture

Kollektiv MCP consists of several key components:

- **OAuth Provider**: Handles authentication flow and token management
- **Web Application**: Built with Hono framework for routes and API endpoints
- **MCP Server**: Implements the Model Context Protocol for tool execution
- **MCP Tools**: Implementations of functionality that AI models can use
- **Storage**: Uses Cloudflare KV and Supabase for data persistence

## Getting Started

### Requirements

- **Node.js**: Version 22 or higher (required for compatibility with Cloudflare Workers)
- **npm**: Latest version recommended

> **Note on Node.js Version**: This project requires Node.js 22+ to align with the latest Cloudflare Workers runtime environment. Node.js 20 is considered outdated for this project as it lacks some of the modern JavaScript features utilized by the codebase and the Cloudflare Workers platform.

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-org/kollektiv-mcp.git

# Install dependencies
cd kollektiv-mcp
npm install

# Run locally
npm run dev
```

### Deployment

```bash
# Create KV namespace for OAuth
npx wrangler kv namespace create OAUTH_KV

# Deploy to Cloudflare
npm run deploy
```

## Connecting to the MCP Server

### Using the MCP Inspector

```bash
npx @modelcontextprotocol/inspector
```

Then connect to your server at `http://localhost:8787/sse` (local) or your deployed URL.

### Connecting Claude Desktop

Update your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "kollektiv": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/sse"
      ]
    }
  }
}
```

## Security

Kollektiv MCP implements several security measures:

- OAuth 2.0 for secure authentication
- Token-based authorization for API access
- Strict schema validation for all tool inputs
- HTTPS for all communications

## License

[Your License Here]

## CI/CD

This project uses GitHub Actions for continuous integration:

- **Linting & Formatting**: Uses Biome to ensure code quality
- **Type Checking**: Generates TypeScript types with Wrangler
- **Testing**: Runs all tests with Vitest
- **Coverage Reporting**: Uploads coverage reports to Codecov
- **Deployment Validation**: Performs a dry run deployment to catch issues early

The workflow runs on all pull requests and pushes to the main branch.

## Technical Details

### Technology Stack Explained

- **TypeScript 5.5**: Latest version with improved type checking and performance
- **Cloudflare Workers 4.12**: Serverless platform with global distribution and low latency
- **Hono 4.7**: Lightweight, fast web framework optimized for edge computing
- **Supabase 2.49**: Open-source Firebase alternative for authentication and data storage
- **MCP SDK 1.10**: Official Model Context Protocol SDK for standardized AI tool interactions
- **Zod 3.24**: TypeScript-first schema validation with runtime type checking
- **Vitest 3.1**: Fast, modern testing framework compatible with Cloudflare Workers

### Development Environment

- **Wrangler**: Cloudflare's CLI tool for Workers development and deployment
- **Biome**: Fast linter and formatter replacing ESLint and Prettier
- **Husky**: Git hooks for code quality checks before commits
- **Codecov**: Automated code coverage reporting and visualization

### Project Structure

- **/src**: Source code for the MCP server implementation
- **/tests**: Unit, integration, and end-to-end tests
- **/public**: Static assets served by the Workers
- **/docs**: Project documentation including architecture overview

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.