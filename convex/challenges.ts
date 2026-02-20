import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new challenge
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const challengeId = await ctx.db.insert("challenges", {
      userId: identity.subject,
      title: args.title || "Untitled Challenge",
      description: args.description,
      status: "pending",
      stages: {
        decomposition: "pending",
        research: "pending",
        gapAnalysis: "pending",
        innovation: "pending",
        scoring: "pending",
        patent: "pending",
      },
    });

    return challengeId;
  },
});

// Get all challenges for the current user
export const listByUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const challenges = await ctx.db
      .query("challenges")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    return challenges;
  },
});

// Get a single challenge by ID
export const getById = query({
  args: { challengeId: v.id("challenges") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const challenge = await ctx.db.get(args.challengeId);
    if (!challenge || challenge.userId !== identity.subject) {
      return null;
    }

    return challenge;
  },
});

// Update challenge status
export const updateStatus = mutation({
  args: {
    challengeId: v.id("challenges"),
    status: v.union(
      v.literal("pending"),
      v.literal("analyzing"),
      v.literal("completed"),
      v.literal("failed"),
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const challenge = await ctx.db.get(args.challengeId);
    if (!challenge || challenge.userId !== identity.subject) {
      throw new Error("Challenge not found");
    }

    await ctx.db.patch(args.challengeId, { status: args.status });
  },
});

// Update a specific pipeline stage
export const updateStage = mutation({
  args: {
    challengeId: v.id("challenges"),
    stage: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("running"),
      v.literal("completed"),
      v.literal("failed"),
    ),
    data: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const challenge = await ctx.db.get(args.challengeId);
    if (!challenge || challenge.userId !== identity.subject) {
      throw new Error("Challenge not found");
    }

    // Update stage status
    const stages = challenge.stages ?? {
      decomposition: "pending",
      research: "pending",
      gapAnalysis: "pending",
      innovation: "pending",
      scoring: "pending",
      patent: "pending",
    };

    const stageKey = args.stage as keyof typeof stages;
    if (stageKey in stages) {
      stages[stageKey] = args.status;
    }

    // Build update object
    const update: Record<string, unknown> = { stages };

    // Store stage data if provided
    if (args.data !== undefined) {
      switch (args.stage) {
        case "decomposition":
          update.decomposition = args.data;
          break;
        case "research":
          update.research = args.data;
          break;
        case "gapAnalysis":
          update.gapAnalysis = args.data;
          break;
        case "innovation":
          update.solutions = args.data;
          break;
        case "patent":
          update.patentLandscape = args.data;
          break;
      }
    }

    await ctx.db.patch(args.challengeId, update);
  },
});

// Delete a challenge
export const remove = mutation({
  args: { challengeId: v.id("challenges") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const challenge = await ctx.db.get(args.challengeId);
    if (!challenge || challenge.userId !== identity.subject) {
      throw new Error("Challenge not found");
    }

    await ctx.db.delete(args.challengeId);
  },
});
