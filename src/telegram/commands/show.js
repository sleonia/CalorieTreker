const Markup = require('telegraf/markup');

module.exports = async function show(bot, local) {
	bot.hears('/show', (ctx) => {
		ctx.reply(
			local['commands.description'].show,
			Markup.inlineKeyboard([
				Markup.callbackButton(local['commands.description']['show.button.day'], '1'),
				Markup.callbackButton(local['commands.description']['show.button.week'], '2'),
				Markup.callbackButton(local['commands.description']['show.button.month'], '3'),
				Markup.callbackButton(local['commands.description']['show.button.year'], '4'),//change second param
			]).extra()
		);
	});
};
