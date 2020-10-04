const { getMonthsName, defaultJsonData } = require('./constants');

test('getMonthsName ', () => {
	expect(
		getMonthsName(0)
	).toBe('january');

	expect(
		getMonthsName(11)
	).toBe('december');
});

test('defaultJsonData', () => {
	expect(
		JSON.stringify(defaultJsonData(2020, 'march', 1))
	).toBe('{"years":[{"year":2020,"months":[{"march":[{"1":""}]}]}]}'
	);
});
