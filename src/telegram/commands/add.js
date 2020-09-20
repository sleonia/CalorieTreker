module.exports = function add(bot, local) {
	bot.hears('/add', (ctx) => {
		const message = local['commands.description'].add;
		ctx.reply(message);
	});
	// ctx.message
	bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === '1') {
    text = 'You hit button 1';
  }

  bot.editMessageText(text, opts);
});
};
