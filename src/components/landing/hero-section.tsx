"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  ArrowRight,
  Sparkles,
  Brain,
  Search,
  FlaskConical,
} from "lucide-react";
import Link from "next/link";

const floatingIcons = [
  { icon: Brain, delay: "0s", x: "10%", y: "20%" },
  { icon: Search, delay: "1s", x: "80%", y: "15%" },
  { icon: FlaskConical, delay: "2s", x: "85%", y: "70%" },
  { icon: Sparkles, delay: "0.5s", x: "15%", y: "75%" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4">
      {/* Gradient background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute bottom-1/3 left-0 h-[300px] w-[300px] -translate-x-1/4 rounded-full bg-amber-500/5 blur-[80px]" />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ icon: Icon, delay, x, y }, i) => (
        <div
          key={i}
          className="pointer-events-none absolute animate-pulse opacity-10"
          style={{
            left: x,
            top: y,
            animationDelay: delay,
            animationDuration: "3s",
          }}
        >
          <Icon className="h-8 w-8 text-violet-400" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <Badge
          variant="secondary"
          className="mb-6 gap-1.5 border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-violet-300"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Innovation Engine
        </Badge>

        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Turn Any Challenge Into{" "}
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Breakthrough Innovation
          </span>
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Describe your problem. Our AI expert analyzes it through 6 proven
          innovation methodologies, searches for existing solutions, generates
          novel approaches, and checks patent landscapes — all in one seamless
          pipeline.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="gap-2 bg-violet-600 px-8 text-base hover:bg-violet-700"
            >
              <Lightbulb className="h-5 w-5" />
              Start Innovating
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-border/50 px-8 text-base"
            >
              See How It Works
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-muted-foreground/50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="h-8 w-[1px] animate-pulse bg-gradient-to-b from-muted-foreground/50 to-transparent" />
      </div>
    </section>
  );
}
