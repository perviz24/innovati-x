"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Lightbulb,
  Search,
  Beaker,
  Sparkles,
  BarChart3,
  FileText,
  CheckCircle2,
  Loader2,
  Circle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const PIPELINE_STAGES = [
  {
    key: "decomposition" as const,
    label: "Problem Decomposition",
    icon: Lightbulb,
    color: "violet",
  },
  {
    key: "research" as const,
    label: "Deep Research",
    icon: Search,
    color: "blue",
  },
  {
    key: "gapAnalysis" as const,
    label: "Gap Analysis",
    icon: Beaker,
    color: "emerald",
  },
  {
    key: "innovation" as const,
    label: "Innovation Generation",
    icon: Sparkles,
    color: "amber",
  },
  {
    key: "scoring" as const,
    label: "Scoring & Ranking",
    icon: BarChart3,
    color: "rose",
  },
  {
    key: "patent" as const,
    label: "Patent Landscape",
    icon: FileText,
    color: "cyan",
  },
];

function StageIcon({ status }: { status: string }) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
    case "running":
      return <Loader2 className="h-4 w-4 animate-spin text-amber-400" />;
    case "failed":
      return <AlertCircle className="h-4 w-4 text-red-400" />;
    default:
      return <Circle className="h-4 w-4 text-muted-foreground/30" />;
  }
}

export default function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = use(params);
  const challenge = useQuery(api.challenges.getById, {
    challengeId: challengeId as Id<"challenges">,
  });

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
                  : challenge.status === "analyzing"
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                    : challenge.status === "failed"
                      ? "border-red-500/30 bg-red-500/10 text-red-400"
                      : "border-border/50"
              }
            >
              {challenge.status === "completed"
                ? "Completed"
                : challenge.status === "analyzing"
                  ? "Analyzing..."
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

      {/* Pipeline progress */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Analysis Pipeline</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PIPELINE_STAGES.map((stage) => {
            const stageStatus =
              challenge.stages?.[stage.key] ?? "pending";
            return (
              <Card
                key={stage.key}
                className={`border-border/50 p-4 transition-all ${
                  stageStatus === "completed"
                    ? `border-${stage.color}-500/30 bg-${stage.color}-500/5`
                    : stageStatus === "running"
                      ? "border-amber-500/30 bg-amber-500/5"
                      : "bg-card/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <StageIcon status={stageStatus} />
                  <div className="flex items-center gap-2">
                    <stage.icon
                      className={`h-4 w-4 text-${stage.color}-400`}
                    />
                    <span className="text-sm font-medium">
                      {stage.label}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pending state — show "Start Analysis" button */}
      {challenge.status === "pending" && (
        <Card className="flex flex-col items-center justify-center border-dashed border-border/50 bg-card/30 p-8 text-center">
          <Sparkles className="mb-3 h-8 w-8 text-violet-400" />
          <h3 className="mb-2 text-lg font-semibold">Ready to Analyze</h3>
          <p className="mb-4 max-w-md text-sm text-muted-foreground">
            Click below to start the AI-powered analysis pipeline. This will
            take a few minutes to complete all 6 stages.
          </p>
          <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
            <Sparkles className="h-4 w-4" />
            Start Analysis
          </Button>
        </Card>
      )}

      {/* Results will be shown here in future features */}
      {challenge.status === "completed" && challenge.solutions && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Solutions Generated ({challenge.solutions.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {challenge.solutions.map((sol, i) => (
              <Card
                key={i}
                className="border-border/50 bg-card/50 p-5"
              >
                <Badge
                  variant="outline"
                  className="mb-2 border-violet-500/30 bg-violet-500/10 text-violet-400"
                >
                  {sol.methodology}
                </Badge>
                <h3 className="mb-2 font-semibold">{sol.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {sol.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
