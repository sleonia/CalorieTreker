const fs = require('fs');
const pg = require('./node_modules/pg');

class Database {
	constructor() {
		this.json = JSON.parse(fs.readFileSync('src/database/.env.json'));
		this.pool = this.connect();
		this.pool.query('SELECT * from persons', (err, res) => { //test db
			console.log(res);
			this.pool.end();
		});
	}

	async connect() {
		const pool = await new pg.Pool({
			user: this.json.user,
			host: this.json.host,
			database: this.json.database,
			password: this.json.password,
			port: this.json.port,
		});
		return pool;
	}
}

module.exports = Database;
