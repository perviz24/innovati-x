"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lightbulb, AlertTriangle } from "lucide-react";

interface PatentData {
  existingPatents: {
    title: string;
    number?: string;
    relevance: string;
    summary: string;
  }[];
  whiteSpaces: string[];
  riskLevel: string;
  recommendation: string;
}

const RISK_COLORS: Record<string, string> = {
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  high: "border-red-500/30 bg-red-500/10 text-red-400",
};

const RELEVANCE_COLORS: Record<string, string> = {
  high: "border-red-500/30 bg-red-500/10 text-red-400",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
};

export function PatentResults({ data }: { data: PatentData }) {
  return (
    <div className="space-y-6">
      {/* Risk level + recommendation */}
      <Card className="border-border/50 bg-card/50 p-5">
        <div className="mb-3 flex items-center gap-3">
          <Shield className="h-5 w-5 text-cyan-400" />
          <h3 className="font-semibold">Patent Risk Assessment</h3>
          <Badge
            variant="outline"
            className={RISK_COLORS[data.riskLevel] ?? "border-border/50"}
          >
            {data.riskLevel.toUpperCase()} RISK
          </Badge>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {data.recommendation}
        </p>
      </Card>

      {/* Existing patents */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold">
          Existing Patents ({data.existingPatents.length})
        </h3>
        <div className="grid gap-3">
          {data.existingPatents.map((patent, i) => (
            <Card key={i} className="border-border/50 bg-card/50 p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-semibold">{patent.title}</h4>
                  {patent.number && (
                    <p className="text-xs text-muted-foreground/70">
                      {patent.number}
                    </p>
                  )}
                </div>
                <Badge
                  variant="outline"
                  className={`shrink-0 text-[10px] ${RELEVANCE_COLORS[patent.relevance] ?? ""}`}
                >
                  {patent.relevance}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{patent.summary}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* White spaces */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-base font-semibold">
          <Lightbulb className="h-4 w-4 text-emerald-400" />
          IP White Spaces ({data.whiteSpaces.length})
        </h3>
        <Card className="border-border/50 bg-card/50 p-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {data.whiteSpaces.map((ws, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-400">◆</span> {ws}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
