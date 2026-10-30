# Security note

## Telegram bot credentials

`api/contact.js` reads credentials from environment variables:

| Variable | Purpose |
| --- | --- |
| `TELEGRAM_TOKEN` | Bot token from @BotFather |
| `TELEGRAM_CHAT_ID` | Chat that receives form leads |

Set both in Vercel under **Project → Settings → Environment Variables**, then redeploy.

**A bot token was previously committed to this repository in plain text.** Because the
repository is public, that token must be treated as compromised:

1. Message [@BotFather](https://t.me/BotFather), send `/revoke`, and select the bot to
   issue a new token.
2. Put the new token in Vercel as `TELEGRAM_TOKEN`.
3. Optionally purge the old value from git history (`git filter-repo`) so old commits
   stop exposing it.

Never commit tokens, keys, or passwords. Use environment variables.
