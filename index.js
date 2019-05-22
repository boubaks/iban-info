module.exports = {
	mappingKey: {
		A: '10',
		B: '11',
		C: '12',
		D: '13',
		E: '14',
		F: '15',
		G: '16',
		H: '17',
		I: '18',
		J: '19',
		K: '20',
		L: '21',
		M: '22',
		N: '23',
		O: '24',
		P: '25',
		Q: '26',
		R: '27',
		S: '28',
		T: '29',
		U: '30',
		V: '31',
		W: '32',
		X: '33',
		Y: '34',
		Z: '35',
	},

	countryIbanFormat: {
		FR: {
			countryCode: { char: 2, pos: 0 },
			ibanKey: { char: 2, pos: 2 },
			bankCode: { char: 5, pos: 4 },
			counterBank: { char: 5, pos: 9},
			accountNumber: { char: 10, pos: 14 },
			keyNumber: { char: 2, pos: 24 },
		}
	},

	// A = 10 ; B = 11 ; C = 12 ; ... etc ... ; Y = 34 ; Z = 35
	getIban: function getIban(countryCode, bankCode, counterBank, accountNumber, keyNumber) {
		let countryCodeValue = this.mappingKey[countryCode[0]] + this.mappingKey[countryCode[1]] + '00';
		let ibanKey = 98 - (parseInt(countryCodeValue) % 97);

		return (countryCode + ibanKey + bankCode + counterBank + accountNumber + keyNumber);
	},

	getBankInformation: function getBankInformation(iban, bic) {
		const bankInfo = {
			countryCode: iban && iban.length > 2 ? iban[0] + iban[1] : '',
			ibanKey: '',
			bankCode: '',
			counterBank: '',
			accountNumber: '',
			keyNumber: '',
		};

		if (bankInfo.countryCode) {
			for (field in bankInfo) {
				if (field !== 'countryCode') {
					let index = this.countryIbanFormat[bankInfo.countryCode][field].pos;
					let until = this.countryIbanFormat[bankInfo.countryCode][field].pos
								+ this.countryIbanFormat[bankInfo.countryCode][field].char;
					while (index < until) {
						bankInfo[field] += iban[index];
						++index;
					}
				}
			}
		}
		return (bankInfo);
	}
}