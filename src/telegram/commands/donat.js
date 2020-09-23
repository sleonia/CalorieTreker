module.exports = async (bot, local) => {
	bot.hears('/donat', (ctx) => {
		const message = local['commands.description'].donat;
		ctx.reply(message);
	});
};
