# Kollektiv MCP

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-4.12-orange.svg)](https://workers.cloudflare.com/)
[![Hono](https://img.shields.io/badge/Hono-4.7-brightgreen.svg)](https://hono.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.49-blueviolet.svg)](https://supabase.io/)
[![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.10-yellow.svg)](https://modelcontextprotocol.io/)
[![Zod](https://img.shields.io/badge/Zod-3.24-red.svg)](https://zod.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-3.1-green.svg)](https://vitest.dev/)

## Overview

Kollektiv MCP is a remote Model Context Protocol (MCP) server running on Cloudflare Workers. It provides a platform for AI models like Claude to access tools and services through a standardized protocol.

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

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.