const fs = require('fs');
const { Telegraf } = require('telegraf');

// const Database = require('../database');
const commands = require('./commands');

class Telegram {
	constructor() {
		// this.database = new Database();
		this.local = JSON.parse(fs.readFileSync('locales/ru.json'));
		this.bot = new Telegraf(fs.readFileSync('src/telegram/.env.token'));
	}

	commandsHandler() {
		commands.start(this.bot, this.local);
		commands.help(this.bot, this.local);
	}

	launch() {
		this.commandsHandler();
		this.bot.launch();
	}
}

module.exports = Telegram;
