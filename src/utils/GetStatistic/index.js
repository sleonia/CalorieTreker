const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const { database, dataHandler } = require('../../constants');
const getMonthsName = require('../GetMonthsName');

const getCurrentYear = async (id) => {
	const userdata = await database.getAllUserDataById(id);
	for (const i in userdata.data.years) {
		if (userdata.data.years[i].year === dataHandler.getDate().getFullYear()) {
			return JSON.stringify(userdata.data.years[i], null, '\t');
		}
	}
};

const getCurrentMonth = async (id) => { //testing
	const userdata = database.getAllUserDataById(id);
	const currentMonth = getMonthsName(dataHandler.getDate().getMonth());

	for (const i in userdata.data.years) {
		for (const k in userdata.data.years[i].months) {
			if (userdata.data.years[i].months[k] === currentMonth) {
				return JSON.stringify(userdata.data.years[i].months[k], null, '\t');
			}
		}
	}
};

const getCurrentWeek = async (id) => {
	const userdata = await database.getAllUserDataById(id);
	const currentMonth = getMonthsName(dataHandler.getDate().getMonth());

	console.log(currentMonth);

	for (const i in userdata.data.years) {
		for (const k in userdata.data.years[i].months) {
			const key = Object.keys(userdata.data.years[i].months[k]);
			if (key[0] === currentMonth) {
				console.log(userdata.data.years[i].months[k][key]);
				return JSON.stringify(userdata.data.years[i].months[k][key].splice(-7), null, '\t');
			}
		}
	}
};

const getCurrentDay = async (id) => { //testing
	const userdata = database.getAllUserDataById(id);
	return dataHandler.getDayValueFromJson(
		dataHandler.getDate().getFullYear(),
		getMonthsName(dataHandler.getDate().getMonth()),
		dataHandler.getDate().getDate(),
		userdata.data.years
	);
};

// const run = async () => {
//   writeFileAsync(`statistic.json`, await getYear(361912587), async (err) => {
// 		if (err) throw err;
// 		console.log('The file has been saved!');
// 	});
// };

getCurrentWeek('361912587').then((data) => console.log(data));


module.exports = { getCurrentYear, getCurrentMonth, getCurrentWeek, getCurrentDay };