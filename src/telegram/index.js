const { Telegraf } = require('telegraf');
const { Stage, session } = Telegraf;
const Scenes = require('./Scenes');

const { local, bot, database, dataHandler } = require('../constants');
const Commands = require('./Commands');

class Telegram {
	constructor() {
		const stage = new Stage([Scenes.add(), Scenes.edit()]);
		bot.use(session());
		bot.use(stage.middleware());
	}

	async commandsHandler() {
		Commands.start(database, dataHandler, bot, local);
		Commands.help(bot, local);
		Commands.donat(bot, local);
		Commands.contacts(bot, local);
		Commands.show(bot, local);
		Commands.edit(bot, local);
		Commands.add(bot, local);
		Commands.today(database, dataHandler, bot, local);
		Commands.errorHandler(bot, local);
	}

	async launch() {
		this.commandsHandler();
		bot.launch();
	}
}

module.exports = Telegram;
