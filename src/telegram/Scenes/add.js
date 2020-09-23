const Scene = require('telegraf/scenes/base');
const { local } = require('../../constants');
const ui = require('../../Utils/UserInteraction');

module.exports = () => {
	const add = new Scene('add');
	add.enter((ctx) => ctx.reply(local['commands.description']['add']));
	add.on('text', async (ctx) => {
		const add = ctx.message.text;
		if (add && add[0] != '/') { ////// PARSE USER INPUT
			// Here i made a INSERT to my database
			let message = local['user.interaction']['bon.appetite'];
			message += await ui.makePoliteComment();
			await ctx.reply(message);
			await ctx.scene.leave();
		} else if (add === '/end') {
			await ctx.reply(local['user.interaction']['bye']);
			await ctx.scene.leave();
		} else {
			await ctx.reply(local['user.interaction']['error.input']);
			await ctx.scene.reenter();
		}
	});
	return add;
};
