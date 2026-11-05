# Whistleblower Reports → Auditor Email (Resend)

## Goal

Every report submitted through the "Blow the whistle" dialog is emailed to the
external auditors at **reports@baileycgroup.com**, in addition to being stored
in the database and shown in `/admin/whistleblower`.

## Current flow (before this change)

1. `components/whistleblower/whistleblower-dialog.tsx` collects the form.
2. It calls the server action `submitWhistleblowerReport` in
   `lib/actions/whistleblower.ts`.
3. The action validates input, generates a reference number (`WB-YYYY####`),
   inserts a row into `whistleblower_reports`, and returns the reference.

Nobody outside the admin panel is notified.

## Approach (simplest, effective)

- **Provider:** Resend, with the verified sending domain `kenyacic.org`.
- **Transport:** Resend REST API (`POST https://api.resend.com/emails`) via
  `fetch` from the server action. No new npm dependency.
- **When:** right after the DB insert succeeds. The database stays the source of
  truth: if the email fails, the report is still saved, the reporter still gets
  their reference number, and the failure is logged on the server.
- **Idempotency:** the reference number is sent as Resend's
  `Idempotency-Key`, so a retry never produces a duplicate email.
- **Reply-to:** if the reporter chose to share an email (non-anonymous), it is
  set as `reply_to` so auditors can reply directly. Anonymous reports carry no
  reporter contact details.
- **Safety:** all user-supplied text is HTML-escaped in the email body; a
  plain-text version is sent alongside the HTML.

## Configuration (environment variables)

| Variable | Example | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_...` | Resend API key (server only, never `NEXT_PUBLIC_`) |
| `RESEND_FROM_EMAIL` | `whistleblowing@kenyacic.org` | Sender; must be on the verified domain |
| `WHISTLEBLOWER_REPORT_EMAIL` | `reports@baileycgroup.com` | Recipient(s); comma-separate for more than one. Defaults to `reports@baileycgroup.com` if unset |

These must be set in `.env.local` for development **and** in the hosting
provider's environment settings (e.g. Vercel → Project → Settings →
Environment Variables) for production.

## Files

- `lib/email/resend.ts` — tiny `sendEmail()` wrapper around the Resend API.
- `lib/email/whistleblower-report-email.ts` — builds the subject, HTML and text
  body for a report and sends it to the auditor address.
- `lib/actions/whistleblower.ts` — calls the notifier after the insert.

## Email content

- **Subject:** `[Whistleblower] WB-20260012 · Fraud · <subject>`
- **Body:** reference number, submitted-at time (Africa/Nairobi), category,
  anonymous yes/no, contact email (if given), subject, description, incident
  date, department, involved parties, evidence/supporting info.

## Test checklist

1. Set the three env vars, restart `pnpm dev`.
2. Submit an anonymous report from the site footer's whistleblower dialog.
   - Reporter sees a reference number.
   - Email arrives at `reports@baileycgroup.com` with matching reference, no
     reply-to.
3. Submit a non-anonymous report with a contact email.
   - Email arrives; "Reply" goes to the reporter's address.
4. Temporarily break `RESEND_API_KEY`, submit again.
   - Reporter still sees success and a reference number.
   - Server log shows `[whistleblower-email]` error; row exists in admin.
5. Check delivery status in the Resend dashboard → Emails.
6. Ask the auditors to whitelist `whistleblowing@kenyacic.org` so reports
   don't land in spam.

## Out of scope / possible later work

- File attachments (the form currently has no uploads; evidence is text).
- Acknowledgement email to non-anonymous reporters.
- Retry queue for failed sends (today: logged; report stays in admin panel).
