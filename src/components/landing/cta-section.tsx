import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 via-indigo-500/5 to-violet-500/5 p-12 text-center">
          {/* Glow effect */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[200px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[80px]" />
          </div>

          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Innovate?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
              Describe any challenge — technical, business, or societal. Let our
              AI innovation engine find breakthrough solutions.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="gap-2 bg-violet-600 px-8 text-base hover:bg-violet-700"
              >
                <Lightbulb className="h-5 w-5" />
                Launch Innovation Engine
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
