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

	// select(value, valu)

	addNewUser(newUser) {
		const newData = JSON.stringify(newUser.data);
		this.pool.query(`INSERT INTO ${this.json.table} (username, user_id, first_sign, last_sign, data) VALUES ('${newUser.username}', '${newUser.user_id}', '${newUser.first_sign}', '${newUser.last_sign}', '${newData}')`);
	}

	async getAllUsersDataById(id) {
		return this.pool.query(`SELECT * FROM ${this.json.table} WHERE user_id='${id}'`)
			.then(res => {
				return res.rows[0];
			})
			.catch(() => undefined);
	}

	disconnect() {
		this.pool.end();
	}
}

module.exports = Database;
