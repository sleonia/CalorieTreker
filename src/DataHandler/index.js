const getMonthsName = require('../Utils/GetMonthsName');
const defaultJsonData = require('../Utils/DefaultJsonData');

class DataHandler {
	constructor() {
		this.date = new Date();
	}
	
	getNewUser(userInfo) {
		const newUser = {
			user_id: `${userInfo.id}`,
			username: userInfo.username,
			first_sign: this.getFullDate(),
			last_sign: this.getFullDate(),
			data: defaultJsonData(
				this.date.getFullYear(),
				getMonthsName(this.date.getMonth()),
				this.date.getDate()
			),
		};
		return newUser;
	}

	updateUserData(user, message) {
		user.last_sign = this.getFullDate();
		user.data = this.setDayValueToJson(
			this.date.getFullYear(), getMonthsName(this.date.getMonth()),
			this.date.getDate(), user.data, message
		);
	}


	getDayValueFromJson(year = 2020, month = getMonthsName(0), day = 1, json = {}) {
		for (let i in json) {
			if (Object.prototype.hasOwnProperty.call(json[i], 'year') && json[i].year === year) {
				return this.getDayValueFromJson(year, month, day, json[i].months);
			} else if (Object.prototype.hasOwnProperty.call(json[i], month) && json[i].months === month) {
				return this.getDayValueFromJson(year, month, day, json[i][month]);
			} else {
				for (let k in json) {
					if (json[k][month]) {
						return json[k][month][json[k][month].length - 1][day] || '';
					}
				}
			}
		}
	}

	setDayValueToJson(year = 2020, month = getMonthsName(0), day = 1, json = {}, value = '') {
		for (let i in json) {
			if (Object.prototype.hasOwnProperty.call(json[i], 'year') && json[i].year === year) {
				this.setDayValueToJson(year, month, day, json[i].months, value);
			} else if (Object.prototype.hasOwnProperty.call(json[i], month) && json[i].months === month) {
				this.setDayValueToJson(year, month, day, json[i][month], value);
			} else {
				for (let k in json) {
					if (json[k][month]) {
						const lastElem = json[k][month].length - 1;
						json[k][month][lastElem][day] = value;
					}
				}
			}
		}
	}

	addNewYear(year = 2020, json) {
		const newYear = {
			'year': year,
			'months': []
		};
		json.years.push(newYear);
		return json.years.length - 1;
	}

	addNewMonth(yearIndex = 0, month = getMonthsName(0), json) {
		const newMonth = {};
		newMonth[month] = [];
		json.years[yearIndex].months.push(newMonth);
		return json.years[yearIndex].months.length - 1;
	}

	addNewDay(yearIndex, monthIndex, day, json) {
		const newDay = {};
		newDay[day] = '';

		const month = Object.keys(json.years[yearIndex].months[monthIndex])[0];
		json.years[yearIndex].months[monthIndex][month].push(newDay);
		return json.years[yearIndex].months[monthIndex][month].length - 1;
	}

	getFullDate() {
		return `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`;
	}

	getDate() {
		return this.date;
	}
}

module.exports = DataHandler;
