const fs = require('fs');

const testJson = JSON.parse(fs.readFileSync('src/Utils/GetStatistic/spec.json'));
const { dataHandler } = require('../../constants');
const getMonthsName = require('../GetMonthsName');

const userIdForTestingGetters = 1;

const {
	getCurrentYear,
	getCurrentMonth,
	getCurrentWeek,
	getCurrentDay
} = require('.');

function getIndexByYear(year, json) {
	for (const i in json.years) {
		if (json.years[i].year === year) {
			return i;
		}
	}
}

function getIndexByMonth(month, json) {
	for (const i in json) {
		for (const k in json[i]) {
			if (Object.keys(json[i][k])[0] === month) {
				// console.log(json[i][k]);
				return json[i][k];
			}
		}
	}
}

test('getCurrentYear', async () => {
	expect(
		await getCurrentYear(userIdForTestingGetters)
).toEqual(testJson.years[getIndexByYear(dataHandler.getDate().getFullYear(), testJson)]);
});

test('getCurrentMonth', async () => {
	const year = testJson.years[getIndexByYear(dataHandler.getDate().getFullYear(), testJson)];
	expect(
		await getCurrentMonth(userIdForTestingGetters)
	).toEqual(
		getIndexByMonth(getMonthsName(dataHandler.getDate().getMonth()), year)
	);
});


test('getCurrentWeek', async () => {
	const month = await getCurrentMonth(userIdForTestingGetters);
	expect(
		await getCurrentWeek(userIdForTestingGetters)
	).toEqual(
		month[getMonthsName(dataHandler.getDate().getMonth())].slice(-7)
	);
});


// test('getCurrentDay', async () => {
// 	// const year = testJson.years[getIndexByYear(dataHandler.getDate().getFullYear(), testJson)];
// 	const tmp = await getCurrentDay(userIdForTestingGetters);
// 	console.log(tmp);
// 	expect(1
// 	).toEqual(
// 1
// 		// dataHandler.getDayValueFromJson()
// 	);
// });
