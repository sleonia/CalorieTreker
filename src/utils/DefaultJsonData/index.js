const defaultJsonData = (year = 2020, month = 'may', day = 1, value = '') => {
	let defaultData = {
		'years': [
			{
				'year': year,
				'months': []
			}
		]
	};
	defaultData.years[0].months[0] = {};
	defaultData.years[0].months[0][month] = [];
	defaultData.years[0].months[0][month][0] = {};
	defaultData.years[0].months[0][month][0][day] = value;
	return defaultData;
};

module.exports = defaultJsonData;
