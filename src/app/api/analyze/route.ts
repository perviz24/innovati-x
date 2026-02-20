import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import {
  decompositionSchema,
  researchSchema,
  gapAnalysisSchema,
  innovationSchema,
  scoringSchema,
  patentSchema,
} from "@/lib/ai/schemas";
import {
  decompositionPrompt,
  researchPrompt,
  gapAnalysisPrompt,
  innovationPrompt,
  scoringPrompt,
  patentPrompt,
} from "@/lib/ai/prompts";

// Convex HTTP client for server-side mutations
const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!,
);

export const maxDuration = 300; // 5 min max for long AI pipeline

export async function POST(req: Request) {
  // Auth check
  const { userId, getToken } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get Convex auth token from Clerk
  const token = await getToken({ template: "convex" });
  if (token) {
    convex.setAuth(token);
  }

  const { challengeId, description } = await req.json();

  if (!challengeId || !description) {
    return Response.json(
      { error: "Missing challengeId or description" },
      { status: 400 },
    );
  }

  try {
    // Set overall status to analyzing
    await convex.mutation(api.challenges.updateStatus, {
      challengeId,
      status: "analyzing",
    });

    // ===== STAGE 1: Problem Decomposition =====
    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "decomposition",
      status: "running",
    });

    const decomposition = await generateObject({
      model: anthropic("claude-sonnet-4-20250514"),
      schema: decompositionSchema,
      prompt: decompositionPrompt(description),
    });

    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "decomposition",
      status: "completed",
      data: decomposition.object,
    });

    // ===== STAGE 2: Deep Research =====
    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "research",
      status: "running",
    });

    const researchContext = JSON.stringify(decomposition.object, null, 2);

    // Use Exa for web research if API key is available
    let exaResults = "";
    if (process.env.EXA_API_KEY) {
      try {
        const { default: Exa } = await import("exa-js");
        const exa = new Exa(process.env.EXA_API_KEY);
        const searchResults = await exa.searchAndContents(
          `${description} solutions approaches`,
          {
            numResults: 5,
            text: { maxCharacters: 500 },
          },
        );
        exaResults = searchResults.results
          .map(
            (r) =>
              `- ${r.title}: ${r.text?.substring(0, 300)} (${r.url})`,
          )
          .join("\n");
      } catch {
        // Exa search failed, continue with AI-only research
      }
    }

    const researchPromptText = researchPrompt(
      description,
      researchContext +
        (exaResults ? `\n\nWEB RESEARCH RESULTS:\n${exaResults}` : ""),
    );

    const research = await generateObject({
      model: anthropic("claude-sonnet-4-20250514"),
      schema: researchSchema,
      prompt: researchPromptText,
    });

    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "research",
      status: "completed",
      data: research.object,
    });

    // ===== STAGE 3: Gap Analysis =====
    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "gapAnalysis",
      status: "running",
    });

    const researchSummary = JSON.stringify(
      research.object.existingSolutions,
      null,
      2,
    );

    const gapAnalysis = await generateObject({
      model: anthropic("claude-sonnet-4-20250514"),
      schema: gapAnalysisSchema,
      prompt: gapAnalysisPrompt(description, researchSummary),
    });

    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "gapAnalysis",
      status: "completed",
      data: gapAnalysis.object,
    });

    // ===== STAGE 4: Innovation Generation =====
    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "innovation",
      status: "running",
    });

    const gapsSummary = JSON.stringify(gapAnalysis.object, null, 2);

    const innovation = await generateObject({
      model: anthropic("claude-sonnet-4-20250514"),
      schema: innovationSchema,
      prompt: innovationPrompt(description, gapsSummary),
    });

    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "innovation",
      status: "completed",
      data: innovation.object.solutions,
    });

    // ===== STAGE 5: Scoring =====
    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "scoring",
      status: "running",
    });

    const solutionsSummary = innovation.object.solutions
      .map(
        (s) =>
          `[${s.methodology}] ${s.title}: ${s.description.substring(0, 200)}...`,
      )
      .join("\n\n");

    const scoring = await generateObject({
      model: anthropic("claude-sonnet-4-20250514"),
      schema: scoringSchema,
      prompt: scoringPrompt(description, solutionsSummary),
    });

    // Merge scores into solutions
    const scoredSolutions = innovation.object.solutions.map((sol) => {
      const scoreData = scoring.object.scoredSolutions.find(
        (s) => s.methodology === sol.methodology,
      );
      return {
        ...sol,
        scores: scoreData?.scores ?? undefined,
      };
    });

    // Update solutions with scores
    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "scoring",
      status: "completed",
    });

    // Re-save solutions with scores attached
    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "innovation",
      status: "completed",
      data: scoredSolutions,
    });

    // ===== STAGE 6: Patent Landscape =====
    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "patent",
      status: "running",
    });

    const patent = await generateObject({
      model: anthropic("claude-sonnet-4-20250514"),
      schema: patentSchema,
      prompt: patentPrompt(description, solutionsSummary),
    });

    await convex.mutation(api.challenges.updateStage, {
      challengeId,
      stage: "patent",
      status: "completed",
      data: patent.object,
    });

    // ===== Pipeline Complete =====
    await convex.mutation(api.challenges.updateStatus, {
      challengeId,
      status: "completed",
    });

    return Response.json({ success: true, challengeId });
  } catch (error) {
    console.error("Pipeline error:", error);

    // Try to update status to failed
    try {
      await convex.mutation(api.challenges.updateStatus, {
        challengeId,
        status: "failed",
      });
    } catch {
      // If this also fails, just log it
    }

    return Response.json(
      {
        error: "Analysis pipeline failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
