const JsonDataHandler = require('../jsonDataHandler');
const { defaultJsonData, getMonthsName } = require('../constants');
let jsonDataHandler = new JsonDataHandler();

const userInfo = {
  'id': '361912587',
  'is_bot': 'false',
  'first_name': 'Nikita',
  'username': 'EmbodimentEvil',
  'language_code': 'ru'
};

const user = {
	user_id: '361912587',
	username: 'EmbodimentEvil',
	first_sign: jsonDataHandler.getFullDate(),
	last_sign: jsonDataHandler.getFullDate(),
	data: defaultJsonData,
};

const date = new Date();

test('JsonDataHandler.setDayValueToJson', () => {
	let json = defaultJsonData(2020, 'october', 1);
	jsonDataHandler.setDayValueToJson(2020, 'october', 1, json.years, '12345');
	expect(
		json
	).toEqual(JSON.parse('{"years":[{"year":2020,"months":[{"october":[{"1":"12345"}]}]}]}'));
});

test('JsonDataHandler.addNewUser', () => {
	expect(
		jsonDataHandler.addNewUser(userInfo)
	).toEqual(user);
});

test('JsonDataHandler.updateUserData', () => {
	let updatedUser = user;
	jsonDataHandler.setDayValueToJson(
		date.getFullYear(), getMonthsName(date.getMonth()),
		date.getDate(), updatedUser.data.years, '1234567890'
	);

	jsonDataHandler.updateUserData(user, '1234567890');
	expect(user).toEqual(updatedUser);
});

test('JsonDataHandler.getFullDate', () => {
	expect(
		jsonDataHandler.getFullDate()
	).toBe(
		`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
	);
});
