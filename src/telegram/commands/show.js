const Markup = require('telegraf/markup');

const { local, database, dataHandler } = require('../../constants');

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
	bot.action('getYearStatistic', (ctx) => ctx.reply('🎉 getYearStatistic! 🎉'));
	bot.action('getMonthStatistic', (ctx) => ctx.reply('🎉 getMonthStatistic! 🎉'));
	bot.action('getWeekStatistic', (ctx) => ctx.reply('🎉 getWeekStatistic! 🎉'));
	bot.action('getDayStatistic', (ctx) => ctx.reply('🎉 getDayStatistic! 🎉'));
};
