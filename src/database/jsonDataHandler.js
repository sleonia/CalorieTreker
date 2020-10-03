const {
	getMonthsName,
	defaultJsonData,
} = require('./constants');

class JsonDataHandler {
	constructor() {
		this.date = new Date();
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
	
	addNewUser(userInfo) {
		const newUser = {
			user_id: userInfo.id,
			username: userInfo.username,
			first_sign: this.getFullDate(),
			last_sign: this.getFullDate(),
			data: defaultJsonData,
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

	getFullDate() {
		return `${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`;
	}
}

module.exports = JsonDataHandler;
