import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
// Read-only for visitors: this route never persists app state. It only forwards a
// validated contact message. It intentionally holds NO module-level mutable state
// (no shared rate-limit Map / cache) so nothing is shared across requests or users.

const MAX_FIELD = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  _gotcha?: unknown;
};

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return bad('Invalid JSON payload.');
  }

  const { name, email, subject, message, _gotcha } = body;

  // 1. Honeypot — silently accept so bots do not learn they were blocked.
  if (typeof _gotcha === 'string' && _gotcha.trim().length > 0) {
    return NextResponse.json({ success: true, message: 'Message received.' });
  }

  // 2. Strict validation.
  if (typeof name !== 'string' || name.trim().length === 0 || name.length > MAX_FIELD) {
    return bad('Name is required.');
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return bad('A valid email address is required.');
  }
  if (typeof message !== 'string' || message.trim().length < 5 || message.length > MAX_FIELD) {
    return bad('Message must be at least 5 characters.');
  }
  if (subject !== undefined && (typeof subject !== 'string' || subject.length > MAX_FIELD)) {
    return bad('Invalid subject.');
  }

  // 3. Lightweight spam heuristic (stateless — no cross-request shared memory).
  const linkCount = (message.match(/https?:\/\//g) || []).length;
  if (linkCount > 4) {
    return NextResponse.json({ success: true, message: 'Message received.' });
  }

  const recipient = process.env.CONTACT_EMAIL || process.env.RESEND_TO_EMAIL || 'yashbaviskar0215@outlook.com';
  const resendApiKey = process.env.RESEND_API_KEY;

  try {
    if (resendApiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
          to: [recipient],
          reply_to: email.trim(),
          subject: subject ? `[Portfolio] ${subject}` : `[Portfolio Contact] New message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      });
      if (!res.ok) {
        console.error('[Resend Error]', await res.text());
      }
    }

    const formspree = process.env.FORMSPREE_ENDPOINT;
    if (formspree) {
      await fetch(formspree, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      }).catch((err) => console.error('[Formspree Error]', err));
    }

    return NextResponse.json({
      success: true,
      message: `Thank you ${String(name).trim()}, your message has been dispatched successfully.`,
    });
  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json({ error: 'Internal server error processing contact message.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 });
}
