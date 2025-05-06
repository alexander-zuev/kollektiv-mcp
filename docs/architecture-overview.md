# Architecture Overview for Kollektiv MCP

This document provides a high-level overview of the Kollektiv MCP architecture, explaining the main components and how they interact with each other.

## Table of Contents

- [System Architecture](#system-architecture)
- [Key Components](#key-components)
- [Data Flow](#data-flow)
- [Authentication Flow](#authentication-flow)
- [Deployment Architecture](#deployment-architecture)
- [Security Considerations](#security-considerations)

## System Architecture

Kollektiv MCP is a remote Model Context Protocol (MCP) server running on Cloudflare Workers. It provides a platform for AI models like Claude to access tools and services through a standardized protocol. The system consists of several key components:

```
┌─────────────────────────────────────────────────────────────────┐
│                      Cloudflare Workers                          │
│                                                                  │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐    │
│  │             │     │             │     │                 │    │
│  │  OAuth      │────▶│  Web App    │────▶│  MCP Server     │    │
│  │  Provider   │     │  (Hono)     │     │                 │    │
│  │             │     │             │     │                 │    │
│  └─────────────┘     └─────────────┘     └─────────────────┘    │
│         │                   │                     │              │
│         │                   │                     │              │
│         ▼                   ▼                     ▼              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐    │
│  │             │     │             │     │                 │    │
│  │  KV Storage │     │  Supabase   │     │  MCP Tools      │    │
│  │  (OAuth)    │     │  Auth       │     │                 │    │
│  │             │     │             │     │                 │    │
│  └─────────────┘     └─────────────┘     └─────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Key Components

### 1. OAuth Provider

The OAuth Provider handles the authentication flow for the MCP server. It:
- Manages the OAuth authorization flow
- Handles token issuance and validation
- Integrates with Supabase for user authentication
- Uses Cloudflare KV for token storage

### 2. Web Application (Hono)

The web application is built using the Hono framework and handles:
- Web routes and API endpoints
- Authentication UI and flows
- Integration with Supabase for user management
- Serving static assets

### 3. MCP Server

The MCP Server implements the Model Context Protocol and:
- Registers and manages tools
- Handles tool execution requests from AI models
- Provides a Server-Sent Events (SSE) endpoint for real-time communication
- Validates tool inputs and formats outputs according to the MCP specification

### 4. MCP Tools

The MCP Tools are the actual implementations of functionality that AI models can use:
- Each tool has a schema (using Zod) that defines its inputs and outputs
- Tools can perform various functions like querying data, processing information, etc.
- Tools are registered with the MCP Server during initialization

### 5. Storage and External Services

- **Cloudflare KV**: Used for storing OAuth tokens and session data
- **Supabase**: Provides authentication and user management
- **Durable Objects**: Used for maintaining state across requests

## Data Flow

### Tool Registration Flow

1. During initialization, the MCP server loads all available tools from the tools directory
2. Each tool is registered with the MCP server with its name, schema, and handler function
3. The MCP server makes these tools available to clients through the MCP protocol

### Tool Execution Flow

1. An AI model connects to the MCP server via the SSE endpoint
2. The model requests to execute a specific tool with input parameters
3. The MCP server validates the input against the tool's schema
4. If valid, the tool's handler function is executed with the input
5. The result is returned to the AI model in the format specified by the MCP protocol

## Authentication Flow

The authentication flow follows these steps:

1. A client (e.g., Claude Desktop) initiates an authentication request to the `/authorize` endpoint
2. The user is presented with a login form
3. After successful login, the user is redirected back to the client with an authorization code
4. The client exchanges this code for access and refresh tokens
5. The client uses the access token to authenticate requests to the MCP server

```
┌─────────┐                 ┌─────────────┐                 ┌─────────────┐
│         │                 │             │                 │             │
│ Client  │◀───────────────▶│ OAuth       │◀───────────────▶│ Supabase    │
│         │                 │ Provider    │                 │ Auth        │
│         │                 │             │                 │             │
└─────────┘                 └─────────────┘                 └─────────────┘
     │                             │                               │
     │ 1. Request Authorization    │                               │
     │ --------------------------> │                               │
     │                             │                               │
     │ 2. Redirect to Login        │                               │
     │ <-------------------------- │                               │
     │                             │                               │
     │ 3. User Login               │                               │
     │ --------------------------> │                               │
     │                             │ 4. Authenticate User          │
     │                             │ --------------------------->  │
     │                             │                               │
     │                             │ 5. Auth Response              │
     │                             │ <---------------------------  │
     │                             │                               │
     │ 6. Authorization Code       │                               │
     │ <-------------------------- │                               │
     │                             │                               │
     │ 7. Exchange Code for Token  │                               │
     │ --------------------------> │                               │
     │                             │                               │
     │ 8. Access Token             │                               │
     │ <-------------------------- │                               │
     │                             │                               │
```

## Deployment Architecture

Kollektiv MCP is deployed on Cloudflare Workers, which provides:

- Global distribution with low latency
- Serverless execution model
- Built-in security features
- Integration with Cloudflare KV and Durable Objects

The deployment architecture includes:

- **Main Worker**: Handles all HTTP requests and implements the MCP server
- **KV Namespace**: Stores OAuth tokens and session data
- **Durable Objects**: Maintains state for the MCP server
- **Custom Domain**: Provides a dedicated endpoint for the MCP server

## Security Considerations

The Kollektiv MCP implementation includes several security measures:

### Authentication and Authorization

- OAuth 2.0 for secure authentication
- Token-based authorization for API access
- Secure token storage in Cloudflare KV
- Integration with Supabase for user management

### Input Validation

- Strict schema validation for all tool inputs using Zod
- Type checking with TypeScript
- Sanitization of user inputs

### Data Protection

- HTTPS for all communications
- Minimal data storage
- No persistent storage of sensitive information

### Rate Limiting and Abuse Prevention

- Cloudflare's built-in rate limiting
- Error handling to prevent information disclosure
- Logging of authentication attempts

## Conclusion

The Kollektiv MCP architecture provides a secure, scalable, and efficient platform for AI models to access tools and services through the Model Context Protocol. By leveraging Cloudflare Workers, the system benefits from global distribution, serverless execution, and built-in security features.