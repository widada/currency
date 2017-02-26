const request = require('request-promise');
const cheerio = require('cheerio');
const url = 'http://www.bi.go.id/en/moneter/informasi-kurs/transaksi-bi/Default.aspx';

const option = {
	uri: url,
	transform: (body) => {
		return cheerio.load(body)
	}
}



request(option)
	.then($ => {
		let table =  $('.table1').find('tr').find('td')
		console.log(table.html())
		let currencies = []
		// table.each((i, tr) => {
		// 	let currency = []
		// 	$(tr).each((index, td) => {
		// 		let content = $(td).text()

		// 		console.log($(td).find('td').html())

		// 		let removeNewLine = /(\r\n|\n|\r)/gm
		// 		let removeSpace = /\s/g

		// 		let currencyData = content.replace(removeNewLine, "")
		// 								  .replace(removeSpace, "")

		// 		// console.log(currencyData)
		// 		if (currencyData != '')
		// 			currency.push(currencyData)
		// 	})

		// 	// console.log('currr',currency)
		// })
		// console.log(currencies)
	})
	.catch(err => {
		console.log(err);
		process.exit(0);
	})
