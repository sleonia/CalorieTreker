const { database } = require('../../constants');

module.exports = async (bot, local) => {
	bot.hears('/add', async (ctx) => {
		const userData = await database.getAllUserDataById(ctx.message.from.id);
	
		if (userData === undefined) {
			await ctx.reply(local['user.interaction']['untracked.user']);
			await ctx.scene.leave();
		} else {
			ctx.scene.enter('add');
		}
	});
};
