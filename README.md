# Kollektiv MCP

[![TypeScript](https://img.shields.io/badge/dynamic/regex?url=https%3A%2F%2Fgithub.com%2Falexander-zuev%2Fkollektiv-mcp%2Fraw%2Fmain%2Fpackage.json&search=%22typescript%22%3A%5Cs*%22%5C%5E%3F(%5B0-9%5D%2B%5C.%5B0-9%5D%2B)&replace=%241&logo=typescript&label=TypeScript)](https://www.typescriptlang.org)
[![Runtime](https://img.shields.io/badge/Runtime-Cloudflare%20Workers-orange?logo=cloudflare)](https://workers.cloudflare.com/)
[![Auth Supabase](https://img.shields.io/badge/Auth-Supabase-3ecf8e?logo=supabase)](https://supabase.io/)
[![Build](https://github.com/alexander-zuev/kollektiv-mcp/actions/workflows/ci.yaml/badge.svg)](https://github.com/alexander-zuev/kollektiv-mcp/actions)
[![codecov](https://codecov.io/gh/alexander-zuev/kollektiv-mcp/graph/badge.svg)](https://codecov.io/gh/alexander-zuev/kollektiv-mcp)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue?logo=apache&logoColor=white)](LICENSE)

> 🧪 Kollektiv is in Beta:
> There are still some rough edges - if you spot one,
> please [open an issue](https://github.com/alexander-zuev/kollektiv-mcp/issues/new)!

## Overview

Kollektiv MCP enables you to setup RAG over your data in seconds. No more infrastructure setup,
chunking, syncing -> just upload your data and start chatting. Supports all major MCP clients
out of the box - Cursor, Windsurf, Claude Desktop, etc.

## Installation

The simplest way to install Kollektiv MCP (currently) is to copy & paste the following
configuration into your editor's `mcp.json` file:

```json
{
  "mcpServers": {
    "kollektiv": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.thekollektiv.ai/sse"
      ]
    }
  }
}
```

The configuration is the same, with the exception of Claude Desktop which recently added direct
support for connecting to remote MCP servers. Read client-specific sections below.

### Cursor

Open Cursor and go to `Cursor Settings > MCP > Add new global MCP Server`. Paste the configuration
above and save (ctrl/cmd+s).
![image](https://github.com/user-attachments/assets/b5f4ab86-1a84-475d-a191-4ad0e1f8e965)

### Windsurf

### Claude for Desktop

### Cline

### Others

## Troubleshooting

## Implementation details (for the 🤓):

> If you are a regular user, feel free to skip this section. This is aimed mostly at devs.

Kollektiv MCP is one part of a larger application. It enables users to simplify RAG setup over
personal data in a private and secure manner. It's essentially a gateway to your data and is
tighly integrate with the backend server (FastAPI) and frontend server (React).

Kollektiv MCP itself consists of three parts:

- Oauth provider (`workers-oauth-provider` & `Supabase Auth`): MCP server implements the provider
  side of Oauth 2.0 to enable users to
  authenticate with the MCP server easily (Oauth + Email).
- MCP server (`Cloudflare Agent SDK`): Exposes various tools following MCP protocol.
- Web server (`Hono`): Wraps all non-mcp related functionality (e.g. authentication, static files,
  etc.)

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

## License

Released under the Apache License 2.0 — commercial support or alternative licensing:
azuev@outlook.com