"use client";

import { ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

// Convex client is only created when URL is configured
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

function ConvexWrapper({ children }: { children: ReactNode }) {
  if (!convex) {
    // Graceful fallback when Convex isn't configured yet
    return <>{children}</>;
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

export function ConvexClerkProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#8b5cf6",
          colorBackground: "#1c1c1c",
          colorText: "#ffffff",
          colorInputBackground: "#262626",
          colorInputText: "#ffffff",
        },
      }}
    >
      <ConvexWrapper>{children}</ConvexWrapper>
    </ClerkProvider>
  );
}
