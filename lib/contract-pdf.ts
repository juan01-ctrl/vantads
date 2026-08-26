import { jsPDF } from "jspdf";
import { buildContract, type BuiltContract } from "./contract";
import type { WelcomeClient } from "./welcome-clients";

function writeWrapped(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const lines = doc.splitTextToSize(text, maxWidth) as string[];
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function ensureSpace(doc: jsPDF, y: number, needed: number, margin: number, pageHeight: number): number {
  if (y + needed > pageHeight - margin) {
    doc.addPage();
    return margin;
  }
  return y;
}

function renderContractPdf(doc: jsPDF, contract: BuiltContract) {
  const margin = 18;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  y = writeWrapped(doc, contract.brand, margin, y, maxWidth, 5);
  y += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  y = writeWrapped(doc, contract.title, margin, y, maxWidth, 4.5);
  y += 8;

  doc.setDrawColor(210, 70, 103);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  for (const row of contract.meta) {
    doc.setFont("helvetica", "bold");
    doc.text(`${row.label}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(row.value, margin + 42, y);
    y += 5;
  }

  y += 6;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  for (const section of contract.sections) {
    y = ensureSpace(doc, y, 18, margin, pageHeight);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(211, 70, 103);
    y = writeWrapped(doc, `${section.number}. ${section.title}`, margin, y, maxWidth, 5);
    y += 3;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);

    for (const p of section.paragraphs) {
      for (const chunk of p.split("\n")) {
        y = ensureSpace(doc, y, 10, margin, pageHeight);
        y = writeWrapped(doc, chunk, margin, y, maxWidth, 4.4);
        y += 2;
      }
      y += 1.5;
    }

    if (section.subsections) {
      for (const sub of section.subsections) {
        y = ensureSpace(doc, y, 14, margin, pageHeight);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(30, 30, 30);
        y = writeWrapped(doc, sub.title, margin, y, maxWidth, 4.4);
        y += 2;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(40, 40, 40);
        for (const p of sub.paragraphs) {
          y = ensureSpace(doc, y, 10, margin, pageHeight);
          y = writeWrapped(doc, p, margin, y, maxWidth, 4.4);
          y += 2.5;
        }
        y += 1;
      }
    }

    if (section.bullets?.length) {
      for (const bullet of section.bullets) {
        y = ensureSpace(doc, y, 8, margin, pageHeight);
        y = writeWrapped(doc, `•  ${bullet}`, margin + 2, y, maxWidth - 2, 4.4);
        y += 1.8;
      }
      y += 2;
    }

    if (section.afterBullets?.length) {
      for (const p of section.afterBullets) {
        y = ensureSpace(doc, y, 10, margin, pageHeight);
        y = writeWrapped(doc, p, margin, y, maxWidth, 4.4);
        y += 2.5;
      }
    }

    y += 6;
    doc.setDrawColor(230, 230, 230);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
  }

  y = ensureSpace(doc, y, 40, margin, pageHeight);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(211, 70, 103);
  y = writeWrapped(doc, "DATOS DEL SERVICIO", margin, y, maxWidth, 5);
  y += 5;

  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  for (const row of contract.summary) {
    doc.setFont("helvetica", "bold");
    doc.text(`${row.label}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(row.value, margin + 36, y);
    y += 5;
  }

  y += 10;
  y = ensureSpace(doc, y, 24, margin, pageHeight);
  doc.setDrawColor(210, 70, 103);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(90, 90, 90);
  for (const line of contract.footer) {
    y = writeWrapped(doc, line, margin, y, maxWidth, 4);
    y += 1;
  }
}

export async function downloadContractPdf(client: WelcomeClient) {
  const contract = buildContract(client);
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  renderContractPdf(doc, contract);
  const slug = client.slug.replace(/[^a-z0-9-]/gi, "-");
  doc.save(`vantads-agreement-${slug}.pdf`);
}
