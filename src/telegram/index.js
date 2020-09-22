const fs = require('fs');
const { Telegraf } = require('telegraf');

// const Database = require('../database');
const Commands = require('./commands');

class Telegram {
	constructor() {
		// this.database = new Database();
		this.local = JSON.parse(fs.readFileSync('locales/ru.json'));
		this.bot = new Telegraf(fs.readFileSync('src/telegram/.env.token'));
	}

	async commandsHandler() {
		Commands.start(this.bot, this.local);
		Commands.help(this.bot, this.local);
		Commands.donat(this.bot, this.local);
		Commands.contacts(this.bot, this.local);
		Commands.show(this.bot, this.local);
		// Commands.edit(this.bot, this.local);
		Commands.add(this.bot, this.local);
		Commands.errorHandler(this.bot, this.local);
	}

	async launch() {
		this.commandsHandler();
		this.bot.launch();
	}
}

module.exports = Telegram;
