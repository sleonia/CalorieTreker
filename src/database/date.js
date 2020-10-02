export class Data {
	constructor() {
		this.date = new Date();
	}
	
	async addNewUser(userInfo) {
		const newUser = {
			user_id: userInfo.id,
			username: userInfo.username,
			first_sign: this.getFullDate(),
			last_sign: this.getFullDate(),
			// data: createData(),
		};
	}

	async updateUserData(user, message) {
		user.last_sign = this.getFullDate();
		user.data = addItem(user.data, message);
		return user;
	}

	async addItem(userData, message) {
		let json = JSON.parse(userData);
	}

	async getFullDate() {
		return await `${this.date.getDay()}/${this.date.getMonth()}/${this.date.getFullYear()}/`;
	}
}