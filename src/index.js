const Telegram = require('./telegram');

(async () => {
	try {
		let telegram = new Telegram();
		telegram.launch();
	} catch (error) {
		console.error(error);
	}
})();
