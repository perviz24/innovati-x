"use client";

import { UserButton } from "@clerk/nextjs";
import { Lightbulb, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-violet-400" />
          <span className="text-lg font-bold tracking-tight">Innovati-X</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard/new">
            <Button
              size="sm"
              className="gap-1.5 bg-violet-600 hover:bg-violet-700"
            >
              <Plus className="h-4 w-4" />
              New Challenge
            </Button>
          </Link>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
