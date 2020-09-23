module.exports = async (bot, local) => {
	bot.hears('/add', async (ctx) => {
		ctx.scene.enter('name');
	});
};
