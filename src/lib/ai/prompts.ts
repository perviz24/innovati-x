// Prompt templates for each pipeline stage

export function decompositionPrompt(description: string) {
  return `You are an expert innovation analyst. Analyze this challenge and break it down into its fundamental components.

CHALLENGE:
${description}

Decompose the challenge into:
1. Core components/sub-problems (5-8 items)
2. Constraints — technical, financial, regulatory, temporal (4-6 items)
3. Hidden assumptions that limit current thinking (3-5 items)
4. Key stakeholders affected (3-6 people/groups)
5. Measurable success criteria (3-5 items)

Be specific and insightful. Go beyond obvious surface-level analysis.`;
}

export function researchPrompt(
  description: string,
  decomposition: string,
) {
  return `You are a research analyst. Given this challenge and its decomposition, identify existing solutions and approaches.

CHALLENGE:
${description}

DECOMPOSITION:
${decomposition}

Find and analyze 4-6 existing solutions or approaches to this challenge. For each:
- Describe what the solution is and where it comes from
- List specific strengths (2-3 each)
- List specific weaknesses/limitations (2-3 each)

Also provide citations for your research (academic papers, web sources, patents).
Be factual and specific. Reference real approaches, companies, or research when possible.`;
}

export function gapAnalysisPrompt(
  description: string,
  research: string,
) {
  return `You are a strategic analyst specializing in innovation gaps. Given this challenge and existing solutions, identify what's missing.

CHALLENGE:
${description}

EXISTING SOLUTIONS:
${research}

Identify:
1. Specific gaps in current solutions (4-6 gaps) — for each, describe the area, what's missing, and the innovation opportunity it creates
2. Unmet needs that no current solution addresses (3-5 needs)
3. Underserved segments or markets (2-4 segments)

Focus on actionable gaps that could lead to breakthrough innovation.`;
}

export function innovationPrompt(
  description: string,
  gaps: string,
) {
  return `You are a world-class innovation expert. Generate novel solutions using 6 proven innovation methodologies.

CHALLENGE:
${description}

IDENTIFIED GAPS AND OPPORTUNITIES:
${gaps}

Generate exactly ONE solution for EACH of these 6 methodologies:

1. **TRIZ** — Apply inventive principles and contradiction analysis
2. **SCAMPER** — Apply Substitute/Combine/Adapt/Modify/Put to use/Eliminate/Reverse
3. **Design Thinking** — Human-centered, empathy-driven solution
4. **Blue Ocean Strategy** — Create uncontested market space
5. **Biomimicry** — Nature-inspired solution
6. **First Principles** — Rebuild from fundamental truths

For each solution provide:
- A concise, memorable title
- A detailed description (2-3 paragraphs explaining the solution)
- 3-5 key insights that make this solution unique

Solutions must directly address the identified gaps. Be creative, specific, and practical.`;
}

export function scoringPrompt(
  description: string,
  solutions: string,
) {
  return `You are an innovation evaluator. Score each proposed solution across 6 dimensions.

CHALLENGE:
${description}

PROPOSED SOLUTIONS:
${solutions}

Score each solution on a 1-10 scale across these dimensions:
- **Novelty**: How unique and original is this approach? (10 = completely new)
- **Feasibility**: How technically and practically achievable? (10 = immediately doable)
- **Impact**: Potential positive effect if implemented? (10 = transformative)
- **Scalability**: Can it grow and adapt? (10 = infinitely scalable)
- **Cost Efficiency**: Resource requirements vs value? (10 = very cost effective)
- **Time to Market**: How quickly can it be realized? (10 = weeks, 1 = decades)

For each solution, also provide a brief rationale (1-2 sentences) explaining the scores.
Be critical and realistic. Not every solution should score high on every dimension.`;
}

export function patentPrompt(
  description: string,
  solutions: string,
) {
  return `You are a patent landscape analyst. Analyze the intellectual property landscape for these proposed solutions.

CHALLENGE:
${description}

PROPOSED SOLUTIONS:
${solutions}

Analyze:
1. **Existing Patents** (3-5 relevant patents): Title, patent number if known, relevance level, and summary of what it covers
2. **White Spaces** (3-5 areas): Areas with no existing patents where new IP could be filed
3. **Risk Level**: Overall patent risk (low/medium/high) considering freedom to operate
4. **Recommendation**: Strategic advice on IP protection and potential conflicts

Note: This is a preliminary landscape analysis for strategic planning, not legal advice.
Focus on identifying the most relevant existing IP and the most promising areas for new patent filings.`;
}
