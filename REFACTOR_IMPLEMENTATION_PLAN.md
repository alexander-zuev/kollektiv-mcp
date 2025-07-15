# Kollektiv MCP Refactor Implementation Plan

## Executive Summary

This plan outlines the comprehensive refactoring of Kollektiv MCP from a 3-service architecture (MCP Worker + Frontend + FastAPI Backend) into a unified Cloudflare Worker that serves MCP tools, API routes, and a React SPA. The refactor will leverage Cloudflare AutoRAG for improved performance, support 15-20MB files, and maintain all existing MCP functionality while expanding capabilities.

## Current State Analysis

### Existing Architecture
- **MCP Worker** (current): OAuth + MCP server at `/mcp` and `/sse` endpoints
- **Frontend** (external): React SPA hosted separately at `thekollektiv.ai`
- **Backend** (external): FastAPI service at `api.thekollektiv.ai`

### Current MCP Tools
1. **`list_uploaded_documents`** - Returns user's uploaded documents
2. **`execute_rag_search`** - Semantic search with RAG over user documents

### Current Tech Stack
- Cloudflare Workers with Durable Objects (KollektivMCP with SQLite)
- OAuth via `@cloudflare/workers-oauth-provider`
- Hono framework for web routes
- Supabase authentication
- External FastAPI for document processing

## Target Architecture

### Single Worker Design
```
Unified Cloudflare Worker
├── MCP Server (existing endpoints)
│   ├── /mcp (MCP protocol)
│   └── /sse (Server-Sent Events)
├── API Routes (new/migrated)
│   ├── /api/documents
│   ├── /api/upload
│   ├── /api/autorag/*
│   └── Container execution routes
├── React SPA (new)
│   ├── / (landing page)
│   ├── /dashboard
│   ├── /upload
│   └── /settings
└── Static Assets
    └── /public/* (compiled React assets)
```

## Implementation Phases

### Phase 1: Foundation & React SPA Integration (Week 1-2)

#### 1.1 Cloudflare Workers + React SPA Setup

**Research Findings:**
- Use Vite + Cloudflare Vite plugin for React SPA
- Configure `assets.not_found_handling = "single_page_application"` in wrangler.jsonc
- Use `assets_navigation_prefers_asset_serving` compatibility flag (2025-04-01+)
- Implement routing control with `run_worker_first` for API routes

**Configuration Updates:**
```jsonc
// wrangler.jsonc additions
{
  "compatibility_date": "2025-04-01",
  "compatibility_flags": [
    "nodejs_compat",
    "assets_navigation_prefers_asset_serving"
  ],
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application",
    "run_worker_first": [
      "/api/*",
      "/mcp",
      "/sse",
      "/authorize",
      "/token",
      "/register"
    ]
  }
}
```

**Directory Structure:**
```
src/
├── react-spa/          # React SPA source
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── main.tsx
├── worker/            # Worker entry point
│   └── index.ts
├── shared/            # Shared utilities
│   └── styles/        # Design system
└── web/               # Hono app (existing)
```

#### 1.2 Build System & Development Workflow
- Integrate Vite build process for React SPA
- Update package.json scripts for dual compilation
- Configure hot reload for both Worker and SPA development

### Phase 2: Cloudflare Container Integration (Week 2-3)

#### 2.1 Container Binding Configuration

**Research Findings:**
- Containers available in public beta (June 2025)
- On-demand container instances via `env.CODE_EXECUTOR.get(id)`
- Containers boot near incoming requests globally
- Pay only for active runtime
- Support Python/FastAPI in containers

**Implementation:**
```jsonc
// wrangler.jsonc additions
{
  "containers": [
    {
      "class_name": "DocumentProcessor",
      "image": "./containers/processor/Dockerfile",
      "instances": 3,
      "name": "kollektiv-document-processor",
      "default_port": 8000,
      "sleep_after": "5m"
    }
  ]
}
```

#### 2.2 Container API Design
```typescript
// New API routes for container operations
interface ContainerAPI {
  "/api/upload": DocumentUpload      // Route to container for processing
  "/api/process": ProcessingStatus   // Check processing status
  "/api/extract": TextExtraction     // Container-based text extraction
}
```

#### 2.3 Migration Strategy
**Option A: Full Container Migration**
- Migrate entire FastAPI service to container
- Benefits: Complete feature parity, faster development
- Considerations: Container startup overhead

**Option B: Hybrid Approach**
- Keep lightweight operations in Worker
- Route heavy processing to containers
- Benefits: Optimal performance per use case

**Recommendation: Option B** for optimal cost/performance balance

### Phase 3: AutoRAG Integration (Week 3-4)

#### 3.1 Cloudflare AutoRAG Migration

**Research Findings:**
- Fully managed RAG pipeline with automatic chunking/embedding
- Supports 15-20MB files via recursive chunking
- Chunk sizes: 64-512 tokens, overlap: 0-30%
- Built-in Vectorize integration
- 3-5x faster indexing performance in 2025

**Key Features:**
- Automatic file format detection (PDF, HTML, images, text)
- Conversion to structured Markdown
- Recursive chunking at natural boundaries
- Built-in embedding via Workers AI
- Metadata filtering by filename

#### 3.2 AutoRAG Configuration
```typescript
// AutoRAG binding configuration
interface AutoRAGConfig {
  chunkSize: 256,           // tokens (64-512 range)
  chunkOverlap: 0.15,       // 15% overlap
  topK: 5,                  // max retrieved chunks
  enableReranking: true,    // 2025 feature
  fileFilters: string[]     // metadata filtering
}
```

#### 3.3 File Size Optimization
**For 15-20MB Files:**
- Configure optimal chunk size (recommend: 256-384 tokens)
- Set 10-20% overlap for context preservation
- Implement progressive upload for large files
- Use R2 for file storage with AutoRAG integration

### Phase 4: Enhanced MCP Tools (Week 4-5)

#### 4.1 Existing Tool Enhancements

**Enhanced `execute_rag_search`:**
```typescript
interface EnhancedRagSearch {
  ragQuery: string;
  context: string;
  fileFilters?: string[];     // NEW: filter by filename
  chunkLimit?: number;        // NEW: control chunk count
  rerank?: boolean;          // NEW: enable reranking
}
```

**Enhanced `list_uploaded_documents`:**
```typescript
interface EnhancedDocumentList {
  includeMetadata: boolean;   // NEW: processing status, size, etc.
  filterBy?: {               // NEW: filtering options
    status: 'processing' | 'ready' | 'failed';
    uploadDate: DateRange;
    fileType: string[];
  }
}
```

#### 4.2 New MCP Tools

**1. `upload_document`**
```typescript
interface UploadDocumentTool {
  name: "upload_document";
  params: {
    content: string;          // Base64 encoded file
    filename: string;
    contentType: string;
    chunkingConfig?: ChunkConfig;
  };
}
```

**2. `query_with_context`**
```typescript
interface QueryWithContextTool {
  name: "query_with_context";
  params: {
    query: string;
    conversationHistory: Array<{role: string, content: string}>;
    preferredSources?: string[];
    maxTokens?: number;
  };
}
```

**3. `analyze_document_structure`**
```typescript
interface AnalyzeDocumentTool {
  name: "analyze_document_structure";
  params: {
    documentId: string;
    analysisType: 'outline' | 'metadata' | 'summary' | 'full';
  };
}
```

**4. `batch_process_query`**
```typescript
interface BatchProcessTool {
  name: "batch_process_query";
  params: {
    queries: string[];
    combineResults: boolean;
    parallelExecution: boolean;
  };
}
```

**5. `manage_knowledge_base`**
```typescript
interface KnowledgeBaseTool {
  name: "manage_knowledge_base";
  params: {
    action: 'create' | 'delete' | 'list' | 'merge';
    kbName?: string;
    sourceDocuments?: string[];
  };
}
```

### Phase 5: React SPA Development (Week 5-6)

#### 5.1 Design System Integration
Following established architecture patterns:
- **Radix UI + Tailwind CSS v4** for component primitives
- **Token-based design system** with centralized styling
- **Responsive design** with mobile-first approach

#### 5.2 Core Pages

**Landing Page (`/`)**
- Hero section with MCP connection instructions
- Feature showcase
- Client compatibility matrix
- Getting started guide

**Dashboard (`/dashboard`)**
- Document library with status indicators
- Processing queue visualization
- Usage analytics
- Quick upload area

**Upload Interface (`/upload`)**
- Drag-and-drop file upload (15-20MB support)
- Real-time processing status
- Chunking configuration options
- Preview of extracted content

**Settings (`/settings`)**
- AutoRAG configuration
- Account management
- API key generation
- MCP connection strings

#### 5.3 State Management
- **Zustand** for global state
- **TanStack Query** for server state and caching
- **Real-time updates** via Server-Sent Events

### Phase 6: API Layer Development (Week 6-7)

#### 6.1 Unified API Design

**Document Management API:**
```typescript
interface DocumentAPI {
  "GET /api/documents": ListDocuments;
  "POST /api/documents/upload": UploadDocument;
  "DELETE /api/documents/:id": DeleteDocument;
  "GET /api/documents/:id/status": ProcessingStatus;
  "POST /api/documents/:id/reprocess": ReprocessDocument;
}
```

**AutoRAG API:**
```typescript
interface AutoRAGAPI {
  "POST /api/autorag/search": RAGSearch;
  "POST /api/autorag/configure": UpdateConfig;
  "GET /api/autorag/status": ServiceStatus;
  "POST /api/autorag/reindex": TriggerReindex;
}
```

**Analytics API:**
```typescript
interface AnalyticsAPI {
  "GET /api/analytics/usage": UsageMetrics;
  "GET /api/analytics/documents": DocumentMetrics;
  "GET /api/analytics/performance": PerformanceMetrics;
}
```

#### 6.2 Container Integration Points
- **Heavy Processing**: Route to containers for PDF parsing, OCR
- **ML Operations**: Container-based embedding generation (if needed)
- **Batch Operations**: Container-based bulk processing

### Phase 7: Testing & Performance Optimization (Week 7-8)

#### 7.1 Performance Targets
- **MCP Response Time**: < 200ms for search operations
- **File Processing**: < 30s for 15MB files
- **SPA Load Time**: FCP < 1.2s, LCP < 2.5s
- **API Response Time**: < 500ms p95

#### 7.2 Testing Strategy
```
tests/
├── integration/
│   ├── mcp-tools.test.ts      # MCP tool integration
│   ├── autorag.test.ts        # AutoRAG integration
│   └── spa-api.test.ts        # SPA-API integration
├── e2e/
│   ├── upload-flow.test.ts    # End-to-end upload
│   └── mcp-client.test.ts     # MCP client testing
└── performance/
    ├── load-testing.ts        # Load testing
    └── chunking-perf.ts       # Chunking performance
```

#### 7.3 Monitoring & Observability
- **AutoRAG metrics**: Processing time, chunk quality
- **Container metrics**: Startup time, resource usage
- **SPA performance**: Core Web Vitals
- **MCP usage**: Tool call frequency, success rates

## Technical Considerations

### Security
- **OAuth 2.1 flow** maintained via Supabase
- **CSRF protection** for all state-changing operations
- **File upload validation** with size/type restrictions
- **Container isolation** for document processing

### Scalability
- **Durable Objects** for user session management
- **AutoRAG scaling** handled by Cloudflare
- **Container auto-scaling** based on demand
- **R2 storage** for large file handling

### Error Handling
- **Graceful degradation** when containers unavailable
- **Retry logic** for AutoRAG operations
- **User feedback** for processing failures
- **Fallback modes** for critical operations

## Migration Strategy

### Data Migration
1. **Export existing documents** from current backend
2. **Migrate to R2** with metadata preservation
3. **Re-index via AutoRAG** with optimized chunking
4. **Validate search quality** against existing results

### Deployment Strategy
1. **Blue-green deployment** with traffic splitting
2. **Feature flags** for gradual rollout
3. **Monitoring dashboards** for migration health
4. **Rollback procedures** for critical issues

### User Communication
- **Migration timeline** communication
- **Feature enhancement** notifications
- **Client update** instructions
- **Support documentation** updates

## Success Metrics

### Performance Improvements
- **3-5x faster** document processing (AutoRAG)
- **50% reduction** in API response times
- **90% cost reduction** from infrastructure consolidation

### Feature Enhancements
- **15-20MB file support** (up from current limits)
- **5 new MCP tools** expanding functionality
- **Real-time processing** status updates
- **Advanced filtering** and search capabilities

### Developer Experience
- **Single deployment** instead of 3 services
- **Unified development** environment
- **Simplified monitoring** and debugging
- **Improved testing** workflow

## Risks & Mitigation

### Technical Risks
- **Container availability**: Plan fallback to current external API
- **AutoRAG limitations**: Maintain custom RAG as backup
- **File size limits**: Implement progressive upload strategy

### Business Risks
- **Migration downtime**: Use blue-green deployment
- **Feature regression**: Comprehensive testing suite
- **User adoption**: Gradual rollout with feedback loops

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| 1 | Week 1-2 | React SPA integration, build system |
| 2 | Week 2-3 | Container bindings, API migration planning |
| 3 | Week 3-4 | AutoRAG integration, large file support |
| 4 | Week 4-5 | Enhanced MCP tools, new capabilities |
| 5 | Week 5-6 | React SPA development, UI components |
| 6 | Week 6-7 | API layer, container integration |
| 7 | Week 7-8 | Testing, performance optimization |
| 8 | Week 8 | Migration, deployment, monitoring |

**Total Duration**: 8 weeks
**Go-live Target**: End of Week 8

## Conclusion

This refactor transforms Kollektiv MCP from a distributed 3-service architecture into a unified, high-performance Cloudflare Worker that leverages cutting-edge 2025 capabilities including AutoRAG, Container bindings, and advanced React SPA integration. The result will be faster processing, larger file support, expanded MCP functionality, and significantly simplified operations while maintaining all existing capabilities.