const fs = require('fs');
const { Pool } = require('pg');

class Database {
	constructor() {
		this.pool = this.connect();
	}

	connect() {
		const pool = new Pool({
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false
			}
		});
	return pool;
	}

	async addNewUser(newUser) {
		this.pool.query(
			`INSERT INTO data (username, user_id, first_sign, last_sign, data)
				VALUES (
					'${newUser.username}', '${newUser.user_id}',
					'${newUser.first_sign}', '${newUser.last_sign}', '${JSON.stringify(newUser.data)}'
				)
			`);
	}

	async getAllUserDataById(id) {
		return this.pool.query(`SELECT * FROM data WHERE user_id='${id}'`)
			.then(res => {
				return res.rows[0];
			})
			.catch(() => {
				return undefined;

			});
	}

	async updateDate(newFullDate, id) {
		return this.getAllUserDataById(id)
			.then(() => {
				this.pool.query(`UPDATE data SET last_sign='${newFullDate}' WHERE user_id='${id}'`);
				return true;
			})
			.catch(() => undefined);
	}

	async updateData(newData, id) {
		return this.getAllUserDataById(id)
			.then(() => {
				this.pool.query(`UPDATE data SET data='${JSON.stringify(newData)}' WHERE user_id='${id}'`);
				return true;
			})
			.catch(() => undefined);
	}

	disconnect() {
		this.pool.end();
	}
}

module.exports = Database;
