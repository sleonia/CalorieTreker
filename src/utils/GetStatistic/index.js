const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const { database, dataHandler } = require('../../constants');

const getYear = async (id) => {
	const yearStatistic = await database.getAllUserDataById(id);
	for (const i in yearStatistic.data.years) {
		if (yearStatistic.data.years[i].year === dataHandler.getDate().getFullYear()) {
			return JSON.stringify(yearStatistic.data.years[i], null, '\t');
		}
	}
};


// const getMonth = async (id) => {
	// const yearStatistic = await database.getAllUserDataById(id);
	// console.log(yearStatistic.data.years);
	// for (const i in yearStatistic.data.years) {
		// if (yearStatistic.data.years[i].year === dataHandler.getDate().getFullYear()) {
			// return JSON.stringify(yearStatistic.data.years[i], null, '\t');
		// }
	// }
// };

// const getDay = async (id) => {
	// const data = database.getAllUserDataById(id);
// }