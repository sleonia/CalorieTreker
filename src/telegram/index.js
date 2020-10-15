const { Telegraf } = require('telegraf');
const express = require('express')
const { Stage, session } = Telegraf;
const Scenes = require('./Scenes');

const { local, bot, database, dataHandler } = require('../constants');
const Commands = require('./commands');
const app = express()

class Telegram {
	constructor() {
		const stage = new Stage([Scenes.add(), Scenes.edit()]);
		bot.use(session());
		bot.use(stage.middleware());

		app.set('port', (process.env.PORT || 5000));

		app.get('/', (request, response) => {
		    const result = 'App is running';
		    response.send(result);
		}).listen(app.get('port'), () => {
		    console.log('App is running, server is listening on port ', app.get('port'));
		});
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
		bot.launch();
	}
}

module.exports = Telegram;
