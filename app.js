/* globals console */
function range(bound) {
	return [].dim(bound).map(function(i, ix) { return ix + 1; });
}
Array.prototype.dim = function(limit) {
	while (limit--) this.push(null);
	return this;
};
Math.sum = function(a) {
	return a.reduce(function(result, val) { return result + val; }, 0);
};
Math.product = function(a) {
	return a.reduce(function(result, val) { return result * val; }, 1);
};
function fibbonaci(sequence) {
	sequence.push((sequence.length >= 2)?
		sequence[sequence.length - 2].add(sequence[sequence.length - 1]):
		BigInteger.ONE
	);
}
Number.prototype.isFactor = function(v) {
	return this % v === 0 && v > 1;
};
Number.prototype.factors = function() {
	var out = [];
	for (var i = 1; i < Math.sqrt(this); i++) {
		if (this % i === 0) {
			out.push(i);
			out.push(this / i);
		}
	}
	return out;
};
Number.prototype.primeFactors = function() {
	var prime_factors = [];
	var primeFinder = function(prime, val) {
		return prime && !i.isFactor(val);
	};
	for (var i = 1; i <= Math.sqrt(this); i++) {
		if (this.isFactor(i)) {
			if (prime_factors.reduce(primeFinder, true)) {
				prime_factors.push(i);
			}
		}
	}
	return prime_factors;
};

Number.prototype.isPalindrome = function() {
	return this.toString == this.toString().reverse();
};

Number.prototype.factorial = function() {
	var o = 1;
	for (var i = 2; i < this; i++) {
		o *= i;
	}
	return o;
};
function png() {
	this.primes = [2, 3, 5, 7, 11, 13, 17, 19];
	this.candidates = [3, 5, 7]; // excludes 2, at most 1 more than sqrt of index
	this.index = 19;
}
png.prototype.isPrime = function() {
	while (Math.pow(this.candidates[this.candidates.length - 1], 2) < this.index) {
		this.candidates.push(this.primes[this.candidates.length]);
	}
	return !this.candidates.some(this.index.isFactor.bind(this.index));
};
png.prototype.iterator = function() {
	do {
		this.index+=2;
	} while (!this.isPrime());
	this.primes.push(this.index);
	return this.index;
};

function memoize(fn, scope) {
	var cache = {};
	scope = scope || window;
	return function() {
		if (arguments[0] in cache) return cache[arguments[0]];
		cache[arguments[0]] = fn.apply(scope, arguments);
		return cache[arguments[0]];
	};
}

function string_int_add(str1, str2) {
	var result = "";
	var lsd = 1;
	var msd = Math.max(str1.length, str2.length);
	var carry = 0;
	var temp = 0;
	for (var ix = lsd; ix <= msd; ix++) {
		if (ix <= str1.length && ix <= str2.length) {
			temp = parseInt(str1.substr(str1.length - ix, 1), 10) + parseInt(str2.substr(str2.length - ix, 1), 10) + carry;
		} else if (ix <= str1.length) {
			temp = parseInt(str1.substr(str1.length - ix, 1), 10) + carry;
		} else {
			temp = parseInt(str2.substr(str2.length - ix, 1), 10) + carry;
		}
		
		if (temp >= 10) {
			carry = Math.floor(temp / 10);
			temp = temp % 10;
		} else {
			carry = 0;
		}
		result = temp.toString() + result;
	}
	if (carry) {
		return carry.toString() + result;
	} else {
		return result;
	}
}

debugger;

// var compositions = {
// 	1:   [[1]],
// 	2:   [[2], [1, 1]],
// 	5:   [[5], [2, 2, 1]],
// 	10:  [[10], [5, 5]],
// 	20:  [[20], [10, 10]],
// 	50:  [[50], [20, 20, 10]],
// 	100: [[100], [50, 50]],
// 	200: [[200], [100, 100]]
// };

// var combinations = [];

// var walker = memoize(function(target) {
// 	var combinations = [];
// 	compositions[target].forEach(function(combo) {
// 		combinations.push(combo);
// 		if (combo.length > 1) {
// 			combo.forEach(function(param, ix) {
// 				combinations.push(
// 					combo
// 						.slice(0,ix)
// 						.concat(combo.slice(ix+1,combo.length - (ix + 1)))
// 			})
// 		}
// 	});
// 	return combinations;
// });
// combinations = walker(200);
// console.log(combinations);

var combos = [];
var target = 200;
for (var cur1 = target; cur1 >= 0; cur1--) {
	if (cur1 == 200) combos.push({
		"1p": cur1,
		"2p": 0,
		"5p": 0,
		"10p": 0,
		"20p": 0,
		"50p": 0,
		"1l": 0,
		"2l": 0
	});
	else for (var cur2 = 0; cur2 <= target - cur1; cur2+=2) {
		if (cur1 + cur2 == 200) combos.push({
		"1p": cur1,
		"2p": cur2 / 2,
		"5p": 0,
		"10p": 0,
		"20p": 0,
		"50p": 0,
		"1l": 0,
		"2l": 0
	});
		else for (var cur3 = 0; cur3 <= target - (cur1 + cur2); cur3+=5) {
			if (cur1 + cur2 + cur3 == 200) combos.push({
				"1p": cur1,
				"2p": cur2/2,
				"5p": cur3/5,
				"10p": 0,
				"20p": 0,
				"50p": 0,
				"1l": 0,
				"2l": 0
			});
			else for (var cur4 = 0; cur4 <= target - (cur1 + cur2 + cur3); cur4+=10) {
				if (cur1 + cur2 + cur3 + cur4 == 200) combos.push({
					"1p": cur1,
					"2p": cur2/2,
					"5p": cur3/5,
					"10p": cur4/10,
					"20p": 0,
					"50p": 0,
					"1l": 0,
					"2l": 0
				});
				else for (var cur5 = 0; cur5 <= target - (cur1 + cur2 + cur3 + cur4); cur5 += 20) {
					if (cur1 + cur2 + cur3 + cur4 + cur5 == 200) combos.push({
						"1p": cur1,
						"2p": cur2/2,
						"5p": cur3/5,
						"10p": cur4/10,
						"20p": cur5/20,
						"50p": 0,
						"1l": 0,
						"2l": 0
					});
					else for (var cur6 = 0; cur6 <= target - (cur1 + cur2 + cur3 + cur4 + cur5); cur6 += 50) {
						if (cur1 + cur2 + cur3 + cur4 + cur5 + cur6 == 200) combos.push({
							"1p": cur1,
							"2p": cur2/2,
							"5p": cur3/5,
							"10p": cur4/10,
							"20p": cur5/20,
							"50p": cur6/50,
							"1l": 0,
							"2l": 0
						});
						else for (var cur7 = 0; cur7 <= target - (cur1 + cur2 + cur3 + cur4 + cur5 + cur6); cur7 += 100) {
							if (cur1 + cur2 + cur3 + cur4 + cur5 + cur6 + cur7 == 200) combos.push({
								"1p": cur1,
								"2p": cur2/2,
								"5p": cur3/5,
								"10p": cur4/10,
								"20p": cur5/20,
								"50p": cur6/50,
								"1l": cur7/100,
								"2l": 0
							});
							else for (var cur8 = 0; cur8 <= target - (cur1 + cur2 + cur3 + cur4 + cur5 + cur6 + cur7); cur8 += 200) {
								if (cur1 + cur2 + cur3 + cur4 + cur5 + cur6 + cur7 + cur8 == 200) combos.push({
									"1p": cur1,
									"2p": cur2/2,
									"5p": cur3/5,
									"10p": cur4/10,
									"20p": cur5/20,
									"50p": cur6/50,
									"1l": cur7/100,
									"2l": cur8/200
								});
							}
						}
					}
				}
			}
		}
	}
}
console.log("%i combos to make 200p, %o", combos.length, combos);