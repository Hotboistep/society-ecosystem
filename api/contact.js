export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Credentials come from Vercel environment variables — never hardcode them.
  // Set TELEGRAM_TOKEN and TELEGRAM_CHAT_ID in Project → Settings → Environment Variables.
  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_TOKEN || !CHAT_ID) {
    console.error('Missing TELEGRAM_TOKEN or TELEGRAM_CHAT_ID environment variable.');
    return res.status(500).json({ success: false, error: 'Server is not configured' });
  }

  const text = [
    '🚀 NEW WEBSITE LEAD!',
    '',
    `👤 Name: ${name}`,
    `📧 Email: ${email}`,
    service ? `🛠️ Service: ${service}` : null,
    '',
    '💬 Message:',
    message,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
      }),
    });

    if (!response.ok) {
      throw new Error('Telegram API error');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
