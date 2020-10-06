const fs = require('fs');
const { Telegraf } = require('telegraf');

const local = JSON.parse(fs.readFileSync('locales/ru.json'));
const bot = new Telegraf(fs.readFileSync('src/telegram/.env.token'));

const getMonthsName = (index = 0) => {
	const monthsNames = [
		'january', 'february', 'march',
		'april', 'may', 'june',
		'july', 'august', 'september',
		'october', 'november', 'december'
	];
	index = (index > monthsNames.length - 1) ? index % monthsNames.length : index;
	return monthsNames[index];
};

const defaultJsonData = (year = 2020, month = 'may', day = 1, value = '') => {
	let defaultData = {
		'years': [
			{
				'year': year,
				'months': []
			}
		]
	};
	defaultData.years[0].months[0] = {};
	defaultData.years[0].months[0][month] = [];
	defaultData.years[0].months[0][month][0] = {};
	defaultData.years[0].months[0][month][0][day] = value;
	return defaultData;
};

module.exports = { local, bot, getMonthsName, defaultJsonData };
