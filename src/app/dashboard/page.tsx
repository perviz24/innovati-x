import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Lightbulb, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Innovation Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Your challenges and innovation analyses
        </p>
      </div>

      {/* Empty state — will be replaced with real data when Convex is integrated */}
      <Card className="flex flex-col items-center justify-center border-dashed border-border/50 bg-card/30 p-12 text-center">
        <div className="mb-4 rounded-full bg-violet-500/10 p-4">
          <Lightbulb className="h-8 w-8 text-violet-400" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">No challenges yet</h2>
        <p className="mb-6 max-w-md text-muted-foreground">
          Start by describing a challenge or problem you want to solve. Our AI
          will analyze it through 6 proven innovation methodologies.
        </p>
        <Link href="/dashboard/new">
          <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
            <Plus className="h-4 w-4" />
            Create Your First Challenge
          </Button>
        </Link>
      </Card>

      {/* Placeholder for future challenge cards — shows structure */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Analyses</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* These are demo cards to show the layout — will be replaced with real data */}
          {[
            {
              title: "Sustainable Urban Farming",
              status: "Completed",
              date: "Demo",
              solutions: 6,
            },
            {
              title: "Reducing Medical Wait Times",
              status: "In Progress",
              date: "Demo",
              solutions: 3,
            },
            {
              title: "Clean Energy Storage",
              status: "Completed",
              date: "Demo",
              solutions: 8,
            },
          ].map((challenge) => (
            <Card
              key={challenge.title}
              className="group cursor-pointer border-border/50 bg-card/50 p-5 transition-all hover:border-violet-500/30 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <Badge
                  variant="outline"
                  className={
                    challenge.status === "Completed"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                  }
                >
                  {challenge.status}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {challenge.date}
                </span>
              </div>
              <h3 className="mb-2 font-semibold group-hover:text-violet-400 transition-colors">
                {challenge.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{challenge.solutions} solutions generated</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground/50">
          Demo cards — will show your real challenges after creating them
        </p>
      </div>
    </div>
  );
}
