"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface MindMapData {
  title?: string;
  decomposition?: {
    components: string[];
    constraints: string[];
    successCriteria: string[];
  };
  research?: {
    existingSolutions: { title: string }[];
  };
  gapAnalysis?: {
    gaps: { area: string }[];
    unmetNeeds: string[];
  };
  solutions?: {
    methodology: string;
    title: string;
    scores?: Record<string, number>;
  }[];
  patentLandscape?: {
    riskLevel: string;
    whiteSpaces: string[];
  };
}

// Branch colors matching the pipeline theme
const BRANCH_COLORS = {
  components: "#8b5cf6",
  research: "#3b82f6",
  gaps: "#10b981",
  solutions: "#f59e0b",
  patents: "#06b6d4",
} as const;

// Radial position helpers
const CENTER = { x: 500, y: 350 };
const BRANCH_RADIUS = 220;
const LEAF_RADIUS = 160;

interface BranchConfig {
  key: string;
  label: string;
  color: string;
  angle: number; // degrees from top
  items: string[];
}

function buildBranches(data: MindMapData): BranchConfig[] {
  const branches: BranchConfig[] = [];

  if (data.decomposition?.components?.length) {
    branches.push({
      key: "components",
      label: "Components",
      color: BRANCH_COLORS.components,
      angle: 270, // left
      items: data.decomposition.components.slice(0, 5),
    });
  }

  if (data.research?.existingSolutions?.length) {
    branches.push({
      key: "research",
      label: "Research",
      color: BRANCH_COLORS.research,
      angle: 342, // upper-left
      items: data.research.existingSolutions.slice(0, 4).map((s) => s.title),
    });
  }

  if (data.gapAnalysis?.gaps?.length) {
    branches.push({
      key: "gaps",
      label: "Gaps",
      color: BRANCH_COLORS.gaps,
      angle: 54, // upper-right
      items: data.gapAnalysis.gaps.slice(0, 4).map((g) => g.area),
    });
  }

  if (data.solutions?.length) {
    branches.push({
      key: "solutions",
      label: "Solutions",
      color: BRANCH_COLORS.solutions,
      angle: 126, // lower-right
      items: data.solutions.slice(0, 6).map((s) => s.methodology),
    });
  }

  if (data.patentLandscape) {
    const items = [`Risk: ${data.patentLandscape.riskLevel.toUpperCase()}`];
    if (data.patentLandscape.whiteSpaces?.length) {
      items.push(
        ...data.patentLandscape.whiteSpaces
          .slice(0, 3)
          .map((ws) => (ws.length > 30 ? ws.slice(0, 30) + "…" : ws)),
      );
    }
    branches.push({
      key: "patents",
      label: "Patents",
      color: BRANCH_COLORS.patents,
      angle: 198, // lower-left
      items,
    });
  }

  return branches;
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function buildMindMapNodes(
  data: MindMapData,
  branches: BranchConfig[],
): Node[] {
  const nodes: Node[] = [];

  // Center node — the challenge
  const title = data.title || "Challenge";
  nodes.push({
    id: "center",
    position: { x: CENTER.x - 70, y: CENTER.y - 30 },
    data: { label: title.length > 30 ? title.slice(0, 30) + "…" : title },
    style: {
      background: "linear-gradient(135deg, #7c3aed20, #8b5cf620)",
      border: "2px solid #8b5cf6",
      borderRadius: 50,
      padding: "14px 20px",
      fontSize: 14,
      fontWeight: 700,
      color: "#c4b5fd",
      width: 140,
      height: 60,
      display: "flex",
      alignItems: "center" as const,
      justifyContent: "center" as const,
      textAlign: "center" as const,
    },
  });

  // Branch category nodes
  branches.forEach((branch) => {
    const bx = CENTER.x + BRANCH_RADIUS * Math.cos(toRad(branch.angle)) - 55;
    const by = CENTER.y + BRANCH_RADIUS * Math.sin(toRad(branch.angle)) - 18;

    nodes.push({
      id: `branch-${branch.key}`,
      position: { x: bx, y: by },
      data: { label: branch.label },
      style: {
        background: `${branch.color}20`,
        border: `2px solid ${branch.color}`,
        borderRadius: 24,
        padding: "8px 18px",
        fontSize: 13,
        fontWeight: 600,
        color: branch.color,
        width: 110,
        textAlign: "center" as const,
      },
    });

    // Leaf nodes — fan out from branch node
    const leafCount = branch.items.length;
    const fanSpread = Math.min(50, 120 / Math.max(leafCount, 1));

    branch.items.forEach((item, i) => {
      const leafAngle =
        branch.angle + (i - (leafCount - 1) / 2) * fanSpread * 0.4;
      const lx =
        CENTER.x +
        (BRANCH_RADIUS + LEAF_RADIUS) * Math.cos(toRad(leafAngle)) -
        45;
      const ly =
        CENTER.y +
        (BRANCH_RADIUS + LEAF_RADIUS) * Math.sin(toRad(leafAngle)) -
        12;

      nodes.push({
        id: `leaf-${branch.key}-${i}`,
        position: { x: lx, y: ly },
        data: { label: item.length > 22 ? item.slice(0, 22) + "…" : item },
        style: {
          background: `${branch.color}08`,
          border: `1px solid ${branch.color}30`,
          borderRadius: 8,
          padding: "5px 8px",
          fontSize: 10,
          color: `${branch.color}cc`,
          width: 90,
          textAlign: "center" as const,
        },
      });
    });
  });

  return nodes;
}

function buildMindMapEdges(branches: BranchConfig[]): Edge[] {
  const edges: Edge[] = [];

  branches.forEach((branch) => {
    // Center → branch
    edges.push({
      id: `edge-center-${branch.key}`,
      source: "center",
      target: `branch-${branch.key}`,
      style: { stroke: branch.color, strokeWidth: 2 },
      type: "default",
    });

    // Branch → leaves
    branch.items.forEach((_, i) => {
      edges.push({
        id: `edge-${branch.key}-${i}`,
        source: `branch-${branch.key}`,
        target: `leaf-${branch.key}-${i}`,
        style: { stroke: `${branch.color}50`, strokeWidth: 1 },
        type: "default",
      });
    });
  });

  return edges;
}

export function MindMapCanvas({ data }: { data: MindMapData }) {
  const branches = useMemo(() => buildBranches(data), [data]);
  const initialNodes = useMemo(
    () => buildMindMapNodes(data, branches),
    [data, branches],
  );
  const initialEdges = useMemo(() => buildMindMapEdges(branches), [branches]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-[500px] w-full rounded-lg border border-border/50 bg-card/30">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={2}
      >
        <Controls showInteractive={false} style={{ borderRadius: 8 }} />
        <MiniMap
          style={{ borderRadius: 8, opacity: 0.8 }}
          maskColor="rgba(0,0,0,0.5)"
        />
        <Background gap={20} size={1} color="hsl(var(--border) / 0.3)" />
      </ReactFlow>
    </div>
  );
}
