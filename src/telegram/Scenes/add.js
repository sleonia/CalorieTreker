const Scene = require('telegraf/scenes/base');
const { local, database, dataHandler } = require('../../constants');
const ui = require('../../utils/UserInteraction');
const getMonthsName = require('../../utils/GetMonthsName');

function getIndexByYear(year = 2020, json = {}) {
	for (const i in json.years) {
		if (json.years[i].year === year) {
			return i;
		}
	}
}

function getIndexByMonth(year = 2020, month = 'may', json = {}) {
	for (const i in json.years) {
		if (json.years[i].year === year) {
			for (const k in json.years[i].months) {
				if (Object.keys(json.years[i].months[k])[0] === month) {
					return k;
				}
			}
		}
	}
}

function getIndexByDay(yearIndex = 0, monthIndex = 0, day = 0, json = {}) {
		const month = Object.keys(json.years[yearIndex].months[monthIndex])[0];
		for (const i in json.years[yearIndex].months[monthIndex][month]) {
			if (Object.keys(json.years[yearIndex].months[monthIndex][month][i])[0] === day.toString()) {
				return i;
			}
		}
}

function addMissingData(json = {}) {
	const currentYear = dataHandler.getDate().getFullYear();
	const currentMonth = getMonthsName(dataHandler.getDate().getMonth());
	const currentDay = dataHandler.getDate().getDate();

	let yearIndex = getIndexByYear(currentYear, json);
	if (yearIndex === undefined) {
		yearIndex = dataHandler.addNewYear(currentYear, json);
	}

	let monthIndex = getIndexByMonth(currentYear, currentMonth, json);
	if (monthIndex === undefined) {
		monthIndex = dataHandler.addNewMonth(getIndexByYear(currentYear, json), currentMonth, json);
	}

	const dayIndex = getIndexByDay(yearIndex, monthIndex, currentDay, json);
	if (dayIndex === undefined) {
		dataHandler.addNewDay(yearIndex, monthIndex, currentDay, json);
	}
}

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
		) || '';

		addMissingData(userData.data);

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
