# Kollektiv MCP

[![TypeScript](https://img.shields.io/badge/dynamic/regex?url=https%3A%2F%2Fgithub.com%2Falexander-zuev%2Fkollektiv-mcp%2Fraw%2Fmain%2Fpackage.json&search=%22typescript%22%3A%5Cs*%22%5C%5E%3F(%5B0-9%5D%2B%5C.%5B0-9%5D%2B)&replace=%241&logo=typescript&label=TypeScript)](https://www.typescriptlang.org)
[![Runtime](https://img.shields.io/badge/Runtime-Cloudflare%20Workers-orange?logo=cloudflare)](https://workers.cloudflare.com/)
[![Auth Supabase](https://img.shields.io/badge/Auth-Supabase-3ecf8e?logo=supabase)](https://supabase.io/)
[![Build](https://github.com/alexander-zuev/kollektiv-mcp/actions/workflows/ci.yaml/badge.svg)](https://github.com/alexander-zuev/kollektiv-mcp/actions)
[![codecov](https://codecov.io/gh/alexander-zuev/kollektiv-mcp/graph/badge.svg)](https://codecov.io/gh/alexander-zuev/kollektiv-mcp)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue?logo=apache&logoColor=white)](LICENSE)

## 🧠 Your personal LLM knowledgebase

Kollektiv MCP enables you to build personal LLM knowledge base in seconds and use it from your
favorite editor / client. No more infrastructure setup, chunking, syncing - just upload your
data and start chatting. Supports all major MCP clients out of the box - Cursor, Windsurf,
Claude Desktop, etc.

> 🧪 Kollektiv is in early beta. If you
> experience any issues connecting to the MCP client, try
> going over [these steps](#connection-troubleshooting) first. If still unsuccessful please raise an
> issue
> [here](https://github.com/alexander-zuev/kollektiv-mcp/issues/new)

## 💿 Connection

The simplest way to connect to Kollektiv MCP is to copy & paste the following
configuration into your editor's `mcp.json` file. All clients (Cursor, Windsurf, Claude Desktop
/ Code / Cline / VSCode / PyCharm) support this `json` format

```json
{
  "mcpServers": {
    "kollektiv": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.thekollektiv.ai/mcp"
      ]
    }
  }
}
```

- **name:**
    - `kollektiv`- you can you give the server any descriptive name
- **command:**
    - `npx` - ensure you have node.js install before running this command
- **args:**
    - `-y` - this enables your shell to install `mcp-remote` which is currently required to connect
      to remote servers
    - `mcp-remote` - this enables your client to connect to a remote MCP server (in this case
      Kollektiv)
    - `https://mcp.thekollektiv.ai/mcp` - is the endpoint you are connecting to

Check out a quick demo below and see client-specific instructions.

![Connection Demo](./public/connection.gif)

### Cursor

Open Cursor and go to `Cursor Settings > MCP > Add new global MCP Server`. Paste the configuration
above and save (ctrl/cmd+s).

![Cursor Configuration](https://github.com/user-attachments/assets/997188be-bd52-4d80-a03f-fbe17b8d7e38)

If configuration is successful and you haven't authenticated before, a browser window should
open guiding you to the login page.

> 💡After saving the `json` it might take a while for Cursor to connect to the MCP. You might
> need to restart Cursor or give it a bit of time. If you see 'Client is closed' or other errors,
> taking these [troubleshooting](#connection-troubleshooting) steps might help.

If the connection is successful, you should see Kollektiv MCP go green in the settings page:

![Successful Cursor connection](https://github.com/user-attachments/assets/edfbe166-ce2a-4775-ac5f-38d6776bd968)

### Windsurf

Open Windsurf and go to `Settings -> Windsurf Settings > MCP Servers > View raw config`.
Paste the configuration above and save (ctrl/cmd+s).

![Windsurf MCP configuration](https://github.com/user-attachments/assets/1f67953f-231d-4f6f-ba48-80982b849560)

If configuration is successful and you haven't authenticated before, a browser window should
open guiding you to the login page.

> 💡Windsurf, in contrast to other clients, in my experience requires a restart of the app to
> properly connect. If the server doesn't go 'green' after a while, try going over the
> [troubleshooting](#connection-troubleshooting) steps below.

If connection is successful you should see Kollektiv MCP go green in the settings page:

![Successful Windsurf configuration](https://github.com/user-attachments/assets/b0909516-55d7-47ec-9712-895fd2ae66b6)

### Claude for Desktop

Open Claude Desktop and go to `Settings -> Developer > Edit config`. Open `json` file in any
text / code editor, paste the configuration above and save (ctrl/cmd+s).

![Claude Desktop Configuration](https://github.com/user-attachments/assets/1f67953f-231d-4f6f-ba48-80982b849560)

If configuration is successful and you haven't authenticated before, a browser window should
open guiding you to the login page.

> 💡Claude for Desktop requires a restart of the app to properly connect. If the server doesn't go
> 'green' after a while, try going over the
> [troubleshooting](#connection-troubleshooting) steps below.

If connection is successful you should see Kollektiv MCP go green in the settings page:

![Successful Claude For Desktop](https://github.com/user-attachments/assets/530c32e7-72f4-4d3f-a88d-d6062b5b617a)

### VS Code

Open VS Code and go to `Settings -> MCP: Add server > Command (stdio)`:

- **command:**
    - `npx -y mcp-remote https://mcp.thekollektiv.ai/mcp`
- **name:**
    - give your server a descriptive name such as `kollektiv`

Your configuration `settings.json` should look similar to this:

```json
{
  "chat.mcp.discovery.enabled": true,
  "chat.mcp.enabled": true,
  "mcp": {
    "servers": {
      "kollektiv": {
        "type": "stdio",
        "command": "npx",
        "args": [
          "-y",
          "mcp-remote",
          "https://mcp.thekollektiv.ai/mcp"
        ]
      }
    }
  }
}
```

![VS Code Configuration](https://github.com/user-attachments/assets/2db10459-d10b-4997-88d4-1193fce0bef7)

Next steps:

- Click **Start** to connect to the MCP Server
    - if you are not authenticated - you will be taken to the authentication page
- Remember to add `"chat.mcp.enabled": true,` in your `settings.json`
- Switch to **Agent** mode

> 💡VS Code requires you to manually **start** your server, add `chat.mcp.enabled` and switch to
> Agent mode to use MCP. If you do not see MCP tools in Agent mode, try going over the
> [troubleshooting](#connection-troubleshooting) steps below.

If connection is successful you should see the tools exposed by Kollektiv MCP.

![Successful VS Code Connection](https://github.com/user-attachments/assets/b96132cc-6899-4f3e-ac9a-1eeb08de6bf2)

### Cline

Open Cline, click on `MCP Servers > Edit Configuration` and add the following configuration to your
`cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "kollektiv": {
      "timeout": 60,
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.thekollektiv.ai/mcp"
      ],
      "transportType": "stdio",
      "disabled": false
    }
  }
}
```

> Note: direct connections to remote servers that support Authorization are not supported yet by
> Cline.

If connection is successful, you will be taken through to the authentication flow. After logging
in, you should see Kollektiv MCP enabled in Cline.

![Cline Configuration](https://github.com/user-attachments/assets/eb32d843-4d09-482c-b4c3-63ca25356c1f)

### Others (PyCharm, Claude Code)

Most MCP clients follow the same `.json` format and should work with similar configuration steps
as previously mentioned clients:

1. Copy & paste configuration into your client's `json` configuration
2. Restart the app
3. Authenticate if not already
4. Kollektiv MCP should go green & be available in chat / agent mode

Success of your connection depends on many factors including but not limited to:

- how strong developers of a particular client wanted to support MCP connections
- whether the client supports the
  latest [MCP spec](https://modelcontextprotocol.io/specification/2025-03-26) with Oauth support

If you are experiencing issues, going through these
simple [troubleshooting steps](#connection-troubleshooting) might help.

### Supported clients

I've validated connection works to the following MCP clients:

- Cursor ✅
- Windsurf ✅
- Claude Desktop ✅
- VS Code ✅
- Cline ✅

Other MCP clients _should_ be supported in theory, but in practice things might be a little
different. If you have a client you really want to connect to - let me know!

## 🎮 Usage

### Available Tools

- `/query_documents` — Submit a question to the documents you’ve uploaded to Kollektiv and
  receive an answer based on the sources from your documents.
- `/list_documents` — Return a list of your synced documents together with basic metadata.
- **Pro tip:** Include the phrase **“use Kollektiv MCP”** so the client knows to call these tools.

#### Usage Tips

- **Always add "use Kollektiv MCP"** — This tells the client which MCP server to use.
- **Wait for document to be Available** — After upload, it takes 1–2 minutes before the document can
  be queried.
- **Rephrase queries when needed** — If the client generates a poor query, edit or rewrite it
  yourself.

## ❓ Troubleshooting & Support

This MCP server uses Cloudflare Agents SDK as well as other libraries to provide the most modern
way for users to connect to and use MCP servers. MCP clients on the other hand have yet to
implement support for the 2 critical pieces:

- remote MCP servers
- MCP server authorization

In case you experience connection issues, please go through the following troubleshooting steps
which should help you connect to the MCP server.

### Support

If you require additional support please open a GitHub issue or reach out at support@thekollektiv.ai

### Connection Troubleshooting

If you are getting **Invalid Authorization Request** error as below or can not connect for
another reason, try going through the steps below which should fix the issue.

![Invalid Authorization Request](https://github.com/user-attachments/assets/87eb6d1f-6dd7-450a-a059-9e88bba68dcd)

1. **Ensure you're connecting to the correct endpoint**:
    - Use `https://mcp.thekollektiv.ai/mcp` as the MCP endpoint.

2. **Clean mcp-remote cache**:
    - What this does:
        - Removes cache of `mcp-remote` library that is used to connect to the remote server from a
          client that doesn't support remote connections
    - How:
        - Run the following command in your terminal

```bash
# MacOS
rm -rf ~/.mcp-auth  

# Windows
Remove-Item -Recurse -Force "$env:USERPROFILE\.mcp-auth"
```

3. **Clear your browser data & cookies**:
    - What this does:
        - Removes browser cookies which are used to store authentication information when logging
          into Kollektiv.
    - How:
        - Open your browser settings and delete browsing data for the last several hours

> ⚠️ Note: this will sign you out from all active sessions, including Kollektiv. Only do this if
> you're stuck in a broken login flow.

4. **Restart your MCP client and try to reconnect to the MCP server:**
    - What this does:
        - MCP clients (Cursor, Windsurf, etc.) often cache connection / configuration settings from
          previous runs which might interfere with authentication.
    - How:
        - Restart your editor / client
        - Try reconnecting to the MCP server

### Using MCP Inspector

For debugging purposes, you can use the MCP Inspector to connect to Kollektiv MCP server.

```bash
npx @modelcontextprotocol/inspector
```

Select either SSE or Streamable HTTP transport

- SSE: connect to the server at `https://mcp.thekollektiv.ai/sse`
- Streamable HTTP: connect to the server at `https://mcp.thekollektiv.ai/mcp`

## 🛠️ Implementation Details (for the 🤓)

> If you're just here for Kollektiv - skip this. This section is for devs and builders curious
> about how it works.

Kollektiv MCP is part of a modular system enabling users to set up RAG over their data
in seconds — without the need to manage infrastructure, pipelines, or model configs.

It consists of three independently deployed services:

- **MCP Server (Cloudflare Worker)**  
  [`https://mcp.thekollektiv.ai`](https://mcp.thekollektiv.ai)  
  Acts as a secure gateway for clients to interact with indexed data via the Model Context
  Protocol. Supports OAuth.

- **Frontend (React + Vite Worker)**  
  [`https://thekollektiv.ai`](https://thekollektiv.ai)  
  A clean, minimal user interface for uploading and managing their content.

- **Backend (FastAPI)**  
  [`https://api.thekollektiv.ai`](https://api.thekollektiv.ai)  
  Handles source ingestion, validation, and orchestration of a RAG pipeline.

## 🔐 Security

Kollektiv MCP implements several security measures:

- Sign-in happens via the standard **OAuth 2.1 “Authorization Code” flow** powered by Supabase; only
  short-lived, `HttpOnly`, `Secure` cookies are stored—no passwords ever touch this server.
- All traffic is served **exclusively over HTTPS through Cloudflare’s edge**, and every sensitive
  POST request carries a one-time CSRF/transaction token.
- The backend runs inside the **Cloudflare Workers sandbox** (no local file-system, no long-running
  processes), drastically reducing the attack surface.

  For detailed disclosure guidelines see [SECURITY.md](./SECURITY.md).

## 🪪 License

Released under the Apache License 2.0 — commercial support or alternative licensing:
azuev@outlook.com