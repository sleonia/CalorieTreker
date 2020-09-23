// const Scene = require('telegraf/scenes/base');
// // const add = require('./add');
// // const show = require('./show');

// class Generator {
// 	add () {
// 		const name = new Scene('name');
// 		name.enter((ctx) => ctx.reply('Теперь ты в сцене имени. Представься'))
// 		name.on('text', async (ctx) => {
// 		const name = ctx.message.text;
// 		if (name) {
// 			await ctx.reply(`Привет, ${name}`);
// 			await ctx.scene.leave();
// 		} else {
// 			await ctx.reply('Я так и не понял, как тебя зовут')
// 			await ctx.scene.reenter();
// 		}
// 		});
// 		name.on('message', (ctx) => ctx.reply('Это явно не твое имя'))
// 		return name;
// 	}
// }
// // module.exports = {
// // 	add
// // };

// module.exports = Generator;

const Scene = require('telegraf/scenes/base');
// const add = require('./add');
// const show = require('./show');

module.exports = () => {
		const name = new Scene('name');
		name.enter((ctx) => ctx.reply('Теперь ты в сцене имени. Представься'))
		name.on('text', async (ctx) => {
		const name = ctx.message.text;
		if (name) {
			await ctx.reply(`Привет, ${name}`);
			await ctx.scene.leave();
		} else {
			await ctx.reply('Я так и не понял, как тебя зовут')
			await ctx.scene.reenter();
		}
		});
		name.on('message', (ctx) => ctx.reply('Это явно не твое имя'))
		return name;
	};
// module.exports = {
// 	add
// };