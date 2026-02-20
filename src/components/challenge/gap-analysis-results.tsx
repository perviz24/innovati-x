"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, AlertTriangle } from "lucide-react";

interface GapAnalysisData {
  gaps: {
    area: string;
    description: string;
    opportunity: string;
  }[];
  unmetNeeds: string[];
  underservedSegments: string[];
}

export function GapAnalysisResults({ data }: { data: GapAnalysisData }) {
  return (
    <div className="space-y-6">
      {/* Gaps */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold">
          Innovation Gaps ({data.gaps.length})
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.gaps.map((gap, i) => (
            <Card key={i} className="border-border/50 bg-card/50 p-5">
              <Badge
                variant="outline"
                className="mb-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              >
                {gap.area}
              </Badge>
              <p className="mb-2 text-sm text-muted-foreground">
                {gap.description}
              </p>
              <div className="rounded-md border border-emerald-500/20 bg-emerald-500/5 p-2.5">
                <p className="text-xs font-medium text-emerald-400">
                  Opportunity
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {gap.opportunity}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Unmet Needs */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <Target className="h-4 w-4 text-amber-400" />
          Unmet Needs ({data.unmetNeeds.length})
        </h3>
        <Card className="border-border/50 bg-card/50 p-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {data.unmetNeeds.map((need, i) => (
              <li key={i} className="flex gap-2">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                {need}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Underserved Segments */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <Users className="h-4 w-4 text-blue-400" />
          Underserved Segments ({data.underservedSegments.length})
        </h3>
        <Card className="border-border/50 bg-card/50 p-5">
          <div className="flex flex-wrap gap-2">
            {data.underservedSegments.map((seg, i) => (
              <Badge
                key={i}
                variant="outline"
                className="border-blue-500/30 bg-blue-500/10 text-blue-400"
              >
                {seg}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
