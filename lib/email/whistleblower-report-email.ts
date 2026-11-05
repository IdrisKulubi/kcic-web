// Server-side only. Import only from server code.
import { sendEmail } from "./resend";

const DEFAULT_RECIPIENT = "reports@baileycgroup.com";

const CATEGORY_LABELS: Record<string, string> = {
  fraud: "Fraud",
  misconduct: "Misconduct",
  safety: "Safety",
  harassment: "Harassment",
  corruption: "Corruption",
  other: "Other",
};

export interface WhistleblowerEmailReport {
  referenceNumber: string;
  category: string;
  subject: string;
  description: string;
  incidentDate: Date | null;
  department: string | null;
  involvedParties: string | null;
  evidence: string | null;
  contactEmail: string | null;
  isAnonymous: boolean;
  submittedAt: Date;
}

function recipients(): string[] {
  const raw = process.env.WHISTLEBLOWER_REPORT_EMAIL?.trim() || DEFAULT_RECIPIENT;
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(date: Date, withTime: boolean): string {
  return new Intl.DateTimeFormat("en-KE", {
    timeZone: "Africa/Nairobi",
    dateStyle: "long",
    ...(withTime ? { timeStyle: "short" } : {}),
  }).format(date) + (withTime ? " (EAT)" : "");
}

function buildRows(report: WhistleblowerEmailReport): [string, string][] {
  const category = CATEGORY_LABELS[report.category] ?? report.category;
  const contact = report.isAnonymous
    ? "Anonymous"
    : report.contactEmail ?? "Not provided";

  return [
    ["Reference", report.referenceNumber],
    ["Submitted", formatDate(report.submittedAt, true)],
    ["Category", category],
    ["Reporter", contact],
    ["Subject", report.subject],
    ["Description", report.description],
    ["Incident date", report.incidentDate ? formatDate(report.incidentDate, false) : "Not provided"],
    ["Department", report.department || "Not provided"],
    ["Involved parties", report.involvedParties || "Not provided"],
    ["Evidence / supporting info", report.evidence || "Not provided"],
  ];
}

function buildHtml(rows: [string, string][]): string {
  const body = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#374151;vertical-align:top;width:180px">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
      <div style="padding:16px 20px;background:#111827;color:#ffffff">
        <div style="font-size:16px;font-weight:700">New whistleblower report</div>
        <div style="font-size:12px;opacity:.8">Kenya Climate Innovation Centre — confidential</div>
      </div>
      <table role="presentation" style="width:100%;border-collapse:collapse">${body}
      </table>
      <div style="padding:14px 20px;font-size:12px;color:#6b7280">
        This report was submitted through the whistleblowing form on the KCIC website and is also stored in the KCIC admin panel.
      </div>
    </div>
  </body>
</html>`;
}

function buildText(rows: [string, string][]): string {
  return [
    "NEW WHISTLEBLOWER REPORT — Kenya Climate Innovation Centre (confidential)",
    "",
    ...rows.map(([label, value]) => `${label}:\n${value}\n`),
    "Submitted through the whistleblowing form on the KCIC website.",
  ].join("\n");
}

/** Sends a copy of a whistleblower report to the auditors. Never throws. */
export async function sendWhistleblowerReportEmail(report: WhistleblowerEmailReport) {
  const rows = buildRows(report);
  const category = CATEGORY_LABELS[report.category] ?? report.category;
  const subjectLine = report.subject.replace(/\s+/g, " ").slice(0, 120);

  const result = await sendEmail({
    to: recipients(),
    subject: `[Whistleblower] ${report.referenceNumber} · ${category} · ${subjectLine}`,
    html: buildHtml(rows),
    text: buildText(rows),
    replyTo: !report.isAnonymous && report.contactEmail ? report.contactEmail : undefined,
    idempotencyKey: `whistleblower-${report.referenceNumber}`,
  });

  if (!result.ok) {
    console.error(
      `[whistleblower-email] Failed to send report ${report.referenceNumber}: ${result.error}`,
    );
  }
  return result;
}
