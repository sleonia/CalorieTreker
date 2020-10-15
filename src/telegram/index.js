const { Telegraf } = require('telegraf');
// const express = require('express')
const { Stage, session } = Telegraf;
const Scenes = require('./Scenes');

const { local, bot, database, dataHandler } = require('../constants');
const Commands = require('./commands');
// const expressApp = express()
// const port = process.env.PORT || 3000

class Telegram {
	constructor() {
		const stage = new Stage([Scenes.add(), Scenes.edit()]);
		bot.use(session());
		bot.use(stage.middleware());
	}

	async commandsHandler() {
		await Commands.start(database, dataHandler, bot, local);
		await Commands.help(bot, local);
		await Commands.donat(bot, local);
		await Commands.contacts(bot, local);
		await Commands.show(bot, local);
		await Commands.edit(bot, local);
		await Commands.add(bot, local);
		await Commands.today(database, dataHandler, bot, local);
		await Commands.errorHandler(bot, local);
	}

	async launch() {
		await this.commandsHandler();

		// expressApp.get('/', (req, res) => {
		//   res.send('Hello World!')
		// })
		// expressApp.listen(port, () => {
		//   console.log(`Listening on port ${port}`)
		// })

		bot.launch();
		// bot.startPolling()
	}
}

module.exports = Telegram;
