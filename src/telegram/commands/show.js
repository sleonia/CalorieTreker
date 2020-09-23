module.exports = async (bot) => {
	bot.hears('/show', async (ctx) => {
		ctx.scene.enter('show');
	});
};
