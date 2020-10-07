const { defaultJsonData } = require('.');

test('defaultJsonData', () => {
	expect(
		JSON.stringify(defaultJsonData(2020, 'march', 1))
	).toBe('{"years":[{"year":2020,"months":[{"march":[{"1":""}]}]}]}'
	);
});
