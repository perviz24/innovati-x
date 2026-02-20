# DECISIONS — Innovati-X

## Architecture Decisions

### 1. AI Pipeline: Server-side API routes (not MCP at runtime)
**Decision**: Use direct API calls (Anthropic SDK, Exa SDK, Perplexity via AI SDK) in Next.js API routes
**Pros**: Works in production, user-facing, standard deployment
**Cons**: Need to manage API keys, rate limits
**Why**: MCP tools are dev-time only — cannot run in deployed app

### 2. Canvas: React Flow (@xyflow/react) with elkjs
**Decision**: Use React Flow for both flowchart and mind map views
**Pros**: Mature library, custom nodes, built-in interactions (drag, zoom, pan), elkjs handles auto-layout
**Cons**: Bundle size (~150KB), learning curve for custom nodes
**Alternative considered**: D3.js (too low-level, more work), Mermaid (no interactivity)

### 3. Database: Convex (not Supabase)
**Decision**: Convex for all data storage
**Pros**: Real-time subscriptions, serverless, TypeScript-first, built-in file storage
**Cons**: NoSQL only (no complex joins)
**Why**: Default stack per CLAUDE.md, real-time updates during AI pipeline execution

### 4. Scoring: Recharts radar chart
**Decision**: Use Recharts for innovation scoring visualization
**Pros**: React-native, good radar/spider chart support, lightweight
**Alternative considered**: Chart.js (requires wrapper), Nivo (heavier)

### 5. PDF Export: jsPDF + html2canvas
**Decision**: Client-side PDF generation
**Pros**: No server load, works offline, captures styled content
**Cons**: Limited formatting control vs server-side
**Alternative considered**: Puppeteer server-side (too heavy for Vercel)

### 6. Two Canvas Views (not one)
**Decision**: Both flowchart AND mind map views available
**Pros**: Flowchart shows process/pipeline, mind map shows relationships/exploration
**Cons**: More development time
**Why**: User explicitly requested both views for university presentation

### 7. All 6 Methodologies (no trimming)
**Decision**: Implement all 6 innovation methodologies
**Pros**: Comprehensive analysis, academic credibility
**Cons**: More complex AI prompts, longer generation time
**Why**: User wants all 6 for university presentation
