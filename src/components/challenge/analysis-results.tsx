"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// -- Solutions preview section --

interface Solution {
  methodology: string;
  title: string;
  description: string;
  scores?: Record<string, number>;
}

export function SolutionsPreview({ solutions }: { solutions: Solution[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Solutions Generated ({solutions.length})
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {solutions.map((sol, i) => (
          <Card key={i} className="border-border/50 bg-card/50 p-5">
            <Badge
              variant="outline"
              className="mb-2 border-violet-500/30 bg-violet-500/10 text-violet-400"
            >
              {sol.methodology}
            </Badge>
            <h3 className="mb-2 font-semibold">{sol.title}</h3>
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {sol.description}
            </p>
            {sol.scores && (
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(sol.scores).map(([key, value]) => (
                  <span
                    key={key}
                    className="rounded-full bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {key}: {value}/10
                  </span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// -- Decomposition results section --

interface Decomposition {
  components: string[];
  constraints: string[];
  assumptions: string[];
  successCriteria: string[];
}

const SECTIONS: {
  key: keyof Decomposition;
  label: string;
  color: string;
  dot: string;
}[] = [
  { key: "components", label: "Core Components", color: "text-violet-400", dot: "text-violet-400" },
  { key: "constraints", label: "Constraints", color: "text-blue-400", dot: "text-blue-400" },
  { key: "assumptions", label: "Hidden Assumptions", color: "text-amber-400", dot: "text-amber-400" },
  { key: "successCriteria", label: "Success Criteria", color: "text-emerald-400", dot: "text-emerald-400" },
];

export function DecompositionResults({ data }: { data: Decomposition }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Problem Decomposition</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Card key={section.key} className="border-border/50 bg-card/50 p-5">
            <h3 className={`mb-2 text-sm font-semibold ${section.color}`}>
              {section.label}
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {data[section.key].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className={section.dot}>•</span> {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
