const Scene = require('telegraf/scenes/base');
const { local, database, dataHandler } = require('../../constants');
const ui = require('../../Utils/UserInteraction');
const getMonthsName = require('../../Utils/GetMonthsName');

module.exports = () => {
	const add = new Scene('add');
	add.enter((ctx) => ctx.reply(local['commands.description']['add']));
	add.on('text', async (ctx) => {
		let userData = await database.getAllUserDataById(ctx.message.from.id);

		dataHandler.setDayValueToJson(
			dataHandler.getDate().getFullYear(),
			getMonthsName(dataHandler.getDate().getMonth()),
			dataHandler.getDate().getDate(),
			userData.data.years,
			ctx.message.text
		);

		database.updateData(userData.data, userData.user_id);

		let message = local['user.interaction']['bon.appetite'];
		message += ' ' + await ui.makePoliteComment();
		await ctx.reply(message);
		await ctx.scene.leave();
	});
	return add;
};
