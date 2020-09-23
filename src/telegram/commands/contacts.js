module.exports = async (bot, local) => {
	bot.hears('/contacts', (ctx) => {
		const message = local['commands.description'].contacts;
		ctx.reply(message);
	});
};
