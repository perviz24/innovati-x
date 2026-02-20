"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Lightbulb,
  Search,
  Beaker,
  Sparkles,
  BarChart3,
  FileText,
  Workflow,
  Brain,
  GitCompareArrows,
} from "lucide-react";
import { DecompositionResults, SolutionsPreview } from "./analysis-results";
import { ResearchResults } from "./research-results";
import { GapAnalysisResults } from "./gap-analysis-results";
import { PatentResults } from "./patent-results";
import { ScoringMatrix } from "./scoring-matrix";
import { FlowchartCanvas } from "./flowchart-canvas";
import { MindMapCanvas } from "./mindmap-canvas";
import { SolutionComparison } from "./solution-comparison";

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
  { key: "flowchart", label: "Flowchart", icon: Workflow, color: "text-purple-400" },
  { key: "mindmap", label: "Mind Map", icon: Brain, color: "text-pink-400" },
  { key: "compare", label: "Compare", icon: GitCompareArrows, color: "text-indigo-400" },
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
        <TabsList className="flex w-full flex-wrap justify-start gap-1 sm:grid sm:grid-cols-5 lg:grid-cols-9">
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

        {/* Tab 5: Scores — radar chart + ranking cards */}
        <TabsContent value="scores" className="mt-4">
          {data.solutions?.some((s) => s.scores) ? (
            <ScoringMatrix solutions={data.solutions} />
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

        {/* Tab 7: Flowchart canvas */}
        <TabsContent value="flowchart" className="mt-4">
          {data.decomposition || data.solutions ? (
            <FlowchartCanvas data={data} />
          ) : (
            <EmptyTab label="Flowchart" />
          )}
        </TabsContent>

        {/* Tab 8: Mind Map */}
        <TabsContent value="mindmap" className="mt-4">
          {data.decomposition || data.solutions ? (
            <MindMapCanvas data={data} />
          ) : (
            <EmptyTab label="Mind Map" />
          )}
        </TabsContent>

        {/* Tab 9: Solution Comparison */}
        <TabsContent value="compare" className="mt-4">
          {data.solutions && data.solutions.length >= 2 ? (
            <SolutionComparison solutions={data.solutions} />
          ) : (
            <EmptyTab label="Solution Comparison (needs 2+ solutions)" />
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

