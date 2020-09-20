module.exports.start = function start(bot, local) {
	bot.hears('/start', (ctx) => {
		let message = local['start.message'].caption;
		message += '\n' + local['start.message'].description;
		ctx.reply(message);
	});
};

module.exports.help = function help(bot, local) {
	bot.hears('/help', (ctx) => {
		ctx.reply('');
	});
};