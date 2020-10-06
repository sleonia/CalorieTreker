const fs = require('fs');
const pg = require('pg');

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

	async addNewUser(newUser) {
		const newData = JSON.stringify(newUser.data);
		this.pool.query(
			`INSERT INTO ${this.json.table} (username, user_id, first_sign, last_sign, data)
				VALUES (
					'${newUser.username}', '${newUser.user_id}',
					'${newUser.first_sign}', '${newUser.last_sign}', '${newData}'
				)
			`);
	}

	async getAllUserDataById(id) {
		return this.pool.query(`SELECT * FROM ${this.json.table} WHERE user_id='${id}'`)
			.then(res => {
				return res.rows[0];
			})
			.catch(() => undefined);
	}

	async updateDate(newFullDate, id) {
		// id = 361912587;
		// console.log(1234);
		return this.getAllUserDataById(id)
			.then(() => {
				this.pool.query(`UPDATE data SET last_sign='10/10/2020' WHERE user_id='${id}'`);
				return true;
			})
			.catch(() => false);
	}

	disconnect() {
		this.pool.end();
	}
}

module.exports = Database;
