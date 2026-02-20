import {
  GitBranch,
  FileText,
  Columns3,
  Network,
  Quote,
  Gauge,
} from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Interactive Flowchart Canvas",
    description:
      "Visualize your innovation pipeline as a flowchart. Add, edit, and connect custom nodes.",
  },
  {
    icon: GitBranch,
    title: "Mind Map View",
    description:
      "Explore solutions as a radial mind map. See connections between methodologies and ideas.",
  },
  {
    icon: Gauge,
    title: "Innovation Scoring Matrix",
    description:
      "Radar chart scoring across 6 dimensions: Novelty, Feasibility, Impact, Scalability, Cost, Time.",
  },
  {
    icon: Columns3,
    title: "Solution Comparison",
    description:
      "Side-by-side comparison of top solutions with strengths, weaknesses, and trade-offs.",
  },
  {
    icon: Quote,
    title: "Source Citations",
    description:
      "Every claim is backed by citations — academic papers, patents, web sources with links.",
  },
  {
    icon: FileText,
    title: "Professional PDF Export",
    description:
      "Export your full analysis as a polished PDF report — ready for presentations and stakeholders.",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-t border-border/30 bg-muted/20 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for Serious Innovation
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Professional tools for analyzing, visualizing, and presenting
            breakthrough solutions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-lg bg-violet-500/10 p-2.5">
                    <Icon className="h-5 w-5 text-violet-400" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
