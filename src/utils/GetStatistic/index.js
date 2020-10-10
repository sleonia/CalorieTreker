const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const { database, dataHandler } = require('../../constants');
const getMonthsName = require('../GetMonthsName');

const getCurrentYear = async (id) => {
	const userdata = await database.getAllUserDataById(id);
	for (const i in userdata.data.years) {
		if (userdata.data.years[i].year === dataHandler.getDate().getFullYear()) {
			return userdata.data.years[i];
		}
	}
};

const getCurrentMonth = async (id) => {
	const userdata = await database.getAllUserDataById(id);
	const currentMonth = getMonthsName(dataHandler.getDate().getMonth());

	for (const i in userdata.data.years) {
		for (const k in userdata.data.years[i].months) {
			if (Object.keys(userdata.data.years[i].months[k])[0] === currentMonth) {
				return userdata.data.years[i].months[k];
			}
		}
	}
};

const getCurrentWeek = async (id) => {
	const userdata = await database.getAllUserDataById(id);
	const currentMonth = getMonthsName(dataHandler.getDate().getMonth());

	for (const i in userdata.data.years) {
		for (const k in userdata.data.years[i].months) {
			const key = Object.keys(userdata.data.years[i].months[k]);
			if (key[0] === currentMonth) {
				return userdata.data.years[i].months[k][key].slice(-7);
			}
		}
	}
};

const getCurrentDay = async (id) => {
	const userdata = await database.getAllUserDataById(id);
	return dataHandler.getDayValueFromJson(
		dataHandler.getDate().getFullYear(),
		getMonthsName(dataHandler.getDate().getMonth()),
		dataHandler.getDate().getDate(),
		userdata.data.years
	);
};

module.exports = { getCurrentYear, getCurrentMonth, getCurrentWeek, getCurrentDay };