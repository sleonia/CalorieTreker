const fs = require('fs');
const pg = require('pg');

class Database {
	constructor() {
		const data = fs.readFileSync('src/database/.env.json');
		this.json = JSON.parse(data);
		this.pool = this.connect();
		this.pool.query('SELECT * from persons', (err, res) => {
		console.log(res);
		this.pool.end();
		});
	}

	connect() {
		const pool = new pg.Pool({
		user: this.json.user,
		host: this.json.host,
		database: this.json.database,
		password: this.json.password,
		port: this.json.port});
		return pool;
	}
}

module.exports = Database;
