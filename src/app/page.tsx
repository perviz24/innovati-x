import { Lightbulb } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Lightbulb className="h-16 w-16 text-violet-500" />
      <h1 className="text-4xl font-bold tracking-tight">Innovati-X</h1>
      <p className="text-muted-foreground">
        AI-Powered Innovation Engine — Coming Soon
      </p>
    </div>
  );
}
