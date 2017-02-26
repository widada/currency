const request = require('request-promise');
const url = 'http://openexchangerates.org/api/latest.json?app_id='

let openExchange = (appId) => {
	return request(url+appId)
		.then(currencies => {
			return currencies
		})
		.catch(err => {
			console.log(err)
			process.exit(0)
		})
}

module.exports = openExchange