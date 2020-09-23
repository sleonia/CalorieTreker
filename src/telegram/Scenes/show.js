const WizardScene = require('telegraf/scenes/wizard');
const Markup = require('telegraf/markup');

const { local } = require('../../constants');

module.exports = () => {
	const show = new WizardScene('show',
		(ctx) => {
			ctx.reply(Markup.inlineKeyboard([
				Markup.callbackButton(local['commands.description']['show.button.today'], 'today'),
				Markup.callbackButton(local['commands.description']['show.button.yesterday'], 'yesterday'),
				Markup.callbackButton(local['commands.description']['show.button.week'], 'week'),
				Markup.callbackButton(local['commands.description']['show.button.month'], 'month'),
				Markup.callbackButton(local['commands.description']['show.button.year'], 'year')
			]).extra());
			return ctx.wizard.next();
		},
		(ctx) => {
			// makeSelect(ctx.update.callback_query.data); // DATABASE
			return ctx.wizard.next();
		}
	);
	return show;
};
