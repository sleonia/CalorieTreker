const fs = require('fs');
const pg = require('pg');
const { createDeflateRaw } = require('zlib');

/*
console.log(res.rows[0]);

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
		const pool = this.connect();
	}

	async connect() {
		const pool = await new pg.Pool({
			user: this.json.user,
			host: this.json.host,
			database: this.json.database,
			password: this.json.password,
			port: this.json.port,
		});
		await pool.query("SELECT * from data", (err, res) => {
			// console.log(res.rows[0]);
			// console.log(res.rows[0].username);
			pool.end();
		});
		return pool;
	}
}

module.exports = Database;
