module.exports = async (bot, local) => {
	bot.hears('/start', (ctx) => {
		console.log(ctx.message);
		let message = local['start.message'].caption;
		message += '\n' + local['start.message'].description;
		ctx.reply(message);
	});
};
