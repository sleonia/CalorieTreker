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
		commands.donat(this.bot, this.local);
		commands.contacts(this.bot, this.local);
		// commands.show(this.bot, this.local);
		// commands.edit(this.bot, this.local);
		// commands.add(this.bot, this.local);
	}

	launch() {
		this.commandsHandler();
		this.bot.launch();
	}
}

module.exports = Telegram;
