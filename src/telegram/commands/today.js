const parser = require('../../Utils/ParseInput');

module.exports = async (db, dataHandler, bot, local) => {
	bot.hears('/today', async (ctx) => {
		const dailyStatisticsFromDb = 'Салат 100\nМолоко 200\nПеченье 345\n';
		const dailyStatisticsArray = parser(dailyStatisticsFromDb);
		let sum = 0;
		for (const i in dailyStatisticsArray) {
			sum += Number(dailyStatisticsArray[i][1]);
		}
		ctx.reply(sum);
	});
};
