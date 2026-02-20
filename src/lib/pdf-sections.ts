import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Shared colors matching app theme
export const VIOLET = [139, 92, 246] as const; // #8b5cf6
export const DARK_BG = [24, 24, 27] as const; // zinc-900
export const GRAY = [161, 161, 170] as const; // zinc-400

// --- Shared helpers ---

export function addHeader(doc: jsPDF, title: string, y: number): number {
  doc.setFontSize(14);
  doc.setTextColor(...VIOLET);
  doc.text(title, 20, y);
  doc.setDrawColor(...VIOLET);
  doc.line(20, y + 2, 190, y + 2);
  return y + 10;
}

export function addBulletList(doc: jsPDF, items: string[], y: number): number {
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  for (const item of items) {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    const lines = doc.splitTextToSize(`• ${item}`, 165);
    doc.text(lines, 25, y);
    y += lines.length * 5;
  }
  return y + 3;
}

export function checkPageBreak(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > 270) {
    doc.addPage();
    return 20;
  }
  return y;
}

// --- Section renderers ---

export function renderGapAnalysis(
  doc: jsPDF,
  gapAnalysis: {
    gaps: { area: string; description: string; opportunity: string }[];
    unmetNeeds: string[];
    underservedSegments: string[];
  },
): void {
  doc.addPage();
  let y = 20;
  y = addHeader(doc, "3. Gap Analysis", y);

  for (const gap of gapAnalysis.gaps) {
    y = checkPageBreak(doc, y, 20);
    doc.setFontSize(11);
    doc.setTextColor(200, 200, 200);
    doc.text(gap.area, 20, y);
    y += 5;
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    const gapDesc = doc.splitTextToSize(gap.description, 165);
    doc.text(gapDesc, 25, y);
    y += gapDesc.length * 4 + 2;
    doc.setTextColor(16, 185, 129);
    const opp = doc.splitTextToSize(`Opportunity: ${gap.opportunity}`, 160);
    doc.text(opp, 25, y);
    y += opp.length * 4 + 5;
  }

  if (gapAnalysis.unmetNeeds.length > 0) {
    y = checkPageBreak(doc, y, 15);
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(11);
    doc.text("Unmet Needs", 20, y);
    y += 6;
    addBulletList(doc, gapAnalysis.unmetNeeds, y);
  }
}

export function renderSolutions(
  doc: jsPDF,
  solutions: {
    methodology: string;
    title: string;
    description: string;
    keyInsights: string[];
    scores?: Record<string, number>;
  }[],
): void {
  doc.addPage();
  let y = 20;
  y = addHeader(doc, "4. Innovation Solutions", y);

  for (const sol of solutions) {
    y = checkPageBreak(doc, y, 35);
    doc.setFontSize(12);
    doc.setTextColor(...VIOLET);
    doc.text(sol.methodology, 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text(sol.title, 25, y);
    y += 5;
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    const solDesc = doc.splitTextToSize(sol.description, 160);
    doc.text(solDesc, 25, y);
    y += solDesc.length * 4 + 3;

    if (sol.keyInsights.length > 0) {
      y = addBulletList(doc, sol.keyInsights.slice(0, 3), y);
    }
    y += 3;
  }

  // Scoring table
  const scoredSolutions = solutions.filter((s) => s.scores);
  if (scoredSolutions.length > 0) {
    doc.addPage();
    let ty = 20;
    ty = addHeader(doc, "5. Innovation Scoring Matrix", ty);

    const dims = ["novelty", "feasibility", "impact", "scalability", "costEfficiency", "timeToMarket"];
    const dimLabels = ["Novelty", "Feasibility", "Impact", "Scalability", "Cost Eff.", "Time-Mkt", "Average"];

    const tableHead = [["Methodology", ...dimLabels]];
    const tableBody = scoredSolutions.map((sol) => {
      const scores = dims.map((d) => String(sol.scores?.[d] ?? "-"));
      const vals = dims.map((d) => sol.scores?.[d] ?? 0);
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      return [sol.methodology, ...scores, avg.toFixed(1)];
    });

    autoTable(doc, {
      startY: ty,
      head: tableHead,
      body: tableBody,
      theme: "grid",
      styles: {
        fillColor: [30, 30, 35],
        textColor: [200, 200, 200],
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [139, 92, 246],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
      },
      columnStyles: { 0: { fontStyle: "bold", textColor: [200, 200, 200] } },
    });
  }
}

export function renderPatentLandscape(
  doc: jsPDF,
  patentLandscape: {
    existingPatents: { title: string; number?: string; relevance: string; summary: string }[];
    whiteSpaces: string[];
    riskLevel: string;
    recommendation: string;
  },
): void {
  doc.addPage();
  let y = 20;
  y = addHeader(doc, "6. Patent Landscape", y);

  doc.setFontSize(11);
  doc.setTextColor(200, 200, 200);
  doc.text(`Risk Level: ${patentLandscape.riskLevel.toUpperCase()}`, 20, y);
  y += 7;

  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  const rec = doc.splitTextToSize(patentLandscape.recommendation, 165);
  doc.text(rec, 20, y);
  y += rec.length * 4 + 5;

  if (patentLandscape.existingPatents.length > 0) {
    doc.setFontSize(11);
    doc.setTextColor(200, 200, 200);
    doc.text("Existing Patents", 20, y);
    y += 6;
    for (const p of patentLandscape.existingPatents) {
      y = checkPageBreak(doc, y, 15);
      doc.setFontSize(9);
      doc.setTextColor(...GRAY);
      doc.text(`• ${p.title}${p.number ? ` (${p.number})` : ""} — ${p.relevance}`, 25, y);
      y += 5;
    }
    y += 3;
  }

  if (patentLandscape.whiteSpaces.length > 0) {
    y = checkPageBreak(doc, y, 15);
    doc.setFontSize(11);
    doc.setTextColor(200, 200, 200);
    doc.text("IP White Spaces", 20, y);
    y += 6;
    addBulletList(doc, patentLandscape.whiteSpaces, y);
  }
}
