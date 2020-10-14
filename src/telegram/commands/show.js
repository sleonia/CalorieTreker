const Markup = require('telegraf/markup');
const fs = require('fs');

const { local } = require('../../constants');
const saveFile = require('../../utils/SaveFile');
const {
	getCurrentYear,
	getCurrentMonth,
	getCurrentWeek,
	getCurrentDay
} = require('../../utils/GetStatistic');

async function sendStatisticFile(ctx, getData) {
		await saveFile(
			await getData(ctx.from.id)
		);
		ctx.telegram.sendDocument(ctx.from.id, {
			source: fs.createReadStream('statistic.json'),
			filename: 'statistic.json'
		}).catch((error) => console.log(error));		
}

module.exports = async (bot) => {
	bot.hears('/show', async (ctx) => {
	const inlineMessageRatingKeyboard = Markup.inlineKeyboard([
		Markup.callbackButton(local['show.buttons']['year'], 'getYearStatistic'),
		Markup.callbackButton(local['show.buttons']['month'], 'getMonthStatistic'),
		Markup.callbackButton(local['show.buttons']['week'], 'getWeekStatistic'),
		Markup.callbackButton(local['show.buttons']['day'], 'getDayStatistic'),
	]).extra();
			ctx.reply(local['commands.description']['show'], inlineMessageRatingKeyboard);
	});
	bot.action('getYearStatistic', (ctx) => sendStatisticFile(ctx, getCurrentYear));
	bot.action('getMonthStatistic', (ctx) => sendStatisticFile(ctx, getCurrentMonth));
	bot.action('getWeekStatistic', (ctx) => sendStatisticFile(ctx, getCurrentWeek));
	bot.action('getDayStatistic', (ctx) => sendStatisticFile(ctx, getCurrentDay));
};
