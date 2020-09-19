const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

fs.readFile('.env', 'utf8', function (err, token) {
  if (err) {
    return console.log(err);
  }
  const bot = new TelegramBot(token, {polling: true});

  bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message');
  });
});