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
		(sequence[sequence.length - 2] + sequence[sequence.length - 1]):
		1
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

Number.prototype.typeOf = function() {
	var x = this;
	var factors = this.factors().filter(function(n) { return n < x; });
	var sum = Math.sum(factors);
	if (sum == this) return "perfect";
	else if (sum < this) return "deficent";
	else return "abundant";
}

function run() {
var abundant = range(28123).filter(function(n) { return n.typeOf() == "abundant"; });
debugger;
var limits = abundant.reduce(function(out, val, ix, total) {
	var floor = Math.floor(val / 100);
	if (!(floor in out)) {
		out[floor] = ix;
	}
	return out;
}, {0: 0});
limits[Math.ceil(abundant[abundant.length-1]/100)] = abundant.length - 1;
//throw new Error();
var numbersThatAreNotSumsOfAbundant = range(28123).filter(function(n) {
	var ceil;
	var upperBound = Math.ceil(n / 100);
	ceil = limits[upperBound];
	//if (upperBound >= Object.keys(limits).length) ceil = abundant.length - 1; else ceil = limits[upperBound+1];
	for (var i = 0; i < ceil && abundant[i] < n; i++) {
		for (var j = ceil; j >= i; j--) {
			if (abundant[i] + abundant[j] == n) return false;
		}
	}
	return true;
});
debugger;
 console.log("%i is sum of all numbers not sums of abundant numbers", Math.sum(numbersThatAreNotSumsOfAbundant));
}