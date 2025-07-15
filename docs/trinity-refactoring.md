# Trinity Refactoring Plan

Overall goal is to unify Kollektiv into a single Cloudflare based worker and transition from a
custom RAG pipeline to an AutoRAG based pipeline.

DoD:

- Users can upload text based files (same selection as before) and chat to them
- RAG endpoints are served by Cloudflare (measure response latency and potentially add streaming
  if possible)
- All three services are served from a single worker
    - React SPA
    - 