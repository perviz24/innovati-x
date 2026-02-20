"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Sparkles,
  Lightbulb,
  Beaker,
  Search,
  BarChart3,
  FileText,
} from "lucide-react";
import Link from "next/link";

const EXAMPLE_CHALLENGES = [
  "How can we make urban farming sustainable and affordable for city dwellers?",
  "How might we reduce emergency room wait times by 50% without increasing staff?",
  "What new approaches could make renewable energy storage 10x cheaper?",
];

const PIPELINE_STAGES = [
  { icon: Lightbulb, label: "Decompose", color: "text-violet-400" },
  { icon: Search, label: "Research", color: "text-blue-400" },
  { icon: Beaker, label: "Gaps", color: "text-emerald-400" },
  { icon: Sparkles, label: "Innovate", color: "text-amber-400" },
  { icon: BarChart3, label: "Score", color: "text-rose-400" },
  { icon: FileText, label: "Patents", color: "text-cyan-400" },
];

const MAX_CHARS = 2000;

export default function NewChallengePage() {
  const router = useRouter();
  const createChallenge = useMutation(api.challenges.create);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const charCount = description.length;
  const isValid = description.trim().length >= 20;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const challengeTitle =
        title.trim() ||
        description.trim().split(" ").slice(0, 6).join(" ") + "...";

      const challengeId = await createChallenge({
        title: challengeTitle,
        description: description.trim(),
      });

      // Redirect to the challenge analysis page
      router.push(`/dashboard/${challengeId}`);
    } catch (error) {
      console.error("Failed to create challenge:", error);
      setIsSubmitting(false);
    }
  }

  function useExample(example: string) {
    setDescription(example);
    if (!title) {
      // Auto-generate a short title from the example
      const words = example.split(" ").slice(0, 6).join(" ");
      setTitle(words + "...");
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            New Challenge
          </h1>
          <p className="text-sm text-muted-foreground">
            Describe a problem or challenge you want to solve
          </p>
        </div>
      </div>

      {/* Pipeline preview */}
      <Card className="border-border/50 bg-card/30 p-4">
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          Your challenge will be analyzed through:
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 rounded-full bg-muted/50 px-2.5 py-1">
                <stage.icon className={`h-3.5 w-3.5 ${stage.color}`} />
                <span className="text-xs font-medium">{stage.label}</span>
              </div>
              {i < PIPELINE_STAGES.length - 1 && (
                <span className="text-muted-foreground/30">→</span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Title{" "}
            <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g., Sustainable Urban Farming"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="border-border/50 bg-card/50"
          />
          <p className="text-xs text-muted-foreground">
            A short name for your challenge. Auto-generated if left empty.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Challenge Description{" "}
            <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Describe the problem or challenge you want to solve. Be as specific as possible — include context, constraints, goals, and what success looks like..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value.slice(0, MAX_CHARS))
            }
            rows={6}
            className="resize-none border-border/50 bg-card/50"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {charCount < 20 ? (
                <span className="text-amber-400">
                  Minimum 20 characters ({20 - charCount} more needed)
                </span>
              ) : (
                <span className="text-emerald-400">
                  ✓ Ready for analysis
                </span>
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {charCount}/{MAX_CHARS}
            </p>
          </div>
        </div>

        {/* Example challenges */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Or try an example:
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_CHALLENGES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => useExample(example)}
                className="rounded-lg border border-border/50 bg-card/30 px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-violet-500/30 hover:text-foreground"
              >
                {example.length > 60
                  ? example.slice(0, 60) + "..."
                  : example}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-violet-500/30 bg-violet-500/10 text-violet-400"
            >
              <Sparkles className="mr-1 h-3 w-3" />6 methodologies
            </Badge>
            <Badge
              variant="outline"
              className="border-blue-500/30 bg-blue-500/10 text-blue-400"
            >
              AI-powered analysis
            </Badge>
          </div>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analyze Challenge
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
