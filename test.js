const ibanInfo = require('./index.js');

let ibanValue = ibanInfo.getIban('FR', '30002', '30404', '000033334P', '55');
if (ibanValue === 'FR763000230404000033334P55') {
	console.log('getIban success', ibanValue);
}

let bankValues = ibanInfo.getBankInformation(ibanValue);
console.log('bankValues', bankValues);