
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const saveFile = async (data) => {
  writeFileAsync(`statistic.json`, JSON.stringify(data, null, '\t'), (err) => {
		if (err) throw err;
	});
};

module.exports = saveFile;
