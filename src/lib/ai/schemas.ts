import { z } from "zod";

// Stage 1: Problem Decomposition
export const decompositionSchema = z.object({
  components: z
    .array(z.string())
    .describe("Core components or sub-problems of the challenge"),
  constraints: z
    .array(z.string())
    .describe("Technical, financial, or regulatory constraints"),
  assumptions: z
    .array(z.string())
    .describe("Hidden assumptions that limit current thinking"),
  stakeholders: z
    .array(z.string())
    .describe("Key stakeholders affected by this challenge"),
  successCriteria: z
    .array(z.string())
    .describe("Measurable criteria for a successful solution"),
});

// Stage 2: Research — existing solutions
export const existingSolutionSchema = z.object({
  title: z.string(),
  description: z.string(),
  source: z.string().describe("Where this solution comes from"),
  url: z.string().optional(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
});

export const researchSchema = z.object({
  existingSolutions: z.array(existingSolutionSchema),
  citations: z.array(
    z.object({
      title: z.string(),
      url: z.string().optional(),
      source: z
        .enum(["web", "academic", "patent"])
        .describe("Type of source"),
      snippet: z.string().optional(),
    }),
  ),
});

// Stage 3: Gap Analysis
export const gapAnalysisSchema = z.object({
  gaps: z.array(
    z.object({
      area: z.string().describe("Area where a gap exists"),
      description: z.string().describe("What the gap is"),
      opportunity: z.string().describe("Innovation opportunity this gap creates"),
    }),
  ),
  unmetNeeds: z
    .array(z.string())
    .describe("Needs that current solutions fail to address"),
  underservedSegments: z
    .array(z.string())
    .describe("User segments or markets that are underserved"),
});

// Stage 4: Innovation Generation — single solution
export const solutionSchema = z.object({
  methodology: z
    .enum([
      "TRIZ",
      "SCAMPER",
      "Design Thinking",
      "Blue Ocean Strategy",
      "Biomimicry",
      "First Principles",
    ])
    .describe("Which innovation methodology generated this solution"),
  title: z.string().describe("Concise solution title"),
  description: z
    .string()
    .describe("Detailed description of the solution (2-3 paragraphs)"),
  keyInsights: z
    .array(z.string())
    .describe("3-5 key insights that make this solution unique"),
});

export const innovationSchema = z.object({
  solutions: z
    .array(solutionSchema)
    .describe("One solution per methodology (6 total)"),
});

// Stage 5: Scoring — scores for each solution
export const scoreDimensionsSchema = z.object({
  novelty: z.number().min(1).max(10).describe("How novel is this solution?"),
  feasibility: z
    .number()
    .min(1)
    .max(10)
    .describe("How technically feasible?"),
  impact: z.number().min(1).max(10).describe("Potential impact if implemented?"),
  scalability: z.number().min(1).max(10).describe("How scalable is it?"),
  costEfficiency: z
    .number()
    .min(1)
    .max(10)
    .describe("Cost efficiency (10 = very cost effective)"),
  timeToMarket: z
    .number()
    .min(1)
    .max(10)
    .describe("Speed to market (10 = very fast)"),
});

export const scoringSchema = z.object({
  scoredSolutions: z.array(
    z.object({
      methodology: z.string(),
      scores: scoreDimensionsSchema,
      rationale: z
        .string()
        .describe("Brief reasoning for the scores given"),
    }),
  ),
});

// Stage 6: Patent Landscape
export const patentSchema = z.object({
  existingPatents: z.array(
    z.object({
      title: z.string(),
      number: z.string().optional(),
      relevance: z
        .enum(["high", "medium", "low"])
        .describe("How relevant to the proposed solutions"),
      summary: z.string(),
    }),
  ),
  whiteSpaces: z
    .array(z.string())
    .describe("Areas with no existing patents — opportunities for IP protection"),
  riskLevel: z
    .enum(["low", "medium", "high"])
    .describe("Overall patent risk level"),
  recommendation: z
    .string()
    .describe("Strategic recommendation regarding IP"),
});

// Type exports for use in API route
export type Decomposition = z.infer<typeof decompositionSchema>;
export type Research = z.infer<typeof researchSchema>;
export type GapAnalysis = z.infer<typeof gapAnalysisSchema>;
export type Innovation = z.infer<typeof innovationSchema>;
export type Scoring = z.infer<typeof scoringSchema>;
export type PatentLandscape = z.infer<typeof patentSchema>;
