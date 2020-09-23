module.exports = async (bot) => {
	bot.hears('/add', async (ctx) => {
		ctx.scene.enter('add');
	});
};
