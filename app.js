/* globals console */
var BigInteger = require("./BigInteger.js").BigInteger;
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
	return this % v === 0 && v > 1 && v < this;
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
	scope = scope || {};
	return function() {
		if (arguments[0] in cache) return cache[arguments[0]];
		cache[arguments[0]] = fn.apply(scope, arguments);
		return cache[arguments[0]];
	};
}
function permutate(array, callback) {
    // Do the actual permuation work on array[], starting at index
    function p(array, index, callback) {
      // Swap elements i1 and i2 in array a[]
      function swap(a, i1, i2) {
        var t = a[i1];
        a[i1] = a[i2];
        a[i2] = t;
      }

      if (index == array.length - 1) {
        callback(array);
        return 1;
      } else {
        var count = p(array, index + 1, callback);
        for (var i = index + 1; i < array.length; i++) {
          swap(array, i, index);
          count += p(array, index + 1, callback);
          swap(array, i, index);
        }
        return count;
      }
    }

    if (!array || array.length == 0) {
      return 0;
    }
    return p(array, 0, callback);
  }
debugger;

var gen = new png();
while (gen.iterator() < 1000000) {}
delete gen.primes[gen.primes.length - 1];
gen.candidates = [2];

function rotate(number, callback) {
	var s = number.toString();
	for (var i = 0; i < s.length; i++) {
		callback(s.substr(i, s.length - i) + s.substr(0, i));
	}
}

var circular_primes = [2];
gen.primes.forEach(function(p) {
	var isCirc = true;
	if (/[02468]/.test(p.toString())) return;
	if (p == 1193) debugger;

	rotate(p, function(rotation) {
		gen.index = parseInt(rotation, 10);
		isCirc = isCirc && gen.isPrime();
	});
	if (isCirc) {
		circular_primes.push(p);
	}
});

console.log(circular_primes.length);