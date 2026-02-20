"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  MarkerType,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface FlowchartData {
  decomposition?: { components: string[] };
  solutions?: { methodology: string; title: string }[];
  gapAnalysis?: { gaps: { area: string }[] };
  patentLandscape?: { riskLevel: string };
}

// Colors for each pipeline stage
const STAGE_COLORS: Record<string, string> = {
  decomposition: "#8b5cf6",
  research: "#3b82f6",
  gapAnalysis: "#10b981",
  innovation: "#f59e0b",
  scoring: "#f43f5e",
  patent: "#06b6d4",
};

function buildNodes(data: FlowchartData): Node[] {
  const nodes: Node[] = [];
  const stageY = 60;
  const stageSpacing = 220;

  // Pipeline stage nodes (horizontal flow)
  const stages = [
    { id: "stage-decomposition", label: "Problem\nDecomposition", color: STAGE_COLORS.decomposition },
    { id: "stage-research", label: "Deep\nResearch", color: STAGE_COLORS.research },
    { id: "stage-gapAnalysis", label: "Gap\nAnalysis", color: STAGE_COLORS.gapAnalysis },
    { id: "stage-innovation", label: "Innovation\nGeneration", color: STAGE_COLORS.innovation },
    { id: "stage-scoring", label: "Scoring &\nRanking", color: STAGE_COLORS.scoring },
    { id: "stage-patent", label: "Patent\nLandscape", color: STAGE_COLORS.patent },
  ];

  stages.forEach((stage, i) => {
    nodes.push({
      id: stage.id,
      position: { x: i * stageSpacing, y: stageY },
      data: { label: stage.label },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: {
        background: `${stage.color}20`,
        border: `2px solid ${stage.color}`,
        borderRadius: 12,
        padding: "12px 16px",
        fontSize: 13,
        fontWeight: 600,
        color: stage.color,
        width: 140,
        textAlign: "center" as const,
        whiteSpace: "pre-line" as const,
      },
    });
  });

  // Component nodes from decomposition (below stage 1)
  if (data.decomposition?.components) {
    data.decomposition.components.slice(0, 4).forEach((comp, i) => {
      nodes.push({
        id: `comp-${i}`,
        position: { x: -40 + i * 100, y: stageY + 120 },
        data: { label: comp.length > 25 ? comp.slice(0, 25) + "…" : comp },
        targetPosition: Position.Top,
        style: {
          background: `${STAGE_COLORS.decomposition}10`,
          border: `1px solid ${STAGE_COLORS.decomposition}40`,
          borderRadius: 8,
          padding: "6px 10px",
          fontSize: 10,
          color: "#a78bfa",
          width: 90,
          textAlign: "center" as const,
        },
      });
    });
  }

  // Solution nodes from innovation (below stage 4)
  if (data.solutions) {
    data.solutions.slice(0, 6).forEach((sol, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      nodes.push({
        id: `sol-${i}`,
        position: {
          x: 3 * stageSpacing - 80 + col * 130,
          y: stageY + 120 + row * 80,
        },
        data: { label: sol.methodology },
        targetPosition: Position.Top,
        style: {
          background: `${STAGE_COLORS.innovation}15`,
          border: `1px solid ${STAGE_COLORS.innovation}50`,
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: 11,
          fontWeight: 500,
          color: "#fbbf24",
          width: 110,
          textAlign: "center" as const,
        },
      });
    });
  }

  // Gap nodes (below stage 3)
  if (data.gapAnalysis?.gaps) {
    data.gapAnalysis.gaps.slice(0, 3).forEach((gap, i) => {
      nodes.push({
        id: `gap-${i}`,
        position: { x: 2 * stageSpacing - 50 + i * 110, y: stageY + 120 },
        data: { label: gap.area.length > 20 ? gap.area.slice(0, 20) + "…" : gap.area },
        targetPosition: Position.Top,
        style: {
          background: `${STAGE_COLORS.gapAnalysis}10`,
          border: `1px solid ${STAGE_COLORS.gapAnalysis}40`,
          borderRadius: 8,
          padding: "6px 10px",
          fontSize: 10,
          color: "#34d399",
          width: 100,
          textAlign: "center" as const,
        },
      });
    });
  }

  // Patent risk node (below stage 6)
  if (data.patentLandscape) {
    const riskColor =
      data.patentLandscape.riskLevel === "low"
        ? "#10b981"
        : data.patentLandscape.riskLevel === "medium"
          ? "#f59e0b"
          : "#ef4444";
    nodes.push({
      id: "patent-risk",
      position: { x: 5 * stageSpacing - 10, y: stageY + 120 },
      data: { label: `${data.patentLandscape.riskLevel.toUpperCase()}\nRISK` },
      targetPosition: Position.Top,
      style: {
        background: `${riskColor}15`,
        border: `2px solid ${riskColor}`,
        borderRadius: 50,
        padding: "10px 16px",
        fontSize: 11,
        fontWeight: 700,
        color: riskColor,
        width: 80,
        height: 80,
        textAlign: "center" as const,
        display: "flex",
        alignItems: "center" as const,
        justifyContent: "center" as const,
        whiteSpace: "pre-line" as const,
      },
    });
  }

  return nodes;
}

function buildEdges(data: FlowchartData): Edge[] {
  const edges: Edge[] = [];
  const stageIds = [
    "stage-decomposition",
    "stage-research",
    "stage-gapAnalysis",
    "stage-innovation",
    "stage-scoring",
    "stage-patent",
  ];

  // Sequential stage connections
  for (let i = 0; i < stageIds.length - 1; i++) {
    edges.push({
      id: `edge-${stageIds[i]}-${stageIds[i + 1]}`,
      source: stageIds[i],
      target: stageIds[i + 1],
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#6b7280", strokeWidth: 2 },
    });
  }

  // Component edges from decomposition
  if (data.decomposition?.components) {
    data.decomposition.components.slice(0, 4).forEach((_, i) => {
      edges.push({
        id: `edge-decomp-${i}`,
        source: "stage-decomposition",
        target: `comp-${i}`,
        style: { stroke: `${STAGE_COLORS.decomposition}60`, strokeWidth: 1 },
      });
    });
  }

  // Gap edges
  if (data.gapAnalysis?.gaps) {
    data.gapAnalysis.gaps.slice(0, 3).forEach((_, i) => {
      edges.push({
        id: `edge-gap-${i}`,
        source: "stage-gapAnalysis",
        target: `gap-${i}`,
        style: { stroke: `${STAGE_COLORS.gapAnalysis}60`, strokeWidth: 1 },
      });
    });
  }

  // Solution edges from innovation
  if (data.solutions) {
    data.solutions.slice(0, 6).forEach((_, i) => {
      edges.push({
        id: `edge-sol-${i}`,
        source: "stage-innovation",
        target: `sol-${i}`,
        style: { stroke: `${STAGE_COLORS.innovation}60`, strokeWidth: 1 },
      });
    });
  }

  // Patent risk edge
  if (data.patentLandscape) {
    edges.push({
      id: "edge-patent-risk",
      source: "stage-patent",
      target: "patent-risk",
      style: { stroke: `${STAGE_COLORS.patent}60`, strokeWidth: 1 },
    });
  }

  return edges;
}

export function FlowchartCanvas({ data }: { data: FlowchartData }) {
  const initialNodes = useMemo(() => buildNodes(data), [data]);
  const initialEdges = useMemo(() => buildEdges(data), [data]);

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
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={2}
      >
        <Controls
          showInteractive={false}
          style={{ borderRadius: 8 }}
        />
        <MiniMap
          style={{ borderRadius: 8, opacity: 0.8 }}
          maskColor="rgba(0,0,0,0.5)"
        />
        <Background gap={20} size={1} color="hsl(var(--border) / 0.3)" />
      </ReactFlow>
    </div>
  );
}
