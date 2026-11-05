// Server-side only: reads RESEND_API_KEY. Import only from server code.
const RESEND_ENDPOINT = "https://api.resend.com/emails";

export interface SendEmailInput {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  /** Prevents duplicate sends if the same request is retried. */
  idempotencyKey?: string;
}

export type SendEmailResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/** Minimal Resend client using the REST API (no SDK dependency). */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !from) {
    return { ok: false, error: "RESEND_API_KEY or RESEND_FROM_EMAIL is not set" };
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  if (input.idempotencyKey) headers["Idempotency-Key"] = input.idempotencyKey;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({
        from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    const body = (await res.json().catch(() => null)) as
      | { id?: string; message?: string; name?: string }
      | null;

    if (!res.ok || !body?.id) {
      return {
        ok: false,
        error: `Resend ${res.status}: ${body?.message ?? body?.name ?? "unknown error"}`,
      };
    }
    return { ok: true, id: body.id };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
