import { Card } from "@/components/ui/card";
import {
  Brain,
  Search,
  Lightbulb,
  Target,
  BarChart3,
  Shield,
} from "lucide-react";

const stages = [
  {
    icon: Brain,
    title: "Problem Decomposition",
    description:
      "AI breaks down your challenge into core components, constraints, and hidden assumptions.",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    icon: Search,
    title: "Deep Research",
    description:
      "Searches academic papers, patents, and the web for existing solutions and prior art.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Target,
    title: "Gap Analysis",
    description:
      "Identifies what existing solutions miss — unmet needs, underserved segments, overlooked approaches.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: Lightbulb,
    title: "Innovation Generation",
    description:
      "Applies 6 proven methodologies to generate novel solutions that fill identified gaps.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    icon: BarChart3,
    title: "Scoring & Ranking",
    description:
      "Evaluates each solution across Novelty, Feasibility, Impact, Scalability, Cost, and Time.",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
  },
  {
    icon: Shield,
    title: "Patent Landscape",
    description:
      "Checks for existing patents and IP conflicts. Identifies white spaces for protection.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
];

export function PipelineSection() {
  return (
    <section id="how-it-works" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            6-Stage Innovation Pipeline
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Every challenge runs through a rigorous, AI-driven pipeline that
            mirrors how the world&apos;s top innovators think.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <Card
                key={stage.title}
                className={`group relative border ${stage.borderColor} bg-card/50 p-6 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg`}
              >
                {/* Stage number */}
                <div className="absolute right-4 top-4 text-sm font-mono text-muted-foreground/30">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div
                  className={`mb-4 inline-flex rounded-lg ${stage.bgColor} p-3`}
                >
                  <Icon className={`h-6 w-6 ${stage.color}`} />
                </div>

                <h3 className="mb-2 text-lg font-semibold">{stage.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {stage.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
