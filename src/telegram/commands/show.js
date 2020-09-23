const Markup = require('telegraf/markup');

module.exports = async (bot, local) => {
	bot.hears('/show', (ctx) => {
		ctx.reply(
			local['commands.description'].show,
			Markup.inlineKeyboard([
				Markup.callbackButton(local['commands.description']['show.button.today'], '1'),
				Markup.callbackButton(local['commands.description']['show.button.yesterday'], '2'),
				Markup.callbackButton(local['commands.description']['show.button.week'], '3'),
				Markup.callbackButton(local['commands.description']['show.button.month'], '4'),
				Markup.callbackButton(local['commands.description']['show.button.year'], '5'),//change second param
			]).extra()
		);
	});
};
