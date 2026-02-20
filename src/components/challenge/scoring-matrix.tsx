"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Solution {
  methodology: string;
  title: string;
  scores?: Record<string, number>;
}

const DIMENSION_LABELS: Record<string, string> = {
  novelty: "Novelty",
  feasibility: "Feasibility",
  impact: "Impact",
  scalability: "Scalability",
  costEfficiency: "Cost Eff.",
  timeToMarket: "Time-Mkt",
};

const DIMENSIONS = Object.keys(DIMENSION_LABELS);

// Methodology colors matching the violet theme but differentiated
const METHODOLOGY_COLORS: Record<string, string> = {
  TRIZ: "#a78bfa",
  SCAMPER: "#60a5fa",
  "Design Thinking": "#34d399",
  "Blue Ocean Strategy": "#f59e0b",
  Biomimicry: "#f472b6",
  "First Principles": "#38bdf8",
};

function getMethodologyColor(methodology: string): string {
  return METHODOLOGY_COLORS[methodology] ?? "#a78bfa";
}

export function ScoringMatrix({ solutions }: { solutions: Solution[] }) {
  // Build radar data: one entry per dimension, one key per methodology
  const radarData = DIMENSIONS.map((dim) => {
    const point: Record<string, string | number> = {
      dimension: DIMENSION_LABELS[dim],
    };
    solutions.forEach((sol) => {
      point[sol.methodology] = sol.scores?.[dim] ?? 0;
    });
    return point;
  });

  // Calculate averages for ranking
  const ranked = solutions
    .map((sol) => {
      const scores = sol.scores;
      const values = scores ? Object.values(scores) : [];
      const avg =
        values.length > 0
          ? values.reduce((a, b) => a + b, 0) / values.length
          : 0;
      return { ...sol, avg };
    })
    .sort((a, b) => b.avg - a.avg);

  return (
    <div className="space-y-6">
      {/* Radar chart */}
      <Card className="border-border/50 bg-card/50 p-5">
        <h3 className="mb-4 text-base font-semibold">
          Score Comparison (Radar)
        </h3>
        <div className="h-[350px] w-full sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 10]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              />
              {solutions.map((sol) => (
                <Radar
                  key={sol.methodology}
                  name={sol.methodology}
                  dataKey={sol.methodology}
                  stroke={getMethodologyColor(sol.methodology)}
                  fill={getMethodologyColor(sol.methodology)}
                  fillOpacity={0.15}
                />
              ))}
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Ranking cards */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold">Ranking by Average Score</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ranked.map((sol, i) => (
            <Card key={sol.methodology} className="border-border/50 bg-card/50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-400">
                    {i + 1}
                  </span>
                  <Badge
                    variant="outline"
                    className="border-violet-500/30 bg-violet-500/10 text-violet-400"
                  >
                    {sol.methodology}
                  </Badge>
                </div>
                <span className="text-lg font-bold text-violet-400">
                  {sol.avg.toFixed(1)}
                </span>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">{sol.title}</p>
              {sol.scores && (
                <div className="grid grid-cols-3 gap-1">
                  {DIMENSIONS.map((dim) => {
                    const val = sol.scores?.[dim] ?? 0;
                    return (
                      <div
                        key={dim}
                        className="flex flex-col items-center rounded-md bg-muted/30 p-1.5"
                      >
                        <span className="text-[10px] text-muted-foreground">
                          {DIMENSION_LABELS[dim]}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            val >= 8
                              ? "text-emerald-400"
                              : val >= 6
                                ? "text-amber-400"
                                : val >= 4
                                  ? "text-orange-400"
                                  : "text-red-400"
                          }`}
                        >
                          {val}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
