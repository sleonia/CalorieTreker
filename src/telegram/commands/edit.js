module.exports = async (bot, local) => {
	bot.hears('/edit', async (ctx) => {
		ctx.reply(local['user.interaction']['edit.command']);
		ctx.scene.enter('edit');
	});
};
