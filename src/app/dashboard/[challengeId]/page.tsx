"use client";

import { use, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Sparkles, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { PipelineProgress } from "@/components/challenge/pipeline-progress";
import { SolutionsPreview, DecompositionResults } from "@/components/challenge/analysis-results";

export default function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = use(params);
  const [isStarting, setIsStarting] = useState(false);

  const challenge = useQuery(api.challenges.getById, {
    challengeId: challengeId as Id<"challenges">,
  });

  async function startAnalysis() {
    if (!challenge) return;
    setIsStarting(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: challenge._id,
          description: challenge.description,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      toast.success("Analysis complete! Review your results below.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to start analysis",
      );
    } finally {
      setIsStarting(false);
    }
  }

  // Loading state
  if (challenge === undefined) {
    return (
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  // Not found state
  if (challenge === null) {
    return (
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            Challenge Not Found
          </h1>
        </div>
        <Card className="flex flex-col items-center justify-center border-dashed border-border/50 bg-card/30 p-12 text-center">
          <AlertCircle className="mb-4 h-8 w-8 text-muted-foreground" />
          <p className="mb-4 text-muted-foreground">
            This challenge does not exist or you do not have access.
          </p>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const isAnalyzing = challenge.status === "analyzing" || isStarting;
  const completedStages =
    challenge.stages
      ? Object.values(challenge.stages).filter((s) => s === "completed").length
      : 0;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="truncate text-2xl font-bold tracking-tight">
              {challenge.title}
            </h1>
            <Badge
              variant="outline"
              className={
                challenge.status === "completed"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : isAnalyzing
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                    : challenge.status === "failed"
                      ? "border-red-500/30 bg-red-500/10 text-red-400"
                      : "border-border/50"
              }
            >
              {challenge.status === "completed"
                ? "Completed"
                : isAnalyzing
                  ? `Analyzing (${completedStages}/6)...`
                  : challenge.status === "failed"
                    ? "Failed"
                    : "Pending"}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Created{" "}
            {new Date(challenge._creationTime).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Problem description */}
      <Card className="border-border/50 bg-card/50 p-6">
        <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
          Challenge Description
        </h2>
        <p className="leading-relaxed">{challenge.description}</p>
      </Card>

      {/* Pipeline progress — extracted component */}
      <PipelineProgress stages={challenge.stages} />

      {/* Pending state — show "Start Analysis" button */}
      {challenge.status === "pending" && (
        <Card className="flex flex-col items-center justify-center border-dashed border-border/50 bg-card/30 p-8 text-center">
          <Sparkles className="mb-3 h-8 w-8 text-violet-400" />
          <h3 className="mb-2 text-lg font-semibold">Ready to Analyze</h3>
          <p className="mb-4 max-w-md text-sm text-muted-foreground">
            Start the AI-powered analysis pipeline. This runs 6 stages
            sequentially and takes 2-4 minutes.
          </p>
          <Button
            onClick={startAnalysis}
            disabled={isStarting}
            className="gap-2 bg-violet-600 hover:bg-violet-700"
          >
            {isStarting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {isStarting ? "Starting..." : "Start Analysis"}
          </Button>
        </Card>
      )}

      {/* Analyzing state */}
      {isAnalyzing && challenge.status === "analyzing" && (
        <Card className="border-amber-500/20 bg-amber-500/5 p-6 text-center">
          <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-amber-400" />
          <h3 className="mb-1 text-lg font-semibold">Analysis in Progress</h3>
          <p className="text-sm text-muted-foreground">
            AI is working through the pipeline. Progress updates appear
            in real-time above. This takes 2-4 minutes.
          </p>
        </Card>
      )}

      {/* Failed state */}
      {challenge.status === "failed" && (
        <Card className="border-red-500/20 bg-red-500/5 p-6 text-center">
          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-red-400" />
          <h3 className="mb-1 text-lg font-semibold">Analysis Failed</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Something went wrong during analysis. You can try again.
          </p>
          <Button
            onClick={startAnalysis}
            disabled={isStarting}
            variant="outline"
            className="gap-2"
          >
            {isStarting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Retry Analysis
          </Button>
        </Card>
      )}

      {/* Completed — Solutions preview (extracted component) */}
      {challenge.status === "completed" && challenge.solutions && (
        <SolutionsPreview solutions={challenge.solutions} />
      )}

      {/* Decomposition results (extracted component) */}
      {challenge.decomposition && (
        <DecompositionResults data={challenge.decomposition} />
      )}
    </div>
  );
}
