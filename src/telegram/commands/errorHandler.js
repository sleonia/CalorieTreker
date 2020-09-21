module.exports = async function errorHandler(bot, local) {
	bot.on('text', (ctx) => {
		let message = local['user.interaction']['error.commands'];
		ctx.reply(message);
	});
};
