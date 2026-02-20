import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const methodologies = [
  {
    name: "TRIZ",
    fullName: "Theory of Inventive Problem Solving",
    description:
      "Systematic approach using 40 inventive principles and contradiction analysis to solve technical problems.",
    origin: "Genrich Altshuller, 1946",
    badge: "Engineering",
  },
  {
    name: "SCAMPER",
    fullName: "Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse",
    description:
      "Creative thinking technique that applies seven transformation operators to existing solutions.",
    origin: "Bob Eberle, 1971",
    badge: "Creative",
  },
  {
    name: "Design Thinking",
    fullName: "Human-Centered Design Process",
    description:
      "Empathy-driven methodology that reframes problems from the user perspective to find human-centered solutions.",
    origin: "Stanford d.school",
    badge: "User-Centric",
  },
  {
    name: "Blue Ocean Strategy",
    fullName: "Value Innovation Framework",
    description:
      "Strategic framework that creates uncontested market space by making competition irrelevant.",
    origin: "Kim & Mauborgne, 2005",
    badge: "Strategic",
  },
  {
    name: "Biomimicry",
    fullName: "Nature-Inspired Innovation",
    description:
      "Draws inspiration from nature's time-tested patterns and strategies to solve human design challenges.",
    origin: "Janine Benyus, 1997",
    badge: "Nature",
  },
  {
    name: "First Principles",
    fullName: "Fundamental Reasoning from Ground Truth",
    description:
      "Breaks problems down to fundamental truths and rebuilds solutions from scratch, ignoring conventions.",
    origin: "Aristotle / Elon Musk",
    badge: "Foundational",
  },
];

const badgeColors: Record<string, string> = {
  Engineering: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Creative: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "User-Centric": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Strategic: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Nature: "bg-green-500/10 text-green-400 border-green-500/20",
  Foundational: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export function MethodologiesSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            6 Proven Innovation Methodologies
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Each solution is generated through multiple lenses, ensuring diverse
            and robust innovation approaches.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {methodologies.map((method) => (
            <Card
              key={method.name}
              className="group border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-violet-500/30"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight">
                  {method.name}
                </h3>
                <Badge
                  variant="outline"
                  className={badgeColors[method.badge] ?? ""}
                >
                  {method.badge}
                </Badge>
              </div>

              <p className="mb-2 text-xs font-medium text-muted-foreground/60">
                {method.fullName}
              </p>

              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {method.description}
              </p>

              <p className="text-xs text-muted-foreground/40 font-mono">
                {method.origin}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
