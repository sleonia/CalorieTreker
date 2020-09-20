const nodemailer = require('./node_modules/nodemailer');
const fs = require('fs');

class Email {
	constructor() {
		this.json = JSON.parse(fs.readFileSync('src/utils/Email/.env.json'));
		this.transporter = this.createTransport(this.json);
	}

	async createTransport() {
		const transporter = nodemailer.createTransport({
			host: this.json.host,
			port: this.json.port,
			secure: true,
			auth: {
				user: this.json.auth.login,
				pass: this.json.auth.password,
			}
			});
		return transporter;
	}

	async send(userMail) {
		const mail = {
			from: `${this.json.auth.login}@${this.json.service}.${this.json.domen}`,
			to: userMail,
			subject: 'Sending Email using Node.js',
			text: 'That was easy!'
		};
		console.log(mail);

		this.transporter.sendMail(mail, ((error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.error('Email sent: ' + info.response);
			}
		}));
	}
}

module.exports = Email;
