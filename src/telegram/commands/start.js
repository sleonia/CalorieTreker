module.exports = async (database, dataHandler, bot, local) => {
	bot.hears('/start', async (ctx) => {
		let message = local['start.message'].caption;
		message += '\n' + local['start.message'].description;

		const res = await database.getAllUserDataById(ctx.message.from.id);
		if (res === undefined) {
			let newUser = dataHandler.getNewUser(ctx.message.from);
			JSON.stringify(newUser.data);
			database.addNewUser(newUser);
		}
		ctx.reply(message);
	});
};
