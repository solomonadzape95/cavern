import "server-only";

import { marked } from "marked";
import { getSiteUrl } from "@/lib/mailer";

marked.setOptions({ async: false, gfm: true, breaks: true });

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Renders campaign markdown into HTML for the email body. */
export function markdownToEmailHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

/**
 * Flattens markdown into a readable plain-text fallback for the multipart
 * email — improves deliverability and serves clients that block HTML.
 */
export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/\*\*(.*?)\*\*/g, "$1") // bold
    .replace(/__(.*?)__/g, "$1")
    .replace(/\*(.*?)\*/g, "$1") // italic
    .replace(/_(.*?)_/g, "$1")
    .replace(/`{1,3}([^`]*)`{1,3}/g, "$1") // code
    .replace(/^\s*[-*]\s+/gm, "• ") // bullets
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)") // links
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const COLORS = {
  canvasDeep: "#2f382d",
  paper: "#e9e9dd",
  sage: "#a2af9e",
  moss: "#41723b",
};

/** A bulletproof, table-based CTA button styled to echo the site's grunge buttons. */
function grungeButton(label: string, href: string): string {
  // Padding goes on the <td> (not the <a>) so Outlook's Word engine — which
  // ignores display:inline-block + padding on links — still renders the box.
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 4px;border-collapse:separate;">
        <tr>
          <td align="center" bgcolor="${COLORS.moss}" style="background:${COLORS.moss};padding:15px 30px;">
            <a href="${href}" target="_blank" style="font-family:'Renju',Georgia,'Times New Roman',serif;font-size:16px;letter-spacing:0.12em;text-transform:uppercase;color:${COLORS.paper};text-decoration:none;">${escapeHtml(label)}</a>
          </td>
        </tr>
      </table>`;
}

// Inline styles applied to each tag of the rendered body. Email clients (Gmail,
// Outlook, Yahoo) routinely strip <head><style>, so anything that must render
// — headings, links, lists, tables — has to carry its styles inline.
const TAG_STYLES: Record<string, string> = {
  h1: `font-family:'Renju',Georgia,'Times New Roman',serif;text-transform:uppercase;letter-spacing:0.02em;line-height:1.1;color:${COLORS.paper};font-size:32px;margin:0 0 16px;`,
  h2: `font-family:'Renju',Georgia,'Times New Roman',serif;text-transform:uppercase;letter-spacing:0.02em;line-height:1.1;color:${COLORS.paper};font-size:26px;margin:0 0 14px;`,
  h3: `font-family:'Renju',Georgia,'Times New Roman',serif;text-transform:uppercase;letter-spacing:0.02em;line-height:1.1;color:${COLORS.paper};font-size:20px;margin:0 0 12px;`,
  p: `font-family:Georgia,'Times New Roman',serif;color:${COLORS.paper};font-size:16px;line-height:1.6;margin:0 0 16px;`,
  a: `color:${COLORS.sage};text-decoration:underline;`,
  ul: `font-family:Georgia,'Times New Roman',serif;color:${COLORS.paper};font-size:16px;line-height:1.6;margin:0 0 16px;padding-left:22px;`,
  ol: `font-family:Georgia,'Times New Roman',serif;color:${COLORS.paper};font-size:16px;line-height:1.6;margin:0 0 16px;padding-left:22px;`,
  li: `margin:0 0 6px;`,
  blockquote: `margin:0 0 16px;padding:4px 0 4px 16px;border-left:3px solid ${COLORS.moss};color:${COLORS.sage};font-style:italic;`,
  strong: `color:#ffffff;`,
  table: `border-collapse:collapse;width:100%;margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;`,
  th: `border:1px solid rgba(162,175,158,0.4);padding:8px 10px;text-align:left;color:${COLORS.paper};background:rgba(162,175,158,0.12);`,
  td: `border:1px solid rgba(162,175,158,0.4);padding:8px 10px;color:${COLORS.paper};`,
  hr: `border:none;border-top:1px solid rgba(162,175,158,0.2);margin:24px 0;`,
  img: `max-width:100%;height:auto;`,
};

/** Injects inline styles into rendered HTML so it survives clients that drop <style>. */
function inlineEmailStyles(html: string): string {
  let out = html;
  for (const [tag, style] of Object.entries(TAG_STYLES)) {
    const re = new RegExp(`<${tag}((?:\\s[^>]*)?)>`, "g");
    out = out.replace(re, (_m, attrs: string) =>
      /\sstyle="/.test(attrs)
        ? `<${tag}${attrs.replace(/style="([^"]*)"/, (_s, v) => `style="${style}${v}"`)}>`
        : `<${tag}${attrs} style="${style}">`,
    );
  }
  return out;
}

/** Wraps email body HTML in Cavern's branded layout, with an unsubscribe footer. */
export function renderEmailHtml({
  preheader,
  bodyHtml,
  unsubscribeUrl,
  cta,
}: {
  preheader?: string;
  bodyHtml: string;
  unsubscribeUrl: string;
  cta?: { label: string; href: string };
}): string {
  const origin = getSiteUrl();
  // Renju (the site's display face) loaded by URL. Clients that support
  // @font-face in email (Apple Mail, iOS, some Outlook) render it; Gmail and
  // others strip it and fall back to the serif stack below.
  const fontUrl = `${origin}/fonts/Renju.otf`;
  // PNG (not SVG) — most email clients, including Gmail, won't render SVG.
  const logoUrl = `${origin}/cavern-logcon.png`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      @font-face {
        font-family: 'Renju';
        src: url('${fontUrl}') format('opentype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      body { margin:0; padding:0; background:${COLORS.canvasDeep}; }
      .cavern-body, .cavern-body p, .cavern-body li, .cavern-body td {
        font-family: Georgia, 'Times New Roman', serif;
        color: ${COLORS.paper};
        font-size: 16px;
        line-height: 1.6;
      }
      .cavern-body h1, .cavern-body h2, .cavern-body h3, .cavern-eyebrow {
        font-family: 'Renju', Georgia, 'Times New Roman', serif;
        text-transform: uppercase;
        letter-spacing: 0.02em;
        line-height: 1.05;
        color: ${COLORS.paper};
        margin: 0 0 16px;
      }
      .cavern-body h1 { font-size: 34px; }
      .cavern-body h2 { font-size: 26px; }
      .cavern-body h3 { font-size: 20px; }
      .cavern-body p { margin: 0 0 1em; }
      .cavern-body a { color: ${COLORS.sage}; }
      .cavern-body ul, .cavern-body ol { margin: 0 0 1em; padding-left: 1.2em; }
      .cavern-body blockquote {
        margin: 0 0 1em; padding-left: 16px;
        border-left: 3px solid ${COLORS.moss}; color: ${COLORS.sage};
      }
      .cavern-body img { max-width: 100%; height: auto; }
    </style>
  </head>
  <body style="margin:0;padding:0;background:${COLORS.canvasDeep};">
    ${preheader ? `<span style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</span>` : ""}
    <div class="cavern-body" style="max-width:560px;margin:0 auto;padding:40px 24px;">
      <img src="${logoUrl}" alt="Cavern Studios" width="58" height="64" style="display:block;width:58px;height:64px;margin:0 0 16px;border:0;outline:none;text-decoration:none;" />
      <p class="cavern-eyebrow" style="margin:0 0 24px;font-family:'Renju',Georgia,serif;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:${COLORS.sage};">Cavern Studios</p>
      <div>
        ${inlineEmailStyles(bodyHtml)}
      </div>
      ${cta ? grungeButton(cta.label, cta.href) : ""}
      <hr style="border:none;border-top:1px solid rgba(162,175,158,0.2);margin:32px 0;" />
      <p style="margin:0;font-family:Georgia,serif;font-size:12px;color:${COLORS.sage};">
        You're receiving this because you subscribed to the Cavern newsletter.
        <a href="${unsubscribeUrl}" style="color:${COLORS.sage};text-decoration:underline;">Unsubscribe</a>
      </p>
    </div>
  </body>
</html>`;
}
