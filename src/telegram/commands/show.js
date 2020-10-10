const Markup = require('telegraf/markup');
const fs = require('fs');

const { local, database, dataHandler } = require('../../constants');
const saveFile = require('../../Utils/SaveFile');
const {
	getCurrentYear,
	getCurrentMonth,
	getCurrentWeek,
	getCurrentDay
} = require('../../Utils/GetStatistic/');

async function sendStatisticFile(ctx, getData) {
		saveFile(
			await getData(ctx.from.id)
		);
		ctx.telegram.sendDocument(ctx.from.id, {
			source: fs.createReadStream('statistic.json'),
			filename: 'statistic.json'
		}).catch(function(error){ console.log(error); });		
}

module.exports = async (bot) => {
	bot.hears('/show', async (ctx) => {
	const inlineMessageRatingKeyboard = Markup.inlineKeyboard([
		Markup.callbackButton('year', 'getYearStatistic'),
		Markup.callbackButton('month', 'getMonthStatistic'),
		Markup.callbackButton('week', 'getWeekStatistic'),
		Markup.callbackButton('day', 'getDayStatistic'),
	]).extra();
			ctx.reply(local['commands.description']['show'], inlineMessageRatingKeyboard);
	});
	bot.action('getYearStatistic', (ctx) => sendStatisticFile(ctx, getCurrentYear));
	bot.action('getMonthStatistic', (ctx) => sendStatisticFile(ctx, getCurrentMonth));
	bot.action('getWeekStatistic', (ctx) => sendStatisticFile(ctx, getCurrentWeek));
	bot.action('getDayStatistic', (ctx) => sendStatisticFile(ctx, getCurrentDay));
};
