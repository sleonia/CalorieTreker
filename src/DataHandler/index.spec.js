const JsonDataHandler = require('.');
const getMonthsName = require('../Utils/GetMonthsName');
const defaultJsonData = require('../Utils/DefaultJsonData');

let jsonDataHandler = new JsonDataHandler();

const date = new Date();

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
	data: defaultJsonData(date.getFullYear(), getMonthsName(date.getMonth()), date.getDate()),
};

test('JsonDataHandler.getDayValueFromJson', () => {
	let json = defaultJsonData(2020, 'october', 1, '12345');
	expect(
		jsonDataHandler.getDayValueFromJson(2020, 'october', 1, json.years)
	).toEqual('12345');
});

test('JsonDataHandler.getDayValueFromJson: invalid', () => {
	let json = defaultJsonData(2020, 'october', 1);
	expect(
		jsonDataHandler.getDayValueFromJson(2020, 'october', 2, json.years)
	).toBe(undefined);
});

test('JsonDataHandler.setDayValueToJson', () => {
	let json = defaultJsonData(2020, 'october', 1);
	jsonDataHandler.setDayValueToJson(2020, 'october', 1, json.years, '12345');
	expect(
		json
	).toEqual(JSON.parse('{"years":[{"year":2020,"months":[{"october":[{"1":"12345"}]}]}]}'));
});

test('JsonDataHandler.getNewUser', () => {
	expect(
		jsonDataHandler.getNewUser(userInfo)
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
		`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
	);
});

test('JsonDataHandler.addNewYear', () => {
	const newData = defaultJsonData(date.getFullYear(), getMonthsName(date.getMonth()), date.getDate());
	jsonDataHandler.addNewYear(2021, newData);
	expect(newData.years.length).toBe(2);
});

test('JsonDataHandler.addNewMonth', () => {
	const newData = defaultJsonData(date.getFullYear(), getMonthsName(date.getMonth()), date.getDate());
	jsonDataHandler.addNewMonth(getMonthsName(date.getMonth() + 1), newData);
	expect(newData.years[newData.years.length - 1].months.length).toBe(2);
});

test('JsonDataHandler.addNewDay', () => {
	const newData = defaultJsonData(date.getFullYear(), getMonthsName(date.getMonth()), date.getDate());
	jsonDataHandler.addNewDay(45, newData);
	expect(
		JSON.stringify(newData)
		).toBe(
		`{"years":[{"year":2020,"months":[{"${getMonthsName(date.getMonth())}":[{"${date.getDate()}":""},{"45":""}]}]}]}`
	);
});
