const { Telegraf } = require('telegraf');
const { Stage, session } = Telegraf;

const Database = require('../Database');
const { local, bot } = require('../constants');
const Commands = require('./Commands');

const Scenes = require('./Scenes');
const stage = new Stage([Scenes.add(), Scenes.show()]);


class Telegram {
	constructor() {
		this.database = new Database();
		bot.use(session());
		bot.use(stage.middleware());
	}

	async commandsHandler() {
		Commands.start(this.database, bot, local);
		Commands.help(bot, local);
		Commands.donat(bot, local);
		Commands.contacts(bot, local);
		Commands.show(bot, local);
		Commands.edit(bot, local);
		Commands.add(bot);
		Commands.errorHandler(bot, local);
	}

	async launch() {
		this.commandsHandler();
		bot.launch();
	}
}

module.exports = Telegram;
