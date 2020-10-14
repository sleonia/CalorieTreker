const Telegram = require('./telegram');

const index = (async () => {
	try {
		let telegram = new Telegram();
		telegram.launch();
	} catch (error) {
		console.error(error);
	}
})();

module.exports = index;
