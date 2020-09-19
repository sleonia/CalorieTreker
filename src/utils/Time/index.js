class Time {
	constructor(unixTime) {
		this.unixTime = unixTime;

		const date = new Date(unixTime * 1000).toUTCString().split(' ');
		// [ "Sat,", "19", "Sep", "2020", "22:30:56", "GMT" ]

		const time = date[4].split(':');
		// "22:30:56"

		this.date = {
			day: date[1],
			month: date[2],
			year: date[3],
			hours:  time[0],
			minutes: time[1],
		};
	}

	getDay() {
		return this.date.day;
	}

	getMonth() {
		return this.date.month;
	}

	getYear() {
		return this.date.year;
	}

	getHours() {
		return this.date.hours;
	}

	getMinutes() {
		return this.date.minutes;
	}
}

module.exports = Time;
