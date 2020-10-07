const {
	getMonthsName,
	defaultJsonData,
} = require('../constants');

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
					if (json[k][month] && json[k][month][day - 1]) {
						return json[k][month][day - 1][day];
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
					if (json[k][month] && json[k][month][day - 1]) {
						json[k][month][day - 1][day] = value;
						break;
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
	}

	addNewMonth(month = getMonthsName(0), json) {
		const newMonth = {};
		newMonth[month] = [];
		json.years[json.years.length - 1].months.push(newMonth);
	}

	addNewDay(day, json) {
		const yearsLength = json.years.length - 1;
		let tmp = json.years[yearsLength].months[json.years[yearsLength].months.length - 1];
		const newDay = {};

		newDay[day] = '';
		tmp[Object.keys(tmp)].push(newDay);
	}

	getFullDate() {
		return `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`;
	}
}

module.exports = DataHandler;
