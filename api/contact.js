export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const TELEGRAM_TOKEN = '7985667131:AAHMvRxJd5Doa-zoVJJn4JqPWPFTpNthgHQ';
  const CHAT_ID = '1185379811';

  const text = `🚀 NEW WEBSITE LEAD!\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message:\n${message}`;

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
