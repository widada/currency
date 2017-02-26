const request = require('request-promise');
const cheerio = require('cheerio');
const url = 'http://www.bca.co.id/en/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator';

const option = {
	uri: url,
	transform: (body) => {
		return cheerio.load(body)
	}
}


let getCurrienciesBca = () => {
	return request(option)
		.then($ => {
			let allContent = []
			let table = $('.table-bordered tbody').find('tr')
			table.each((i, tr) => {
			    let element = $(tr).find('td')
			    let content = []
				element.each((i, td) => {
					let data = $(td).text()
			    	content.push(data)
				})
				allContent.push(content)
			})
			return allContent
		})
		.then(data => { //mapping data
			let currencies = {
				e_rate: {},
				tt_counter: {},
				bank_notes: {}
			}

			data.forEach(currency => {

				let codeCurrency = currency[0]
				let eRateSell = currency[1]
				let eRateBuy = currency[2]
				let ttCounterSell = currency[3] 
				let ttCounterBuy = currency[4]
				let bankNotesSell = currency[5]
				let bankNotesBuy = currency[6]

				currencies.e_rate[codeCurrency] = {
					sell: eRateSell,
					buy: eRateBuy
				}

				currencies.tt_counter[codeCurrency] = {
					sell: ttCounterSell, 
					buy: ttCounterBuy
				}

				currencies.bank_notes[codeCurrency] = {
					sell: bankNotesSell,
					buy: bankNotesBuy
				}

			})
			console.log(currencies)
			return currencies
		})
		.catch(err => {
			console.log(err);
			process.exit(0);
		})
}
module.exports = getCurrienciesBca