const request = require('request-promise');
const url = 'http://openexchangerates.org/api/latest.json?app_id='

module.exports = (appId) => {
	return request(url+appId)
		.then(currencies => {
			// console.log(currencies)
			return currencies
		})
		.catch(err => {
			console.log(err)
			process.exit(0)
		})
}