"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Plus,
  Lightbulb,
  Clock,
  ArrowRight,
  Trash2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusBadge(status: string) {
  switch (status) {
    case "completed":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
    case "analyzing":
      return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    case "failed":
      return "border-red-500/30 bg-red-500/10 text-red-400";
    default:
      return "border-border/50 bg-muted/50 text-muted-foreground";
  }
}

function statusLabel(status: string) {
  switch (status) {
    case "completed":
      return "Completed";
    case "analyzing":
      return "Analyzing...";
    case "failed":
      return "Failed";
    default:
      return "Pending";
  }
}

export default function DashboardPage() {
  const challenges = useQuery(api.challenges.listByUser);
  const deleteChallenge = useMutation(api.challenges.remove);

  // Loading state
  if (challenges === undefined) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Innovation Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Your challenges and innovation analyses
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-border/50 bg-card/50 p-5">
              <Skeleton className="mb-3 h-5 w-20" />
              <Skeleton className="mb-2 h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (challenges.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Innovation Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Your challenges and innovation analyses
          </p>
        </div>
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
      </div>
    );
  }

  // Challenges list
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Innovation Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            {challenges.length} challenge{challenges.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/dashboard/new">
          <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
            <Plus className="h-4 w-4" />
            New Challenge
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <Link
            key={challenge._id}
            href={`/dashboard/${challenge._id}`}
          >
            <Card className="group cursor-pointer border-border/50 bg-card/50 p-5 transition-all hover:border-violet-500/30 hover:shadow-md">
              <div className="mb-3 flex items-start justify-between">
                <Badge
                  variant="outline"
                  className={statusBadge(challenge.status)}
                >
                  {challenge.status === "failed" && (
                    <AlertCircle className="mr-1 h-3 w-3" />
                  )}
                  {statusLabel(challenge.status)}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDate(challenge._creationTime)}
                </span>
              </div>
              <h3 className="mb-2 font-semibold transition-colors group-hover:text-violet-400">
                {challenge.title}
              </h3>
              <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                {challenge.description}
              </p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {challenge.solutions?.length ?? 0} solutions generated
                </span>
                <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
