const getMonthsName = (index) => {
	const monthsNames = [
		"january", "february", "march",
		"april", "may", "june",
		"july", "august", "september",
		"october", "november", "december"
	];
	return monthsNames[index];
};

class Data { //rename class // async???
	constructor() {
		this.date = new Date();
	}

	setDayValueFromJson(year = 2020, month = getMonthsName(0), day = 1, json = {}, value = '') {
		for (let i in json) {
			if (json[i].hasOwnProperty('year') && json[i].year === 2020) {
				this.setDayValueFromJson(year, month, day, json[i].months);
			} else if (json[i].hasOwnProperty(month) && json[i].months === month) {
				this.setDayValueFromJson(year, month, day, json[i][month]);
			} else {
				for (let k in json) {
					if (json[k][month] && json[k][month][day - 1]) {
						console.log(json[k][month][day - 1][day]);
						json[k][month][day - 1][day] = value;
					}
				}
			}
		}
		return true;
	}
	
	addNewUser(userInfo) {
		const month = getMonthsName(this.date.getMonth());
		const day = this.date.getDay();
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
		return `${this.date.getDay()}/${this.date.getMonth()}/${this.date.getFullYear()}/`;
	}
}

let data = new Data();
// console.log(data.addNewUser({id: 0, username: 'EmbodimentEvil'}));
// console.log(JSON.parse(data.addItem(

let json = JSON.parse(
'{"years":[{"year":2020,"months":[{"september":[{"29":"Fish 250\\nSnacks 340\\nBread 500\\n"},{"30":"Milk shake 600\\nMeat and bread 400\\n"}]},{"october":[{"1":"Apple 100\\nIce-cream 800\\nBanana 200\\n"},{"2":"Milk 200\\nCookies 400\\nCoca cola 240\\n"},{"3":"Protein shake 500\\nCookies 400\\nChocolate 700\\n"}]}]}]}'
).years;

console.log(data.setDayValueFromJson(
	2020, 'october', '2', json
));

for (let i in json) {
	for (let j in json[i]) {
		for (let k in json[i][j]) {
			console.log(json[i][j][k]);
		}
	}
}