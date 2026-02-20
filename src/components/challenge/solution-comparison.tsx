"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Trophy, TrendingUp, TrendingDown } from "lucide-react";

interface Solution {
  methodology: string;
  title: string;
  description: string;
  keyInsights: string[];
  scores?: Record<string, number>;
}

const DIMENSION_LABELS: Record<string, string> = {
  novelty: "Novelty",
  feasibility: "Feasibility",
  impact: "Impact",
  scalability: "Scalability",
  costEfficiency: "Cost Efficiency",
  timeToMarket: "Time to Market",
};

const DIMENSIONS = Object.keys(DIMENSION_LABELS);

function getAvg(scores?: Record<string, number>): number {
  if (!scores) return 0;
  const vals = Object.values(scores);
  return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
}

function scoreColor(val: number): string {
  if (val >= 8) return "text-emerald-400";
  if (val >= 6) return "text-amber-400";
  if (val >= 4) return "text-orange-400";
  return "text-red-400";
}

function scoreBg(val: number): string {
  if (val >= 8) return "bg-emerald-500/10";
  if (val >= 6) return "bg-amber-500/10";
  if (val >= 4) return "bg-orange-500/10";
  return "bg-red-500/10";
}

export function SolutionComparison({
  solutions,
}: {
  solutions: Solution[];
}) {
  const [selected, setSelected] = useState<number[]>(
    solutions.length >= 2 ? [0, 1] : [0],
  );

  function toggleSolution(idx: number) {
    setSelected((prev) => {
      if (prev.includes(idx)) {
        return prev.length > 1 ? prev.filter((i) => i !== idx) : prev;
      }
      if (prev.length >= 3) return prev;
      return [...prev, idx];
    });
  }

  const compared = selected.map((i) => solutions[i]);
  const bestAvg = Math.max(...compared.map((s) => getAvg(s.scores)));

  return (
    <div className="space-y-6">
      {/* Selector chips */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
          Select 2-3 solutions to compare
        </h3>
        <div className="flex flex-wrap gap-2">
          {solutions.map((sol, i) => {
            const isSelected = selected.includes(i);
            return (
              <Button
                key={i}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSolution(i)}
                className={
                  isSelected
                    ? "gap-1.5 bg-violet-600 hover:bg-violet-700"
                    : "gap-1.5"
                }
              >
                {isSelected ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <X className="h-3.5 w-3.5 opacity-50" />
                )}
                {sol.methodology}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Comparison columns */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${compared.length}, minmax(0, 1fr))`,
        }}
      >
        {compared.map((sol, i) => {
          const avg = getAvg(sol.scores);
          const isBest = avg === bestAvg && compared.length > 1;

          return (
            <Card
              key={selected[i]}
              className={`border-border/50 p-5 ${isBest ? "border-emerald-500/30 bg-emerald-500/5" : "bg-card/50"}`}
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between">
                <Badge
                  variant="outline"
                  className="border-violet-500/30 bg-violet-500/10 text-violet-400"
                >
                  {sol.methodology}
                </Badge>
                {isBest && (
                  <div className="flex items-center gap-1 text-xs text-emerald-400">
                    <Trophy className="h-3.5 w-3.5" />
                    Best
                  </div>
                )}
              </div>

              <h4 className="mb-2 text-sm font-semibold">{sol.title}</h4>
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                {sol.description}
              </p>

              {/* Average score */}
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Average:</span>
                <span className={`text-lg font-bold ${scoreColor(avg)}`}>
                  {avg.toFixed(1)}
                </span>
              </div>

              {/* Dimension scores */}
              {sol.scores && (
                <div className="mb-4 space-y-2">
                  {DIMENSIONS.map((dim) => {
                    const val = sol.scores?.[dim] ?? 0;
                    const max = Math.max(
                      ...compared.map((s) => s.scores?.[dim] ?? 0),
                    );
                    const isHighest = val === max && compared.length > 1;
                    return (
                      <div key={dim} className="flex items-center gap-2">
                        <span className="w-24 text-[11px] text-muted-foreground">
                          {DIMENSION_LABELS[dim]}
                        </span>
                        <div className="flex flex-1 items-center gap-1.5">
                          <div className="h-1.5 flex-1 rounded-full bg-muted/30">
                            <div
                              className={`h-full rounded-full ${scoreBg(val)}`}
                              style={{ width: `${val * 10}%` }}
                            />
                          </div>
                          <span
                            className={`w-6 text-right text-xs font-semibold ${scoreColor(val)}`}
                          >
                            {val}
                          </span>
                          {isHighest && (
                            <TrendingUp className="h-3 w-3 text-emerald-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Key insights */}
              <div>
                <h5 className="mb-2 text-[11px] font-semibold text-muted-foreground">
                  Key Insights
                </h5>
                <ul className="space-y-1">
                  {sol.keyInsights.slice(0, 3).map((insight, j) => (
                    <li
                      key={j}
                      className="flex gap-1.5 text-[11px] text-muted-foreground"
                    >
                      <span className="text-violet-400">•</span>
                      {insight.length > 80
                        ? insight.slice(0, 80) + "…"
                        : insight}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Strengths summary */}
      {compared.length > 1 && (
        <StrengthsSummary solutions={compared} />
      )}
    </div>
  );
}

function StrengthsSummary({ solutions }: { solutions: Solution[] }) {
  return (
    <Card className="border-border/50 bg-card/50 p-5">
      <h3 className="mb-3 text-sm font-semibold">
        Comparative Strengths
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((sol, i) => {
          const scores = sol.scores;
          if (!scores) return null;

          const sorted = DIMENSIONS.map((d) => ({
            dim: d,
            val: scores[d] ?? 0,
          })).sort((a, b) => b.val - a.val);

          const strengths = sorted.slice(0, 2);
          const weaknesses = sorted.slice(-2).reverse();

          return (
            <div key={i} className="space-y-2">
              <Badge
                variant="outline"
                className="border-violet-500/30 bg-violet-500/10 text-violet-400"
              >
                {sol.methodology}
              </Badge>
              <div className="space-y-1">
                {strengths.map((s) => (
                  <div
                    key={s.dim}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <TrendingUp className="h-3 w-3 text-emerald-400" />
                    <span className="text-muted-foreground">
                      {DIMENSION_LABELS[s.dim]}:
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {s.val}
                    </span>
                  </div>
                ))}
                {weaknesses.map((w) => (
                  <div
                    key={w.dim}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <TrendingDown className="h-3 w-3 text-orange-400" />
                    <span className="text-muted-foreground">
                      {DIMENSION_LABELS[w.dim]}:
                    </span>
                    <span className="font-semibold text-orange-400">
                      {w.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
