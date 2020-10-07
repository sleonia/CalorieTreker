const getMonthsName = (index = 0) => {
	const monthsNames = [
		'january', 'february', 'march',
		'april', 'may', 'june',
		'july', 'august', 'september',
		'october', 'november', 'december'
	];
	index = (index > monthsNames.length - 1) ? index % monthsNames.length : index;
	return monthsNames[index];
};

module.exports = getMonthsName;
