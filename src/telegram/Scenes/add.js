const Scene = require('telegraf/scenes/base');
const { local, database, dataHandler } = require('../../constants');
const ui = require('../../Utils/UserInteraction');
const getMonthsName = require('../../Utils/GetMonthsName');

module.exports = () => {
	const scene = new Scene('add');
	scene.enter((ctx) => ctx.reply(local['commands.description']['add']));
	scene.on('text', async (ctx) => {
		let userData = await database.getAllUserDataById(ctx.message.from.id);

		const oldUserDayData = dataHandler.getDayValueFromJson(
			dataHandler.getDate().getFullYear(),
			getMonthsName(dataHandler.getDate().getMonth()),
			dataHandler.getDate().getDate(),
			userData.data.years,
		);

		dataHandler.setDayValueToJson(
			dataHandler.getDate().getFullYear(),
			getMonthsName(dataHandler.getDate().getMonth()),
			dataHandler.getDate().getDate(),
			userData.data.years,
			`${oldUserDayData}\n${ctx.message.text}\n`
		);

		database.updateData(userData.data, userData.user_id);

		let message = local['user.interaction']['bon.appetite'];
		message += ' ' + await ui.makePoliteComment();
		await ctx.reply(message);
		await ctx.scene.leave();
	});
	return scene;
};
