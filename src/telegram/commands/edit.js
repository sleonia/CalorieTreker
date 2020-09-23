module.exports = async (bot) => {
	bot.hears('/edit', async (ctx) => {
		ctx.scene.enter('edit');
	});
};
