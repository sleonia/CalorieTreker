const fs = require('fs');
const { Telegraf } = require('telegraf');

const local = JSON.parse(fs.readFileSync('locales/ru.json'));
const bot = new Telegraf(process.env.TOKEN);

const Database = require('./database');
const DataHandler = require('./DataHandler');

const database = new Database();
const dataHandler = new DataHandler();

module.exports = {
	local,
	bot,
	database,
	dataHandler,
};
