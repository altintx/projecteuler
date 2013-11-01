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

function generateSpiral(w, h) {
	var grid = [];
	var index = {};
	var x = Math.ceil(w / 2),
		y = Math.ceil(h / 2),
		dir = "r"; // r d l u
	var cornerSum = 0;
	var move = function() {
		isCorner = false;
		switch(dir) {
			case "r":
				x++;
				if ((y+1) <= h) {
					if ( // can go down
						(
							!(
								(y+1) in index
							)
						)
						|| 
						(
							(y+1) in index
							&&
							!(x in index[y+1])
						)
					) {
						dir = "d";
					}
				}
				return "x";
			case "d":
				y++;
				if (
					(
						(y in index)
						&&
						(x > 1)
						&& 
						(!((x - 1) in index[y]))
					)
					||
					(
						!(y in index)
						&& x > 1
					)
				) {
				// if (!(y in index) && !(x in index[y])) {
					dir = "l";
				}
				return "y";
			case "l":
				x--;
				if (
					(y > 1)
					&&
					(!(x in index[y - 1]))
				) {
				// if (!(y in index) && !(x in index[y - 1])) {
					dir = "u";
				}
				return "x";
			case "u":
				y--;
				if (
					((x + 1) < w) 
					&&
					(
						(!(y in index))
						||
						(
							(y in index) 
							&&
							!((x + 1) in index[y])
						)
					)
				) {
				// if (!((y - 1) in index)) {
					dir = "r";
				}
				return "y";
		}
	};
	for (var i = 1; i <= w * h; i++) {
		// checky: while (y in index) {
		// 	checkx: while (x in index[y]) {
		// 		var b = move();
		// 		if (b == "x") continue checkx;
		// 		if (b == "y") continue checky;
		// 	}
		// 	break;
		// }
		// if (isCorner) cornerSum += i;
		if (y == x) {
			cornerSum += i;
		} else if ((x + y) == w) {
			cornerSum += i;
		}
		grid.push({
			x: x,
			y: y,
			num: i
		});
		index[y] = index[y] || {};
		index[y][x] = true;
		move();
	}
	// cornerSum += (i - 1);
	console.log("sum of corners %i", cornerSum);
	return grid;
}

var s = generateSpiral(1001,1001);