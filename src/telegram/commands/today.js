const parser = require('../../Utils/ParseInput');

module.exports = async (db, dataHandler, bot, local) => {
	bot.hears('/today', async (ctx) => {
		const userData = await db.getAllUserDataById(ctx.message.from.id);

		if (userData !== undefined) {
			db.updateDate(dataHandler.getFullDate() , ctx.message.from.id);

			const dailyStatisticsArray = parser(dataHandler.getDayValueFromJson(userData.data.years));
			let sum = 0;
			for (const i in dailyStatisticsArray) {
				sum += Number(dailyStatisticsArray[i][1]);
			}
			ctx.reply(sum);
		}
	});
};
