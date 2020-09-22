const fs = require('fs');

const emojis = JSON.parse(fs.readFileSync('locales/foods-emoji.json'));

const makePoliteComment = async () => {
	const index = Math.floor(Math.random() * (emojis.foods.length - 1));
	return emojis.foods[index];
};

module.exports = makePoliteComment;
