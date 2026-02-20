// Environment variable validation — import from here, never use process.env directly

function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

// Server-side only (API routes, server components)
export const env = {
  ANTHROPIC_API_KEY: getEnvVar("ANTHROPIC_API_KEY"),
  EXA_API_KEY: getEnvVar("EXA_API_KEY"),
  PERPLEXITY_API_KEY: getEnvVar("PERPLEXITY_API_KEY"),
  CONVEX_DEPLOYMENT: getEnvVar("CONVEX_DEPLOYMENT", false),
};

// Client-side (available in browser)
export const publicEnv = {
  NEXT_PUBLIC_CONVEX_URL: getEnvVar("NEXT_PUBLIC_CONVEX_URL"),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: getEnvVar(
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
  ),
};
