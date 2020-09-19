const fs = require('fs');
const Database = require('../database');

class Telegram {
	constructor() {
		this.database = new Database();
		this.token = fs.readFileSync('src/telegram/.env');
	}

	launch() {
	}
}

module.exports = Telegram;
