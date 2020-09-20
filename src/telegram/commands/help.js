module.exports = function help(bot, local) {
	bot.hears('/help', (ctx) => {
		let message = '';
		local.commands.forEach((command) => {
			message += command + '\n';
		});
		ctx.reply(message);
	});
};
