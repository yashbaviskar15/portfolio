import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory rate limiting map for edge environments
const ipRequestHistory = new Map<string, number[]>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { name, email, subject, message, _gotcha } = req.body || {};

    // 1. Honeypot check (silent discard for bots)
    if (_gotcha) {
      console.warn('[Spam Caught] Honeypot triggered.');
      return res.status(200).json({ success: true, message: 'Message received.' });
    }

    // 2. Field validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ error: 'Message must be at least 5 characters.' });
    }

    // 3. IP Rate Limiting (max 3 requests per 60 seconds per IP)
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const timestamps = ipRequestHistory.get(clientIp) || [];
    const recent = timestamps.filter((t) => now - t < 60000);

    if (recent.length >= 3) {
      return res.status(429).json({ error: 'Too many requests. Please wait a minute before sending another message.' });
    }

    recent.push(now);
    ipRequestHistory.set(clientIp, recent);

    // 4. Forwarding to Resend if API key configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'yashbaviskar0215@outlook.com';

    if (resendApiKey) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: email.trim(),
          subject: subject ? `[Portfolio] ${subject}` : `[Portfolio Contact] New message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('[Resend Error]', errText);
      }
    }

    // 5. Forwarding to Formspree if endpoint configured
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    if (formspreeEndpoint) {
      await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      }).catch((err) => console.error('[Formspree Error]', err));
    }

    return res.status(200).json({
      success: true,
      message: `Thank you ${name.trim()}, your message has been dispatched successfully.`,
    });
  } catch (error: any) {
    console.error('[Contact API Error]', error);
    return res.status(500).json({ error: 'Internal server error processing contact message.' });
  }
}
