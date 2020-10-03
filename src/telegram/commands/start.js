const JsonDataHandler = require('../../Database/jsonDataHandler');
let jsonDataHandler = new JsonDataHandler();

module.exports = async (db, bot, local) => {
	bot.hears('/start', (ctx) => {
		let message = local['start.message'].caption;
		message += '\n' + local['start.message'].description;

		db.getAllUserDataById(ctx.message.from.id)
			.then(() => {
					console.log(jsonDataHandler.addNewUser(ctx.message.from));
				}
			);
		ctx.reply(message);
	});
};
