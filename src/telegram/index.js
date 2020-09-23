const fs = require('fs');
const { Telegraf } = require('telegraf');
const {
    Stage,
    session
  } = Telegraf;
// const Database = require('../database');
const Commands = require('./Commands');

// const Generator = require('./Scenes');
// const generator = new Generator();
// const add = generator.add();
const Generator = require('./Scenes');
const add = Generator();
const stage = new Stage([add]);
// const stage = new Stage([Scenes.add(), Scenes.show()]);

class Telegram {
	constructor() {
		// this.database = new Database();
		// this.scenes = new Scenes();
		this.local = JSON.parse(fs.readFileSync('locales/ru.json'));
		this.bot = new Telegraf(fs.readFileSync('src/telegram/.env.token'));
		this.bot.use(session());
		this.bot.use(stage.middleware());
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
