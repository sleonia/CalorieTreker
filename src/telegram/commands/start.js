module.exports = function start(bot, local) {
	bot.hears('/start', (ctx) => {
		let message = local['start.message'].caption;
		message += '\n' + local['start.message'].description;
		ctx.reply(message);
	});
};
