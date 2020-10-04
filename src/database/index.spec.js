const Database = require('./index');
// const { defaultJsonData } = require('../constants');
let database = new Database();

const user = {
	user_id: '12345678',
	username: 'testUser',
	first_sign: '20/09/2020',
	last_sign: '02/10/2020',
	data: JSON.parse('{"years":[{"year":2020,"months":[{"september":[{"29":"Fish 250\\nSnacks 340\\nBread 500\\n"}]}]}]}'),
};

test('database.addNewUser', async () => {
	const newUser = {...user, user_id: '123456789'};
	database.addNewUser(newUser);
	const data = await database.getAllUserDataById(123456789);
	expect(data).toEqual(newUser);
});

test('database.getAllUserDataById', async () => {
  const data = await database.getAllUserDataById(0);
  expect(data).toBe(undefined);
});

test('database.getAllUserDataById', async () => {
	database.addNewUser(user);
  const data = await database.getAllUserDataById(12345678);
	expect(data).toEqual(user);
});
