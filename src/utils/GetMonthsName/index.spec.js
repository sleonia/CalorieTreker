const { getMonthsName } = require('.');

test('getMonthsName ', () => {
	expect(
		getMonthsName(0)
	).toBe('january');

	expect(
		getMonthsName(11)
	).toBe('december');
});