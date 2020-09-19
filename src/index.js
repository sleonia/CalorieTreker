const fs = require('fs');

fs.readFile('.env', 'utf8', function (err, token) {
    if (err) {
        return console.log(err);
    }
    const { Telegraf } = require('telegraf');
    const bot = new Telegraf(token);
    bot.start((ctx) => {
        console.log(ctx.message.from);
        ctx.reply('Welcome');
    })
    bot.help((ctx) => ctx.reply('Send me a sticker'));
    bot.launch();
});