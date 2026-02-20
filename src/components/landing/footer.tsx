import { Lightbulb } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/30 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-violet-400" />
          <span className="font-semibold">Innovati-X</span>
        </div>
        <p className="text-sm text-muted-foreground">
          AI-Powered Innovation Engine &middot; Built with Next.js, Claude AI &
          Vercel
        </p>
      </div>
    </footer>
  );
}
