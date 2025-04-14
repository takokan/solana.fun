import { Hono } from 'hono'

const app = new Hono()

const BOT_TOKEN = "7877026107:AAFixdFlw39MARmGbQkWnaGM93O7WT7ZQ-8";

app.post('/webhook', async (c) => {
  const body = await c.req.json();
  const message = body.message;

  if(!message || !message.text) {
    return c.text("No message");
  }

  const chatId = message.chat.id;
  const text = message.text;

  let reply = "Unknown command"
  
  if(text === '/start') {
    reply = "Hey, I am Solana.fun for trading awesome tokens at ease. use /connect to link you wallet";
  }

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: reply,
    }),
  })

  if (text === '/connect') {
    reply = "Click the button below to connect your wallet";
  
    const connectUrl = `https://your-wallet-connect-ui.com/connect?chat_id=${chatId}`; // You can append chat ID for tracking
  
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔗 Connect Wallet",
                url: connectUrl,
              },
            ],
          ],
        },
      }),
    });
  
    return c.text("ok");
  }

  return c.text('ok')
})

export default app
