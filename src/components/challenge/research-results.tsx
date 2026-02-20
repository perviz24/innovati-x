"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ThumbsUp, ThumbsDown, BookOpen } from "lucide-react";

interface ResearchData {
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
}

export function ResearchResults({ data }: { data: ResearchData }) {
  return (
    <div className="space-y-6">
      {/* Existing solutions */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold">
          Existing Solutions ({data.existingSolutions.length})
        </h3>
        <div className="grid gap-4">
          {data.existingSolutions.map((sol, i) => (
            <Card key={i} className="border-border/50 bg-card/50 p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h4 className="font-semibold">{sol.title}</h4>
                {sol.url && (
                  <a
                    href={sol.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <p className="mb-3 text-sm text-muted-foreground">
                {sol.description}
              </p>
              <p className="mb-3 text-xs text-muted-foreground/70">
                Source: {sol.source}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* Strengths */}
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <ThumbsUp className="h-3 w-3" />
                    Strengths
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {sol.strengths.map((s, j) => (
                      <li key={j} className="flex gap-1.5">
                        <span className="text-emerald-400">+</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-400">
                    <ThumbsDown className="h-3 w-3" />
                    Weaknesses
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {sol.weaknesses.map((w, j) => (
                      <li key={j} className="flex gap-1.5">
                        <span className="text-red-400">−</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Citations */}
      {data.citations.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-base font-semibold">
            <BookOpen className="h-4 w-4 text-blue-400" />
            Citations ({data.citations.length})
          </h3>
          <div className="grid gap-2">
            {data.citations.map((cit, i) => (
              <Card
                key={i}
                className="flex items-start gap-3 border-border/30 bg-card/30 p-3"
              >
                <Badge
                  variant="outline"
                  className="mt-0.5 shrink-0 text-[10px]"
                >
                  {cit.source}
                </Badge>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {cit.title}
                    </span>
                    {cit.url && (
                      <a
                        href={cit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  {cit.snippet && (
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {cit.snippet}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
