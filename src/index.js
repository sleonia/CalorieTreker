const Telegram = require('./Telegram');

const index = (async () => {
	try {
		let telegram = new Telegram();
		telegram.launch();
	} catch (error) {
		console.error(error);
	}
})();

module.exports = index;
