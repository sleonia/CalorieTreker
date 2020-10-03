const getMonthsName = (index) => {
	const monthsNames = [
		"January", "February", "March",
		"April", "May", "June",
		"July", "August", "September",
		"October", "November", "December"
	];
	return monthsNames[index];
};


class Data { //rename class // async???
	constructor() {
		this.date = new Date();
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

	async addItem(userData, newMessage) {
		let json = JSON.parse(userData);
		const years = json.years[json.years.length - 1];
		const months = years.months[years.months.length - 1];
		const currentMonth = getMonthsName(this.date.getMonth());
		const day = months[currentMonth][months[currentMonth].length - 1];
		Object.values(day)[0] = newMessage;
		return userData;
	}

	async getFullDate() {
		return await `${this.date.getDay()}/${this.date.getMonth()}/${this.date.getFullYear()}/`;
	}
}

const data = new Data();
console.log(data.addNewUser({id: 0, username: 'EmbodimentEvil'}));
console.log(data.addItem('{"years":[{"year":2020,"months":[{"October":[{"6":"456"}]}]}]}', '123'));