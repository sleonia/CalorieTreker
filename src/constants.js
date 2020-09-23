const fs = require('fs');
const { Telegraf } = require('telegraf');

const local = JSON.parse(fs.readFileSync('locales/ru.json'))
const bot = new Telegraf(fs.readFileSync('src/telegram/.env.token'))

module.exports = { local, bot };
