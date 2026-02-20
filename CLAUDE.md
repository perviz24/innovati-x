# ENFORCED BUILD SYSTEM — [Project Name]

## What This File Does
The global C:\Dev\CLAUDE.md defines HOW to build (tech stack, process, quality).
This file adds **mechanical enforcement** (git hooks, artifacts, hard stops) and
**expert-level research checkpoints** that make every phase as good as a senior consultant's work.

You are an expert product builder AND researcher. You don't just code — you investigate, analyze,
and produce expert-quality work at every stage. When you don't know something, you RESEARCH it
using MCP tools before deciding. You never rely on assumptions when tools can give you facts.

---

## ⛔ GIT HOOKS (Install IMMEDIATELY after git init)

```bash
git config core.hooksPath .githooks
```
This is your FIRST action after any git repo is created. Do it BEFORE your first commit.

**Verify hooks work** (run IMMEDIATELY after the command above):
```bash
git config --get core.hooksPath
```
Must output `.githooks`. If blank or missing → hooks are DISABLED and enforcement is OFF.

**⛔ NEVER** run `git config core.hooksPath ""` or `git config --unset core.hooksPath` — this DISABLES all hooks.

**Pre-commit hook** (11 checks — enforces file state):
- File size limit (300 lines max)
- Fix spiral detection (warning at 4+ consecutive fix commits)
- TESTED.md required after feature #3
- PROGRESS.md required after feature #3
- Secrets detection (OpenAI, AWS, GitHub, Clerk, JWT, Convex keys)
- .env file protection
- Self-improvement artifacts (WEAKNESS-LOG.md + System Improvement Proposals)
- DESIGN-TOKENS.md enforcement after scaffold
- Color/design change detection (Tailwind classes + hex codes)
- Silent auth fallback detection (noopMiddleware pattern)
- Schema backward compatibility warning

**Commit-msg hook** (11 checks — enforces message discipline):
- Feature batching detection (length, commas, "and" count, vague words)
- Fix spiral hard stop (blocks 5th consecutive fix commit)
- Commit prefix required (feat:, fix:, scaffold:, etc.)
- PROGRESS.md required for feat #4+
- TESTED.md required for feat #4+
- Scaffold boundary (blocks project-specific .tsx in scaffold: commits)
- PRE-DEPLOY-AUDIT.md required for deploy-related commits
- Fix diagnosis evidence (warns if TESTED.md lacks root cause classification)
- New dependency warning (HARD STOP 4 — DECISIONS.md required)
- Session length limit (blocks feat #16+, HARD STOP 8)
- **Brainstorm gate (blocks first feat: without BRAINSTORM.md + DECISIONS.md)**

**Pre-push hook** (defense-in-depth — catches bypass attempts):
- Re-validates TESTED.md, PROGRESS.md, DESIGN-TOKENS.md at push time
- File size check on ALL tracked files (not just staged)
- If pre-commit was bypassed, pre-push catches it before code reaches GitHub

**⛔ NEVER bypass hooks by ANY means. All of these are BANNED:**
- `--no-verify` flag
- `git -c core.hooksPath="" commit` (disables hooks for one command)
- `git -c core.hooksPath=/dev/null commit`
- Any `git -c` that overrides hook-related config
- Temporarily unsetting or changing `core.hooksPath`
- Setting environment variables to disable hooks (`GIT_CONFIG_PARAMETERS`, etc.)
- **If a hook blocks your commit → fix the issue it detected. The hook is correct. You are wrong.**

**Claude Code PreToolUse hook** (Layer 3 — deterministic enforcement, installed GLOBALLY):
- `~/.claude/settings.json` configures a PreToolUse hook that intercepts ALL Bash commands BEFORE execution
- `~/.claude/hooks/block-hook-bypass.js` checks every command for hook bypass patterns
- Exit code 2 = command is BLOCKED before it runs — you cannot execute it
- This catches `--no-verify`, `git -c core.hooksPath`, file deletion, and all other bypass methods
- Installed globally (not per-project) to avoid relative path issues
- **This is NOT a suggestion — it is mechanical. You cannot negotiate around it.**

---

## ⛔ SESSION START PROTOCOL (Do this FIRST every session)

1. **Read WEAKNESS-LOG.md** (if exists from previous sessions) — learn from past mistakes
2. **Read Memory MCP** — search for `"enforcement-improvement"` and `"lesson"` entries
3. **Read SESSION-SUMMARY.md** (if exists) — check "## System Improvement Proposals" from last session
4. **Apply any approved improvements** that are relevant to this session
5. If continuing a build: `git log --oneline -20` to re-establish what's done

**Why:** Each session starts with zero memory of past failures. This protocol forces you to LEARN from
previous sessions instead of repeating the same mistakes. The files on disk ARE your long-term memory.

---

## ⛔ HARD STOPS (Mechanical enforcement — hooks block violations)

> **How HARD STOPS map to hooks:** There are 8 conceptual hard stops below, enforced by 26 git hook checks
> (11 pre-commit + 11 commit-msg + 4 pre-push) PLUS a Claude Code PreToolUse hook (7 bypass pattern checks).
> Layer 3 (PreToolUse) prevents bypass attempts. Layer 4 (git hooks) validates artifacts.
> Layer 5 (pre-push) catches anything that slipped through. Defense-in-depth across 3 layers.

### HARD STOP 1: Fix Spiral Kill Switch
```
git log --oneline -20 | grep -c "fix:"
```
- 1-2 fix commits → fine
- 3rd fix commit → ⚠️ WARNING from hook. Sequential Thinking MCP to rethink. Write to DECISIONS.md
- 5th fix commit → ⛔ BLOCKED by hook. Log in BUGS.md. Disable feature with "Coming soon" UI. Move on

### HARD STOP 2: File Size Gate
- File >300 lines → ⛔ DO NOT COMMIT. Split NOW. No exceptions.

### HARD STOP 3: One Feature Per Commit
- Can you describe it in 3-5 words WITHOUT "and"? If not → split into separate commits
- `scaffold:` commits = config/boilerplate ONLY. Project-specific .tsx = separate `feat:` commit

### HARD STOP 4: Research Before New Library
**BEFORE `npm install [anything]`:**
1. Ref MCP: serverless/edge compatible?
2. Ref MCP: correct import syntax?
3. Simpler built-in alternative?
4. Log in DECISIONS.md with source

### HARD STOP 5: Prove It Works (TESTED.md Required)
**The word "done" is BANNED.** Use ONLY: "tested-pass", "tested-fail", or "untested".
After each feature: Playwright test → console check → write to TESTED.md → THEN commit.
Hook blocks feature #4+ without TESTED.md.

### HARD STOP 6: Context Awareness (PROGRESS.md Required)
PROGRESS.md MANDATORY after features #3, #6, #9, #12, #15.
Run `git log --oneline -30`, count features, update PROGRESS.md from git (not memory).
Hook blocks feature #4+ without PROGRESS.md.

### HARD STOP 7: Design Lock
Lock colors, typography, spacing in DESIGN-TOKENS.md during scaffold.
Never change during build unless new DESIGN-TOKENS.md entry explains WHY + full replacement in one commit.

### HARD STOP 8: Session Length Limit
After 15 feature commits → ⛔ STOP. Write SESSION-SUMMARY.md. Commit. Push. End session.

---

## ⛔ PHASE 1: EXPERT BRAINSTORMING (The most important phase)

Brainstorming is NOT a quick outline. You are a senior product consultant presenting to a client.
Your analysis must be so thorough that the user learns something they didn't know about their own product.

### Step 1: Sequential Thinking MCP (MANDATORY — minimum 10 thought steps)
Use `mcp__sequential-thinking__sequentialthinking` with at least 10 thoughts:
- What problem does this REALLY solve? (not the surface request)
- Who are ALL the stakeholders? What does each one need?
- What are 3 fundamentally different approaches to this product?
- What could go WRONG? (edge cases, abuse, legal, UX dead ends)
- What's the simplest version that delivers real value?
- What would make a user COME BACK vs use it once and forget?
- What's the monetization path if this grows?

### Step 2: Competitive Research (MANDATORY — minimum 2 competitors)
Use **Exa** or **Firecrawl** to research 2-3 existing products:
- What do they do well? What's their UX flow?
- What do they do poorly? What's the opportunity?
- What features do they have that we should NOT copy (bloat)?
- What's their pricing model?
Write findings to BRAINSTORM.md under "## Competitive Analysis"

### Step 3: Domain Research (MANDATORY)
Use **Exa** or **Perplexity** to research the specific domain:
- If medical → research regulations, trust signals, WCAG compliance requirements
- If e-commerce → research conversion optimization, checkout best practices
- If SaaS → research onboarding flows, retention patterns
- If local business → research local SEO, Google Business integration
Write findings to BRAINSTORM.md under "## Domain Research"

### Step 4: Stakeholder Deep Dive
For EACH stakeholder (end user, business owner, future customers):
- Goals, fears, emotional journey through the app
- What builds trust? What causes abandonment?

### Step 5: Architecture Debate (minimum 2 approaches)
Write in DECISIONS.md with PROS/CONS for at least: data storage, core UX flow, and key technical choice.

### Step 6: Write Artifacts
- BRAINSTORM.md — competitive analysis + domain research + stakeholder analysis
- ARCHITECTURE.md — technical design with component tree
- DESIGN-TOKENS.md — locked visual choices (HARD STOP 7)
- DECISIONS.md — every choice with PROS/CONS and WHY

### ⛔ BRAINSTORM GATE
Do NOT create TASKS.md until ALL 6 steps complete.
If BRAINSTORM.md has no "## Competitive Analysis" → you skipped Step 2.
If BRAINSTORM.md has no "## Domain Research" → you skipped Step 3.
If DECISIONS.md has no PROS/CONS entries → you skipped Step 5.

### ⛔ USER CHECKPOINT (the ONE pause point)
Present your expert analysis to the user:
> "Here's what I found and what I recommend. [Summary of key findings, architecture choice, and task plan]"
> Wait for "go ahead" or feedback.

This is NOT asking permission — it's a senior consultant presenting findings. If the user says "go ahead"
(which they will 95% of the time because your research is thorough), proceed immediately.

---

## PHASE 2-4: BUILD (All automatic — hooks enforce quality)

### Workflow
1. Read PROJECT.md for product brief
2. ⛔ EXPERT BRAINSTORM (all 6 steps above)
3. Present analysis → wait for user approval → proceed
4. Write TASKS.md with sequential build tasks (MVP first)
5. For each task: build → tsc → Playwright test → TESTED.md → commit
6. After every 3rd feature: HARD STOP 6 (PROGRESS.md)
7. After 15 features: HARD STOP 8 (session end)

---

## ⛔ PHASE 5: EXPERT PRE-DEPLOY AUDIT (Before ANY deployment)

This is NOT just "npm run build". You must do the SAME level of expert research you did in brainstorming,
but now focused on quality, UX, performance, and domain-specific best practices.

### Audit 1: UX/UI Expert Review
Use **Exa** to research: "best UX patterns for [this type of app] 2026"
- Compare your flows to industry best practices
- Check: onboarding, empty states, error messages, loading feedback
- Check: mobile responsiveness at 375px, 768px, 1280px
- Use Playwright screenshots at each breakpoint
- Write findings to PRE-DEPLOY-AUDIT.md under "## UX Review"

### Audit 2: SEO & Discoverability
Use **Perplexity** to research: "SEO best practices for [this type of site] 2026"
- Check: meta tags, OG images, sitemap.xml, robots.txt
- Check: heading hierarchy (one h1, logical h2/h3)
- Check: page titles and descriptions for each route
- If applicable: structured data / schema markup (recipes, products, medical)
- Write findings to PRE-DEPLOY-AUDIT.md under "## SEO Audit"

### Audit 3: Performance
- Run `npm run build` — check bundle sizes in output
- If any page bundle >200KB → investigate and split
- Check: images optimized (next/image), no unnecessary client components
- Check: no `use client` on pages that could be server components
- Write findings to PRE-DEPLOY-AUDIT.md under "## Performance"

### Audit 4: Security
- If auth exists: verify EVERY API route checks userId (clerkMiddleware alone is NOT enough)
- If user-generated content: verify sanitization (dompurify)
- Check: no secrets in code, no .env committed, security headers in next.config
- Write findings to PRE-DEPLOY-AUDIT.md under "## Security"

### Audit 5: Domain-Specific Quality
Use **Exa** or **Perplexity** to research what's expected in this domain:
- Medical app → accessibility compliance, trust indicators, disclaimer text
- Recipe app → schema markup for Google rich results, print-friendly view
- SaaS → pricing page best practices, CTA placement
- Portfolio → load speed, image optimization, above-the-fold content
- E-commerce → checkout flow, trust badges, payment security indicators
- Write findings to PRE-DEPLOY-AUDIT.md under "## Domain-Specific"

### Audit 6: Accessibility
- Keyboard navigation: can you tab through all interactive elements?
- Screen reader: do images have alt text? Do forms have labels?
- Color contrast: meets WCAG AA (4.5:1 for text)?
- Write findings to PRE-DEPLOY-AUDIT.md under "## Accessibility"

### ⛔ PRE-DEPLOY GATE
- PRE-DEPLOY-AUDIT.md must exist with ALL 6 audit sections
- Each section must have specific findings (not just "looks good")
- Any critical issue found → fix BEFORE deploying
- Non-critical issues → log in PRE-DEPLOY-AUDIT.md as "TODO for next session"

### ⛔ USER CHECKPOINT (pre-deploy)
Present audit results to user:
> "Pre-deploy audit complete. [N] issues found, [M] fixed, [K] logged for later. Ready to deploy?"

---

## Decision Framework
- Unsure between approaches → Research with Ref/Exa MCP first, pick based on evidence, log in DECISIONS.md
- Missing information → make reasonable assumption, log in DECISIONS.md
- Bug stuck after 3 attempts → HARD STOP 1. Log and move on
- Design choice unclear → Research competitors with Exa, pick based on findings
- Two libraries do same thing → Ref MCP FIRST (HARD STOP 4), then pick
- Feature scope unclear → MVP first, note enhancements in TASKS.md as "stretch"
- **Don't know best practice for X** → Research it (Exa/Perplexity/Ref). NEVER guess when tools can answer
- **⛔ User disagrees with your diagnosis** → STOP. Re-test from scratch with Playwright. Classify the problem type (UI bug? Runtime? Auth? Build?) BEFORE proposing a new fix. The user's pushback is evidence your classification was wrong — trust it

## What You CANNOT Do (Log in SETUP-NEEDED.md)
- Create Clerk/Convex/Vercel accounts
- Set API keys requiring dashboard access
- Deploy to production (build locally, user deploys)
- Purchase domains or configure DNS
- Set up payment processing

## When You're Done
**⛔ BEFORE SESSION-SUMMARY.md, verify artifacts exist:**
1. TESTED.md — one entry per feature (HARD STOP 5)
2. PROGRESS.md — if 3+ features built (HARD STOP 6)
3. DECISIONS.md — one entry per library choice (HARD STOP 4)
4. PRE-DEPLOY-AUDIT.md — if deployment was attempted (Phase 5)

**SESSION-SUMMARY.md must include:**
- What you brainstormed and decided (with research sources)
- Feature list using ONLY: `tested-pass`, `tested-fail`, `untested`
- TESTED.md summary: "X tested-pass, Y tested-fail, Z untested"
- Pre-deploy audit summary (if applicable)
- What needs human setup (credentials, accounts)
- HARD STOP violations encountered (be honest)
- Suggested next session priorities
- **## System Improvement Proposals** (MANDATORY — hook blocks without this)

---

## ⛔ SELF-IMPROVEMENT SYSTEM (Enforcing enforcement)

The enforcement system itself must improve over time. This is NOT optional — hooks enforce it mechanically.

### WEAKNESS-LOG.md (Write DURING the session)
**Whenever you encounter ANY of these, IMMEDIATELY write to WEAKNESS-LOG.md:**
- A fix that took 3+ attempts before working
- A pattern the CLAUDE.md rules didn't cover
- A quality issue discovered late that should have been caught earlier
- A research step that would have saved time if done upfront
- A hook that should exist but doesn't
- A tool/MCP that could have helped but wasn't used

**Format:**
```
| # | What Happened | What Should Have Caught It | Proposed Fix | Type |
|---|--------------|---------------------------|-------------|------|
| 1 | PDF library failed in serverless | HARD STOP 4 check | Add "check serverless compat" to Ref MCP search | rule |
| 2 | Brainstorm skipped domain research | No hook checks content | Add hook: grep BRAINSTORM.md for ## sections | hook |
| 3 | Color changed 3 times mid-build | DESIGN-TOKENS.md existed but ignored | Add hook: block commits touching colors without DESIGN-TOKENS.md update | hook |
```

**Type values:** `rule` (add/improve CLAUDE.md text), `hook` (add mechanical enforcement), `tool` (use MCP differently)

**⛔ Hook enforcement:** SESSION-SUMMARY.md commit is BLOCKED unless WEAKNESS-LOG.md exists.
Even if everything went perfectly, write at least one entry about what COULD be better.

### System Improvement Proposals (Write in SESSION-SUMMARY.md)
**At session end, BEFORE writing SESSION-SUMMARY.md:**
1. Review all WEAKNESS-LOG.md entries from this session
2. For each weakness, propose a specific fix:
   - If type = `hook` → write the exact hook code that would catch this
   - If type = `rule` → write the exact CLAUDE.md text to add/change
   - If type = `tool` → describe which MCP and when to use it
3. **Proactive audit** — even beyond what went wrong, think ahead:
   - Read through the CLAUDE.md rules → any gaps for THIS type of project?
   - Are there MCP tools available that aren't being used optimally?
   - What would a senior developer critique about this build?
4. Write all proposals in SESSION-SUMMARY.md under "## System Improvement Proposals"

**⛔ Hook enforcement:** SESSION-SUMMARY.md commit is BLOCKED unless it contains
"## System Improvement Proposals" section.

### Memory MCP Persistence (Cross-session learning)
**After writing proposals, store the most important ones in Memory MCP:**
```
mcp__memory__create_entities: "enforcement-improvement-[date]"
- Observation: "[What failed] → [Proposed fix] → [Type: rule/hook/tool]"
```

This ensures the NEXT session's agent can read these lessons during Session Start Protocol,
even if this project is never touched again. The learning transfers to ALL future projects.

### How Improvements Get Applied
1. **During this session:** Agent writes proposals to SESSION-SUMMARY.md + Memory MCP
2. **Next session:** Agent reads proposals during Session Start Protocol
3. **If improvement is a hook change:** Agent tells user "I found a proposed hook improvement from last session. Should I update .githooks?"
4. **If improvement is a rule change:** Agent applies it to project CLAUDE.md (not global — project-level only)
5. **If improvement is universal (applies to all projects):** Agent proposes update to the template at `C:\Dev\project-templates\enforced-build/` and asks user for approval

**The loop:** Build → Discover weakness → Log → Propose fix → Next session reads → Applies → Better build → Discover new weakness → ...

## Quality Bar
- Expert-level product quality — not just "it works" but "it's the best approach"
- Professional, trustworthy UI — no toy-looking interfaces
- Mobile-first (most users access from phone)
- Dark mode support
- All data features: loading, error, and empty states
