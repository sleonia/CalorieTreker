const Scene = require('telegraf/scenes/base');
const { local, database, dataHandler } = require('../../constants');
const getMonthsName = require('../../Utils/GetMonthsName');

module.exports = () => {
	const scene = new Scene('edit');

	const getOldDayValue = async (id) => {
		let userData = await database.getAllUserDataById(id);

		return dataHandler.getDayValueFromJson(
			dataHandler.getDate().getFullYear(),
			getMonthsName(dataHandler.getDate().getMonth()),
			dataHandler.getDate().getDate(),
			userData.data.years,
		);
	};

	scene.enter(async (ctx) => ctx.reply(await getOldDayValue(ctx.message.from.id)));
	scene.on('text', async (ctx) => {
		let userData = await database.getAllUserDataById(ctx.message.from.id);

		dataHandler.setDayValueToJson(
			dataHandler.getDate().getFullYear(),
			getMonthsName(dataHandler.getDate().getMonth()),
			dataHandler.getDate().getDate(),
			userData.data.years,
			ctx.message.text
		);

		database.updateData(userData.data, userData.user_id);

		await ctx.reply(local['user.interaction']['edit.success']);
		await ctx.scene.leave();
	});
	return scene;
};
