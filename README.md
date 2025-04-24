# Kollektiv MCP

[![TypeScript](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Falexander-zuev%2Fkollektiv-mcp%2Fmain%2Fpackage.json&query=$.devDependencies.typescript&label=TypeScript&prefix=v&color=3178c6)](https://www.typescriptlang.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-%F0%9F%92%A0-orange)](https://workers.cloudflare.com/)
[![Auth](https://img.shields.io/badge/Auth:Supabase-neongreen.svg)](https://supabase.io/)
[![Build](https://github.com/alexander-zuev/kollektiv-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/alexander-zuev/kollektiv-mcp/actions)
[![codecov](https://codecov.io/gh/alexander-zuev/kollektiv-mcp/graph/badge.svg)](https://codecov.io/gh/alexander-zuev/kollektiv-mcp)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

> 🧪Pre-release version:
> This MCP server is still under development and is not ready for production use yet.

## Overview

Kollektiv MCP is a remote Model Context Protocol (MCP) server running on Cloudflare Workers. It
enables users to use RAG over their own documents from IDEs such as Cursor, Windsurf,
Claude Desktop, or other MCP-compatible clients.

## Architecture

Kollektiv MCP Server consists of several key components:

- Oauth provider (`workers-oauth-provider` & `Supabase Auth`): MCP server implements the provider
  side of Oauth 2.0 to enable users to
  authenticate with the MCP server easily (Oauth + Email).
- MCP server (`Cloudflare Agent SDK`): Exposes various tools following MCP protocol.
- Web server (`Hono`): Wraps all non-mcp related functionality (e.g. authentication, static files,
  etc.)

And is part of the Kollektiv application which consists of:

- MCP server (Cloudflare worker) -> acts as the main interface for users to interact with their
  documents
- Backend server (FastAPI server) -> handles all processing, retrieval, and storage of users'
  documents
- Frontend server (React/Vite server) -> serves as the interface for users to upload their
  documents and onboard to the
  MCP server

## Getting Started

### Local Development

### Deployment

## Connecting to the MCP Server

You can connect to the MCP server using any MCP-compatible client such as Cursor, Windsurf, or
Claude Desktop by configuring connection details as follows:

```json
{
  "mcpServers": {
    "kollektiv-mcp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.thekollektiv.ai"
      ]
    }
  }
}
```

- `kollektiv-mcp` -> you can use any name you want
- `command` -> `npx`
- `args` -> `mcp-remote` and the URL of the MCP server. Use `http://localhost:8787/sse` for local
  development.

Connecting clients (Cursor, Windsurf, etc.) is done in much the same way as above. You can find
documentation on how to your particular client on their respective websites.

### Using the MCP Inspector

For debugging purposes, you can use the MCP Inspector to connect to your MCP server.

```bash
npx @modelcontextprotocol/inspector
```

Then connect to the server at `http://localhost:8787/sse` (local) or `https://mcp.thekollektiv.ai`
(production).

## Security (to be enhanced)

Kollektiv MCP implements several security measures:

- OAuth 2.0 for secure authentication
- HTTPS for all communications
- Cookies? Signed?

## Technical Details

### Technology Stack Explained

- MCP Server
- Backend server
- Frontend server

### Project Structure

- **/src**: Source code for the MCP server implementation
- **/tests**: Unit, integration, and end-to-end tests
- **/public**: Static assets served by Worker
- **/docs**: Internal project documentation

## License

Released under the Apache License 2.0 — commercial support or alternative licensing:
azuev@outlook.com