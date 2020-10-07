const Scene = require('telegraf/scenes/base');
const { local, database, dataHandler } = require('../../constants');
const ui = require('../../Utils/UserInteraction');

module.exports = () => {
	const add = new Scene('add');
	add.enter((ctx) => ctx.reply(local['commands.description']['add']));
	add.on('text', async (ctx) => {
		const userData = ctx.message.text;
		console.log(dataHandler.getFullDate());


		// insert or update

		let message = local['user.interaction']['bon.appetite'];
		message += ' ' + await ui.makePoliteComment();
		await ctx.reply(message);
		await ctx.scene.leave();
	});
	return add;
};
