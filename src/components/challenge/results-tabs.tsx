"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Search,
  Beaker,
  Sparkles,
  BarChart3,
  FileText,
  ExternalLink,
} from "lucide-react";
import { DecompositionResults, SolutionsPreview } from "./analysis-results";
import { ResearchResults } from "./research-results";
import { GapAnalysisResults } from "./gap-analysis-results";
import { PatentResults } from "./patent-results";

// Challenge data types matching Convex schema
interface ChallengeResults {
  decomposition?: {
    components: string[];
    constraints: string[];
    assumptions: string[];
    stakeholders: string[];
    successCriteria: string[];
  };
  research?: {
    existingSolutions: {
      title: string;
      description: string;
      source: string;
      url?: string;
      strengths: string[];
      weaknesses: string[];
    }[];
    citations: {
      title: string;
      url?: string;
      source: string;
      snippet?: string;
    }[];
  };
  gapAnalysis?: {
    gaps: { area: string; description: string; opportunity: string }[];
    unmetNeeds: string[];
    underservedSegments: string[];
  };
  solutions?: {
    methodology: string;
    title: string;
    description: string;
    keyInsights: string[];
    scores?: Record<string, number>;
  }[];
  patentLandscape?: {
    existingPatents: {
      title: string;
      number?: string;
      relevance: string;
      summary: string;
    }[];
    whiteSpaces: string[];
    riskLevel: string;
    recommendation: string;
  };
}

const TABS = [
  { key: "decomposition", label: "Decomposition", icon: Lightbulb, color: "text-violet-400" },
  { key: "research", label: "Research", icon: Search, color: "text-blue-400" },
  { key: "gaps", label: "Gap Analysis", icon: Beaker, color: "text-emerald-400" },
  { key: "solutions", label: "Solutions", icon: Sparkles, color: "text-amber-400" },
  { key: "scores", label: "Scores", icon: BarChart3, color: "text-rose-400" },
  { key: "patents", label: "Patents", icon: FileText, color: "text-cyan-400" },
];

export function ResultsTabs({ data }: { data: ChallengeResults }) {
  // Find the first available tab to use as default
  const firstAvailable = data.decomposition
    ? "decomposition"
    : data.research
      ? "research"
      : "decomposition";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Analysis Results</h2>
      <Tabs defaultValue={firstAvailable} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="gap-1.5 text-xs"
            >
              <tab.icon className={`h-3.5 w-3.5 ${tab.color}`} />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab 1: Decomposition */}
        <TabsContent value="decomposition" className="mt-4">
          {data.decomposition ? (
            <DecompositionResults data={data.decomposition} />
          ) : (
            <EmptyTab label="Decomposition" />
          )}
        </TabsContent>

        {/* Tab 2: Research */}
        <TabsContent value="research" className="mt-4">
          {data.research ? (
            <ResearchResults data={data.research} />
          ) : (
            <EmptyTab label="Research" />
          )}
        </TabsContent>

        {/* Tab 3: Gap Analysis */}
        <TabsContent value="gaps" className="mt-4">
          {data.gapAnalysis ? (
            <GapAnalysisResults data={data.gapAnalysis} />
          ) : (
            <EmptyTab label="Gap Analysis" />
          )}
        </TabsContent>

        {/* Tab 4: Solutions */}
        <TabsContent value="solutions" className="mt-4">
          {data.solutions ? (
            <SolutionsPreview solutions={data.solutions} />
          ) : (
            <EmptyTab label="Solutions" />
          )}
        </TabsContent>

        {/* Tab 5: Scores — uses same solutions data but focuses on scores */}
        <TabsContent value="scores" className="mt-4">
          {data.solutions?.some((s) => s.scores) ? (
            <ScoresOverview solutions={data.solutions} />
          ) : (
            <EmptyTab label="Scores" />
          )}
        </TabsContent>

        {/* Tab 6: Patents */}
        <TabsContent value="patents" className="mt-4">
          {data.patentLandscape ? (
            <PatentResults data={data.patentLandscape} />
          ) : (
            <EmptyTab label="Patent Landscape" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Simple empty state for tabs without data
function EmptyTab({ label }: { label: string }) {
  return (
    <Card className="flex items-center justify-center border-dashed border-border/50 bg-card/30 p-8 text-center">
      <p className="text-sm text-muted-foreground">
        {label} data not yet available. Run the analysis pipeline first.
      </p>
    </Card>
  );
}

// Scores overview — a table-like view of all solution scores
function ScoresOverview({
  solutions,
}: {
  solutions: ChallengeResults["solutions"];
}) {
  if (!solutions) return null;

  const dimensions = [
    "novelty",
    "feasibility",
    "impact",
    "scalability",
    "costEfficiency",
    "timeToMarket",
  ];

  const dimensionLabels: Record<string, string> = {
    novelty: "Novelty",
    feasibility: "Feasibility",
    impact: "Impact",
    scalability: "Scalability",
    costEfficiency: "Cost Eff.",
    timeToMarket: "Time-Mkt",
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="pb-3 text-left font-semibold">Methodology</th>
              {dimensions.map((d) => (
                <th key={d} className="pb-3 text-center font-semibold">
                  {dimensionLabels[d]}
                </th>
              ))}
              <th className="pb-3 text-center font-semibold">Avg</th>
            </tr>
          </thead>
          <tbody>
            {solutions.map((sol, i) => {
              const scores = sol.scores;
              const avg = scores
                ? Object.values(scores).reduce((a, b) => a + b, 0) /
                  Object.values(scores).length
                : 0;

              return (
                <tr key={i} className="border-b border-border/30">
                  <td className="py-3">
                    <Badge
                      variant="outline"
                      className="border-violet-500/30 bg-violet-500/10 text-violet-400"
                    >
                      {sol.methodology}
                    </Badge>
                  </td>
                  {dimensions.map((d) => {
                    const val = scores?.[d] ?? 0;
                    return (
                      <td key={d} className="py-3 text-center">
                        <ScoreCell value={val} />
                      </td>
                    );
                  })}
                  <td className="py-3 text-center">
                    <span className="font-semibold text-violet-400">
                      {avg.toFixed(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Color-coded score cell
function ScoreCell({ value }: { value: number }) {
  const color =
    value >= 8
      ? "text-emerald-400"
      : value >= 6
        ? "text-amber-400"
        : value >= 4
          ? "text-orange-400"
          : "text-red-400";

  return <span className={`font-medium ${color}`}>{value}</span>;
}
