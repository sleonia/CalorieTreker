const Markup = require('telegraf/markup');
const fs = require('fs');

const { local, database, dataHandler } = require('../../constants');
const { getStatistic } = require('../../Utils/GetStatistic');

function sendStatisticFile(ctx) {
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
	bot.action('getYearStatistic', (ctx) => sendStatisticFile(ctx));
	bot.action('getMonthStatistic', (ctx) => ctx.reply('🎉 getMonthStatistic! 🎉'));
	bot.action('getWeekStatistic', (ctx) => ctx.reply('🎉 getWeekStatistic! 🎉'));
	bot.action('getDayStatistic', (ctx) => ctx.reply('🎉 getDayStatistic! 🎉'));
};
