const JsonDataHandler = require('../../Database/jsonDataHandler');
let jsonDataHandler = new JsonDataHandler();

module.exports = async (bot, local) => {
	bot.hears('/start', (ctx) => {
		let message = local['start.message'].caption;
		message += '\n' + local['start.message'].description;
		// get user from DATABASE
		// user = getUserFrom();
		// if (user) {
			// jsonDataHandler.updateUserData(ctx.message.from);
		// } else {
			// jsonDataHandler.addNewUser(ctx.message.from);
		// }
		ctx.reply(message);
	});
};
