const userInteraction = require('../../utils/UserInteraction');

module.exports = async function add(bot, local) {
	bot.hears('/add', async (ctx) => {
		let message = local['commands.description'].add;
		message += '\n';
		message += local['user.interaction']['bon.appetite'] + ' ' + await userInteraction.makePoliteComment();
		ctx.reply(message);
	});
};
