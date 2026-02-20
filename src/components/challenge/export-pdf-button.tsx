"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Check } from "lucide-react";
import { toast } from "sonner";

interface ExportData {
  title: string;
  description: string;
  decomposition?: {
    components: string[];
    constraints: string[];
    assumptions: string[];
    successCriteria: string[];
  };
  research?: {
    existingSolutions: {
      title: string;
      description: string;
      source: string;
      strengths: string[];
      weaknesses: string[];
    }[];
    citations: { title: string; source: string; url?: string }[];
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

export function ExportPDFButton({ data }: { data: ExportData }) {
  const [status, setStatus] = useState<"idle" | "generating" | "done">("idle");

  async function handleExport() {
    setStatus("generating");
    try {
      // Dynamic import to keep bundle small
      const { generatePDF } = await import("@/lib/generate-pdf");
      generatePDF(data);
      setStatus("done");
      toast.success("PDF downloaded successfully!");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      console.error("PDF export failed:", err);
      toast.error("Failed to generate PDF. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <Button
      onClick={handleExport}
      disabled={status === "generating"}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {status === "generating" ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : status === "done" ? (
        <Check className="h-4 w-4 text-emerald-400" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {status === "generating"
        ? "Generating..."
        : status === "done"
          ? "Downloaded!"
          : "Export PDF"}
    </Button>
  );
}
