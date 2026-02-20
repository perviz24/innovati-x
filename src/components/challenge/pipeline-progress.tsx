"use client";

import { Card } from "@/components/ui/card";
import {
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

export const PIPELINE_STAGES = [
  { key: "decomposition" as const, label: "Problem Decomposition", icon: Lightbulb },
  { key: "research" as const, label: "Deep Research", icon: Search },
  { key: "gapAnalysis" as const, label: "Gap Analysis", icon: Beaker },
  { key: "innovation" as const, label: "Innovation Generation", icon: Sparkles },
  { key: "scoring" as const, label: "Scoring & Ranking", icon: BarChart3 },
  { key: "patent" as const, label: "Patent Landscape", icon: FileText },
];

const STAGE_COLORS: Record<string, string> = {
  decomposition: "text-violet-400",
  research: "text-blue-400",
  gapAnalysis: "text-emerald-400",
  innovation: "text-amber-400",
  scoring: "text-rose-400",
  patent: "text-cyan-400",
};

const STAGE_BG: Record<string, string> = {
  completed: "border-emerald-500/30 bg-emerald-500/5",
  running: "border-amber-500/30 bg-amber-500/5 animate-pulse",
  failed: "border-red-500/30 bg-red-500/5",
  pending: "border-border/50 bg-card/30",
};

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

type Stages = Record<string, string> | undefined;

export function PipelineProgress({ stages }: { stages: Stages }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Analysis Pipeline</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PIPELINE_STAGES.map((stage) => {
          const status = stages?.[stage.key] ?? "pending";
          return (
            <Card
              key={stage.key}
              className={`p-4 transition-all ${STAGE_BG[status]}`}
            >
              <div className="flex items-center gap-3">
                <StageIcon status={status} />
                <div className="flex items-center gap-2">
                  <stage.icon className={`h-4 w-4 ${STAGE_COLORS[stage.key]}`} />
                  <span className="text-sm font-medium">{stage.label}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
