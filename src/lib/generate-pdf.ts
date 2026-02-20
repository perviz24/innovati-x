import jsPDF from "jspdf";
import {
  VIOLET,
  DARK_BG,
  GRAY,
  addHeader,
  addBulletList,
  checkPageBreak,
  renderGapAnalysis,
  renderSolutions,
  renderPatentLandscape,
} from "./pdf-sections";

interface ChallengeData {
  title: string;
  description: string;
  decomposition?: {
    components: string[];
    constraints: string[];
    assumptions: string[];
    successCriteria: string[];
  };
  research?: {
    existingSolutions: {
      title: string;
      description: string;
      source: string;
      strengths: string[];
      weaknesses: string[];
    }[];
    citations: { title: string; source: string; url?: string }[];
  };
  gapAnalysis?: {
    gaps: { area: string; description: string; opportunity: string }[];
    unmetNeeds: string[];
    underservedSegments: string[];
  };
  solutions?: {
    methodology: string;
    title: string;
    description: string;
    keyInsights: string[];
    scores?: Record<string, number>;
  }[];
  patentLandscape?: {
    existingPatents: {
      title: string;
      number?: string;
      relevance: string;
      summary: string;
    }[];
    whiteSpaces: string[];
    riskLevel: string;
    recommendation: string;
  };
}

export function generatePDF(data: ChallengeData): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // Title page
  doc.setFillColor(...DARK_BG);
  doc.rect(0, 0, 210, 297, "F");

  doc.setFontSize(28);
  doc.setTextColor(...VIOLET);
  doc.text("Innovati-X", 20, 50);

  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text("AI-Powered Innovation Analysis Report", 20, 60);

  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  const titleLines = doc.splitTextToSize(data.title, 170);
  doc.text(titleLines, 20, 85);

  doc.setFontSize(11);
  doc.setTextColor(...GRAY);
  const descLines = doc.splitTextToSize(data.description, 170);
  doc.text(descLines, 20, 85 + titleLines.length * 10 + 10);

  doc.setFontSize(9);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 20, 280);

  // Section 1: Decomposition
  if (data.decomposition) {
    doc.addPage();
    let y = 20;
    y = addHeader(doc, "1. Problem Decomposition", y);

    doc.setFontSize(11);
    doc.setTextColor(200, 200, 200);
    doc.text("Core Components", 20, y);
    y += 6;
    y = addBulletList(doc, data.decomposition.components, y);

    y = checkPageBreak(doc, y, 20);
    doc.setFontSize(11);
    doc.setTextColor(200, 200, 200);
    doc.text("Constraints", 20, y);
    y += 6;
    y = addBulletList(doc, data.decomposition.constraints, y);

    y = checkPageBreak(doc, y, 20);
    doc.setTextColor(200, 200, 200);
    doc.text("Hidden Assumptions", 20, y);
    y += 6;
    y = addBulletList(doc, data.decomposition.assumptions, y);

    y = checkPageBreak(doc, y, 20);
    doc.setTextColor(200, 200, 200);
    doc.text("Success Criteria", 20, y);
    y += 6;
    addBulletList(doc, data.decomposition.successCriteria, y);
  }

  // Section 2: Research
  if (data.research) {
    doc.addPage();
    let y = 20;
    y = addHeader(doc, "2. Research & Existing Solutions", y);

    for (const sol of data.research.existingSolutions) {
      y = checkPageBreak(doc, y, 30);
      doc.setFontSize(11);
      doc.setTextColor(200, 200, 200);
      doc.text(sol.title, 20, y);
      y += 5;
      doc.setFontSize(9);
      doc.setTextColor(...GRAY);
      const solDesc = doc.splitTextToSize(sol.description, 165);
      doc.text(solDesc, 25, y);
      y += solDesc.length * 4 + 3;

      if (sol.strengths.length > 0) {
        doc.setTextColor(16, 185, 129);
        doc.text("Strengths: " + sol.strengths.join(", "), 25, y);
        y += 5;
      }
      if (sol.weaknesses.length > 0) {
        doc.setTextColor(245, 158, 11);
        doc.text("Weaknesses: " + sol.weaknesses.join(", "), 25, y);
        y += 5;
      }
      y += 3;
    }

    if (data.research.citations.length > 0) {
      y = checkPageBreak(doc, y, 15);
      doc.setFontSize(11);
      doc.setTextColor(200, 200, 200);
      doc.text("Citations", 20, y);
      y += 6;
      for (const cite of data.research.citations.slice(0, 10)) {
        y = checkPageBreak(doc, y, 8);
        doc.setFontSize(9);
        doc.setTextColor(...GRAY);
        doc.text(`• ${cite.title} (${cite.source})`, 25, y);
        y += 5;
      }
    }
  }

  // Sections 3-6: delegated to pdf-sections
  if (data.gapAnalysis) renderGapAnalysis(doc, data.gapAnalysis);
  if (data.solutions) renderSolutions(doc, data.solutions);
  if (data.patentLandscape) renderPatentLandscape(doc, data.patentLandscape);

  // Download
  const filename = `innovatix-${data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}.pdf`;
  doc.save(filename);
}
