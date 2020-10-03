const getMonthsName = (index) => {
	const monthsNames = [
		"january", "february", "march",
		"april", "may", "june",
		"july", "august", "september",
		"october", "november", "december"
	];
	return monthsNames[index];
};

// const defaultJsonData = (year, month, day) => {

// };

class JsonDataHandler { // async???
	constructor() {
		this.date = new Date();
	}

	setDayValueFromJson(year = 2020, month = getMonthsName(0), day = 1, json = {}, value = '') {
		for (let i in json) {
			if (Object.prototype.hasOwnProperty.call(json[i], 'year') && json[i].year === 2020) {
				this.setDayValueFromJson(year, month, day, json[i].months);
			} else if (Object.prototype.hasOwnProperty.call(json[i], month) && json[i].months === month) {
				this.setDayValueFromJson(year, month, day, json[i][month]);
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
		console.log(userInfo);
		const month = getMonthsName(this.date.getMonth());
		const day = this.date.getDate();
		console.log(day);
		let defaultData = {
			"years": [
				{
					"year": this.date.getFullYear(),
					"months": []
				}
			]
		};

		defaultData.years[0].months[0] = {};
		defaultData.years[0].months[0][month] = [];
		defaultData.years[0].months[0][month][0] = {};
		defaultData.years[0].months[0][month][0][day] = '';

		const newUser = {
			user_id: userInfo.id,
			username: userInfo.username,
			first_sign: this.getFullDate(),
			last_sign: this.getFullDate(),
			data: JSON.stringify(defaultData),
		};
		console.log(newUser);
		return newUser;
	}

	async updateUserData(user, message) {
		user.last_sign = this.getFullDate();
		user.data = await this.addItem(user.data, message);
		return user;
	}

	addItem(userData, newMessage) {
		// let json = JSON.parse(userData);
		// const yearsLen = json.years.length - 1;
		// const monthsLen = json.years[yearsLen].months.length - 1;
		// const currentMonth = getMonthsName(this.date.getMonth());
		// const daysLen = json.years[yearsLen].months[monthsLen][currentMonth].length - 1;

		// // console.log(JSON.stringify(json));

		// this.setDayValueFromJson(2020, 'october', '1', json.years);

		// return JSON.stringify(json);
	}

	getFullDate() {
		return `${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}/`;
	}
}

module.exports = JsonDataHandler;
