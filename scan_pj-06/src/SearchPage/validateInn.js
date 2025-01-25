export function validateInn(inn, error) {
	var result = false;
	if (typeof inn === 'number') {
		inn = inn.toString();
	} else if (typeof inn !== 'string') {
		inn = '';
	}
	if (!inn.length) {
		return 'Обязательное поле для заполнения';
	} else if (/[^0-9]/.test(inn)) {
		return 'ИНН может состоять только из цифр';
	} else if ([10, 12].indexOf(inn.length) === -1) {
		return 'Допустимое количество цифр - 10 и 12';
	} else {
		var checkDigit = function (inn, coefficients) {
			var n = 0;
			for (var i in coefficients) {
				n += coefficients[i] * inn[i];
			}
			return parseInt(n % 11 % 10);
		};
		switch (inn.length) {
			case 10:
				var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if (n10 === parseInt(inn[9])) {
					result = true;
				}
				break;
			case 12:
				var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
					result = true;
				}
				break;
			default:
				console.log('validateInn(): unknownErr');
		}
		if (!result) {
			return 'Невалидный ИНН';
		}
	}
	return result;
}

export default validateInn;