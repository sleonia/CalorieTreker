module.exports = async function add(bot, local) {
	bot.hears('/add', (ctx) => {
		const message = local['commands.description'].add;
		ctx.reply(message);
	});
};
