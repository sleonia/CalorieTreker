const { Telegraf } = require('telegraf');
const { Stage, session } = Telegraf;
const Scenes = require('./Scenes');
const stage = new Stage([Scenes.add(), Scenes.show()]);

const Database = require('../Database');
const DataHandler = require('../DataH\andler');
const { local, bot } = require('../constants');
const Commands = require('./Commands');



class Telegram {
	constructor() {
		this.database = new Database();
		this.dataHandler = new DataHandler();
		bot.use(session());
		bot.use(stage.middleware());
	}

	async commandsHandler() {
		Commands.start(this.database, this.dataHandler, bot, local);
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
