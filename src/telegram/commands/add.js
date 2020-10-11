const { database } = require('../../constants');

module.exports = async (bot, local) => {
	bot.hears('/add', async (ctx) => {
		const userData = await database.getAllUserDataById(ctx.message.from.id);

		// console.log(JSON.stringify(userData.data, null, '\t'));

		if (userData === undefined) {
			await ctx.reply(local['user.interaction']['untracked.user']);
		} else {
			ctx.scene.enter('add');
		}
	});
};
