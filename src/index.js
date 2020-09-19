const Telegram = require('./telegram');

try {
	let telegram = new Telegram();
	telegram.launch();
} catch (error) {
	console.log(error);
}
