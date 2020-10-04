const parser = require('.');

const message = 'Салат 100\nМолоко 200\nПеченье 345\n';

test('parser', async () => {
	expect(parser(message)).toEqual([['Салат','100'],['Молоко','200'],['Печенье','345']]);
});