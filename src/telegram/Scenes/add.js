const Scene = require('telegraf/scenes/base');
const { local, database, dataHandler } = require('../../constants');
const ui = require('../../Utils/UserInteraction');
const getMonthsName = require('../../Utils/GetMonthsName');

const fs = require('fs');
const testJson = JSON.parse(fs.readFileSync('src/Utils/GetStatistic/spec.json'));////////delete

function getIndexByYear(year = 2020, json = {}) {
	for (const i in json.years) {
		if (json.years[i].year === year) {
			return i;
		}
	}
}

function getIndexByMonth(month = 'may', json = {}) {
	for (const i in json) {
		for (const k in json[i]) {
			if (Object.keys(json[i][k])[0] === month) {
				return k;
			}
		}
	}
}

function getIndexByDay(yearIndex, monthIndex, day, json) {
	for (const i in json.years[yearIndex].months[monthIndex]) {
		if (Object.keys(json.years[yearIndex].months[monthIndex][i])[0] === day)
			return i;
	}
}

function addMissingData(json) {
	const currentYear = dataHandler.getDate().getFullYear();
	const currentMonth = getMonthsName(dataHandler.getDate().getMonth());
	const currentDay = dataHandler.getDate().getDate();

	let yearIndex = getIndexByYear(currentYear, json);
	if (yearIndex === undefined) {
		yearIndex = dataHandler.addNewYear(currentYear, json);
	}

	let monthIndex = getIndexByMonth(currentMonth, json);
	if (monthIndex === undefined) {
		monthIndex = dataHandler.addNewMonth(getIndexByYear(currentYear, json), currentMonth, json);
	}

	const dayIndex = getIndexByDay(yearIndex, monthIndex, currentDay, json);
	if (dayIndex === undefined) {
		dataHandler.addNewDay(yearIndex, monthIndex, currentDay, json);
	}

	// console.log(JSON.stringify(json, null, '\t'));
}

// module.exports = () => {
// 	const scene = new Scene('add');
// 	console.log(1);
// 	scene.enter((ctx) => ctx.reply(local['commands.description']['add']));
// 	scene.on('text', async (ctx) => {
// 		let userData = await database.getAllUserDataById(ctx.message.from.id);

// 		console.log(userData.data);

// 		const oldUserDayData = dataHandler.getDayValueFromJson(
// 			dataHandler.getDate().getFullYear(),
// 			getMonthsName(dataHandler.getDate().getMonth()),
// 			dataHandler.getDate().getDate(),
// 			userData.data.years,
// 		);



// 	console.log(oldUserDayData);

// 		dataHandler.setDayValueToJson(
// 			dataHandler.getDate().getFullYear(),
// 			getMonthsName(dataHandler.getDate().getMonth()),
// 			dataHandler.getDate().getDate(),
// 			userData.data.years,
// 			`${oldUserDayData || ''}\n${ctx.message.text}\n`
// 		);

// 		database.updateData(userData.data, userData.user_id);

// 		let message = local['user.interaction']['bon.appetite'];
// 		message += ' ' + await ui.makePoliteComment();
// 		await ctx.reply(message);
// 		await ctx.scene.leave();
// 	});
// 	return scene;
// };
addMissingData(testJson);