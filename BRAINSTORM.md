# BRAINSTORM — Innovati-X

## 1. Problem Statement
Build an AI-powered innovation engine that takes any challenge/problem, analyzes it through multiple innovation methodologies, searches for existing solutions, generates novel approaches, checks patent landscape, and presents results with interactive canvas visualizations. Must be fully functional for university presentation.

## Competitive Analysis
- **AutoTRIZ**: Focuses solely on TRIZ methodology — narrow scope
- **Jeda.ai**: AI whiteboard — no structured innovation pipeline
- **Patsnap Eureka**: Patent-focused — lacks multi-methodology generation
- **Cypris**: Patent search tool — no innovation generation
- **MUSE (CMU)**: Research project — not production-ready

**Our Differentiator**: Full 6-methodology pipeline + scoring + patent check + interactive canvas — no competitor covers all stages.

## Domain Research
Innovation methodology best practices from academic literature:
- TRIZ is the most academically validated systematic innovation method (Altshuller, 40 inventive principles)
- Design Thinking is standard at Stanford d.school and IDEO — empathy mapping, ideation, prototyping
- Blue Ocean Strategy proven in MBA programs worldwide — value curve analysis
- Biomimicry gaining traction in sustainable design — AskNature.org database
- First Principles reasoning popularized by SpaceX/Tesla — decompose to axioms, rebuild
- SCAMPER widely used in creative industries — structured brainstorming operators
- Multi-methodology approaches show higher solution diversity (Creativity Research Journal, 2019)

## 3. User Flow
1. User describes challenge on input page
2. AI decomposes problem into components, constraints, assumptions
3. Deep research via Exa (web) + Perplexity (academic/patents)
4. Gap analysis identifies what existing solutions miss
5. Innovation generation applies all 6 methodologies (TRIZ, SCAMPER, Design Thinking, Blue Ocean, Biomimicry, First Principles)
6. Scoring matrix ranks solutions (6 dimensions radar chart)
7. Patent landscape check for conflicts and white spaces
8. Results displayed with citations, comparison view, and interactive canvas (flowchart + mind map)
9. Professional PDF export for presentations

## 4. Innovation Methodologies Selected
| Methodology | Why Selected |
|---|---|
| TRIZ | Systematic engineering problem solving — 40 inventive principles |
| SCAMPER | Creative transformation operators — divergent thinking |
| Design Thinking | Human-centered reframing — empathy-driven |
| Blue Ocean Strategy | Market-level innovation — uncontested spaces |
| Biomimicry | Nature-inspired solutions — novel cross-domain |
| First Principles | Fundamental reasoning — breaks conventional assumptions |

## 5. Tech Stack Decisions
- **AI Pipeline**: Vercel AI SDK + Claude (thinking) + Exa API (web search) + Perplexity API (deep research)
- **Canvas**: React Flow (@xyflow/react) with elkjs for auto-layout
- **Scoring**: Recharts radar/spider charts
- **PDF**: jsPDF + html2canvas for client-side generation
- **Database**: Convex (real-time, serverless)
- **Auth**: Clerk
- **Framework**: Next.js 16 + React 19 + TypeScript + Tailwind + shadcn/ui

## 6. Key Design Decisions
- Dark theme default (professional, presentation-friendly)
- Violet/indigo primary palette with amber highlights
- Two canvas views: flowchart (dagre layout) + mind map (radial layout)
- Users can add custom nodes to canvas
- All AI claims backed by source citations
- Innovation scoring: Novelty, Feasibility, Impact, Scalability, Cost Efficiency, Time to Market
