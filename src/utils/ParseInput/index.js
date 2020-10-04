/* Example:
Салат 100
Молоко 200
Печенье 345
*/

module.exports = (message) => {
	let food = message.split('\n');
	let obj = [];
	food.forEach(element => {
		obj.push(element.split(' '));
	});
	obj.pop();
	return obj;
};
