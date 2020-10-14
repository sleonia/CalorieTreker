const { Telegraf } = require('telegraf');
const express = require('express')
const { Stage, session } = Telegraf;
const Scenes = require('./Scenes');

const { local, bot, database, dataHandler } = require('../constants');
const Commands = require('./commands');

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
		const expressApp = express()

		const port = process.env.PORT || 3000
		expressApp.get('/', (req, res) => {
		  res.send('Hello World!')
		})
		expressApp.listen(port, () => {
		  console.log(`Listening on port ${port}`)
		})

		bot.startPolling()
	}
}

module.exports = Telegram;
