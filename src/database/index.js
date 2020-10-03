const fs = require('fs');
const pg = require('pg');

/*
{
  user_id: '12345678',
  username: 'EmbodimentEvil',
  first_sign: '20/09/2020',
  last_sign: '02/10/2020',
  data: { years: [ [Object] ] }
}
*/

class Database {
	constructor() {
		this.json = JSON.parse(fs.readFileSync('src/Database/.env.json'));
		this.pool = this.connect();
	}

	connect() {
		const pool = new pg.Pool({
			user: this.json.user,
			host: this.json.host,
			database: this.json.database,
			password: this.json.password,
			port: this.json.port,
		});
		return pool;
	}

	insert(value, valueType) {
		// this.pool.query(`INSERT INTO '${this.json.database}' (${valueType}) VALUES ()`);
	}

	getAllUserDataById(id) {
		return this.pool.query(`SELECT * FROM '${this.json.database}' WHERE user_id='${id}'`)
			.then(res => res.rows[0])
			.catch(() => null);
	}

	disconnect() {
		this.pool.end();
	}
}

module.exports = Database;
