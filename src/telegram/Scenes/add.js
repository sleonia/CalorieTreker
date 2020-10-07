const Scene = require('telegraf/scenes/base');
const { local, database, dataHandler } = require('../../constants');
const ui = require('../../Utils/UserInteraction');

module.exports = () => {
	const add = new Scene('add');
	add.enter((ctx) => ctx.reply(local['commands.description']['add']));
	add.on('text', async (ctx) => {

		const userData = await database.getAllUserDataById(ctx.message.from.id);

		// daa
		// dataHandler.setDayValueToJson(database.getDate().getFullYear(), )

		// await database.updateData(newFullDate, userData.user_id);

		console.log(userData);
		database.updateDate(dataHandler.getFullDate() , ctx.message.from.id);

		// const userData = ctx.message.text;
		// console.log(dataHandler.date().getDate());

		// console.log(userData);


		// // insert or update

		// let message = local['user.interaction']['bon.appetite'];
		// message += ' ' + await ui.makePoliteComment();
		// await ctx.reply(message);
		// await ctx.scene.leave();
	});
	return add;
};
