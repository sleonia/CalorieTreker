module.exports = (message = '') => {
	let food = message.split('\n');
	let obj = [];
	food.forEach(element => {
		obj.push(element.split(' '));
	});
	return obj;
};
