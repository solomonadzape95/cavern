import "server-only";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Converts blank-line-separated plain text into escaped HTML paragraphs. */
export function textToHtmlParagraphs(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="margin:0 0 1em;">${escapeHtml(p).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

/** Wraps email body HTML in Cavern's branded layout, with an unsubscribe footer. */
export function renderEmailHtml({
  preheader,
  bodyHtml,
  unsubscribeUrl,
}: {
  preheader?: string;
  bodyHtml: string;
  unsubscribeUrl: string;
}): string {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#2f382d;font-family:Georgia,'Times New Roman',serif;">
    ${preheader ? `<span style="display:none;">${escapeHtml(preheader)}</span>` : ""}
    <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
      <p style="margin:0 0 24px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#a2af9e;">Cavern Studios</p>
      <div style="color:#e9e9dd;font-size:16px;line-height:1.6;">
        ${bodyHtml}
      </div>
      <hr style="border:none;border-top:1px solid rgba(162,175,158,0.2);margin:32px 0;" />
      <p style="margin:0;font-size:12px;color:#a2af9e;">
        You're receiving this because you subscribed to the Cavern newsletter.
        <a href="${unsubscribeUrl}" style="color:#a2af9e;text-decoration:underline;">Unsubscribe</a>
      </p>
    </div>
  </body>
</html>`;
}
