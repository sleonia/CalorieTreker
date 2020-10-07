const parser = require('../../Utils/ParseInput');
const getMonthsName = require('../../Utils/GetMonthsName');

module.exports = async (database, dataHandler, bot, local) => {
	bot.hears('/today', async (ctx) => {
		const userData = await database.getAllUserDataById(ctx.message.from.id);

		if (userData !== undefined) {
			database.updateDate(dataHandler.getFullDate() , ctx.message.from.id);

			const dailyStatisticsArray = parser(
				dataHandler.getDayValueFromJson(
					dataHandler.getDate().getFullYear(),
					getMonthsName(dataHandler.getDate().getMonth()),
					dataHandler.getDate().getDate(),
					userData.data.years
				)
			);

			let sum = 0;
			for (const i in dailyStatisticsArray) {
				sum += Number(dailyStatisticsArray[i][1]) || 0;
			}
			ctx.reply(
				local['user.interaction']['today.calories']['start']
				+ ': ' + sum
				+ ' ' + local['user.interaction']['today.calories']['end']
				+ '.\n' + local['user.interaction']['today.calories']['description']
			);
		} else {
			ctx.reply(local['user.interaction']['untracked.user']);
		}
	});
};
