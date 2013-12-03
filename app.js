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
	this.primes = [2, 3, 5, 7];
	this.candidates = [2, 3]; // excludes 2, at most 1 more than sqrt of index
	this.index = 7;
}
png.prototype.isPrime = function() {
	var complex = false;
	while (Math.pow(this.candidates[this.candidates.length - 1], 2) < this.index) {
		this.candidates.push(this.primes[this.candidates.length]);
		complex = true;
	}
	if (complex && this.candidates.length > 2) {
		var clipAt = 1;
		while (Math.pow(this.candidates[this.candidates.length - clipAt], 2) > this.index) clipAt--;
		return !this.candidates
			.slice(0, this.candidates.length - clipAt)
			.some(this.index.isFactor.bind(this.index));
	}
	else return !this.candidates.some(this.index.isFactor.bind(this.index));
};
png.prototype.iterator = function() {
	do {
		this.index+=2;
	} while (!this.isPrime());
	this.primes.push(this.index);
	return this.index;
};
String.prototype.replaceAt=function(index, character) {
	return this.substr(0, index) + character + this.substr(index+character.length);
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

String.prototype.isPalindrome = function() {
	var l = Math.floor(this.length / 2);
	return (this.substr(0, l)) == (this.substr(-l, l).split("").reverse().join(""));
};

function deg2rad (deg) {
	return deg * Math.PI / 180;
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
}).call();

var sprites = {
	r: {
		color: "#f00",
		solid: true,
		movable: false
	},
	o: {
		color: "#f90",
		solid: true,
		movable: false
	},
	y: {
		color: "#ff0",
		solid: true,
		movable: false
	},
	g: {
		color: "#0f0",
		solid: true,
		movable: false
	},
	b: {
		color: "#00f",
		solid: true,
		movable: false
	},
	p: {
		color: "#909",
		solid: true,
		movable: false
	},
	t: {
		color: "#0ff",
		solid: true,
		movable: false
	},
	w: {
		color: "#aaa",
		solid: true,
		movable: false
	},
	d: {
		color: "#69f",
		solid: true,
		movable: true
	},
	" ": {
		color: "#000",
		solid: false,
		movable: false
	},
	"W": {
		color: "#eee",
		solid: false,
		movable: false
	},
	"": {
		color: "#000",
		solid: true,
		movable: false
	}
};
var map = [
	"bybbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbybbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
	"b  g          r                bb  g          r                b",
	"b  g          r                bb  g          r                b",
	"b  g  o   ttttttt   gggggg   ggbb  g  o   ttttttt   gggggg   ggb",
	"b  g  o      b      g          bb  g  o      b      g          b",
	"b  g  o   r  b   gggg   gggggggbb  g  o   r  b   gggg   gggggggb",
	"b     o   r      g             bb     o   r      g             b",
	"brrrrrr   rggggggg   ggggggg   bbrrrrrr   rggggggg   ggggggg   b",
	"b         rg             g     bb         rg             g     b",
	"b  g   g   g             g     bb  g   g   g             g     b",
	"bggg   g   g    gggggg   ggggggbbggg   g   g    gggggg   ggggggb",
	"b      g   g    g          gg          g   g    g          ggrbb",
	"b  ggggg   g    g          gg      ggggg   g    g          gg bb",
	"b          g    ggggggggggggg  bb          g    ggggggggggggg bb",
	"b  ggg  gggg                   bb   gg  gggg                  bb",
	"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb   bbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
	"bybbbbbbbbbbbbbbbbbbbbbbbbbbbb   ybbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
	"b  g          r                  bbg          r                b",
	"b  g  o   ttttttt   gggggg   ggbb  g  o   ttttttt   gggggg   ggb",
	"b  g  o      b      g          bb  g  o      b      g          b",
	"b  g  o   r  b   gggg   gggggggbb  g  o   r  b   gggg   gggggggb",
	"b     o   r      g             bb     o   r      g             b",
	"brrrrrr   rggggggg   ggggggg   bbrrrrrr   rggggggg   ggggggg   b",
	"b         rg             g     bb         rg             g     b",
	"b  g   g   g             g     bb  g   g   g             g     b",
	"bggg   g   g    gggggg   ggggggbbggg   g   g    gggggg   ggggggb",
	"b      g   g    g          gg          g   g    g          ggybb",
	"b  ggggg   g    g          gg      ggggg   g    g          gg bb",
	"b          g    ggggggggggggg  bb          g    ggggggggggggg bb",
	"b  ggg  gggg                   bb  ggg  gggg                  bb",
	"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
];

function baddie() {
	var x, y;
	do {
		y = Math.floor(Math.random() * map.length);
		x = Math.floor(Math.random() * map[y].length);
	} while (map[y][x] != " ");
	this.position.x=x;
	this.position.y=y;
	this.position.o = Math.floor(Math.random() * 360);
};

baddie.prototype.position = { x: 0, y: 0, o: 0 };
baddie.prototype.draw = function(canvas, player) {
	canvas.fillStyle = "#ff5";
	canvas.fillRect(0,0,30,480);

};

baddie.prototype.seek = function(player) {
	var direction = deg2rad(this.position.o);
	var dX = Math.cos(direction),
		dY = Math.sin(direction);
	for (var angleRad = direction - 0.5; angleRad < direction + 0.5; angleRad += 0.02) {
		for (var distance = 1; distance < 20; distance++) {
			var tX = Math.floor(distance * dX),
				tY = Math.floor(distance * dY);
			if (0 === tX && 0 === tY) continue;

			var sprite = map[Math.floor(this.position.y) + tY][Math.floor(this.position.x) + tX] || "";
			if (sprites[sprite].solid) {
				return false;
			}

			if (Math.floor(player.x) == Math.floor(this.position.x + tX) &&
				Math.floor(player.y) == Math.floor(this.position.y + tY)) {
				console.log("I see you");
			}
		}
	}
};

// window.addEventListener("load", function() {
(function() {
	var current = { x:1, y:1, o: 90 };
	var domCanvas;
	var canvas;
	var enemy = new baddie();
	var addAlphaToSprite = function(sprite, distance) {
		var s = JSON.parse(JSON.stringify(sprite));
		s.alpha = (distance - 1) / 20;
		s.distance = distance;
		s.color = "#" + s.color.substr(1,3).split("").map(function(c) {
			return Math.floor(parseInt(c, 16) * (21 - distance) / 20 ).toString(16);
		}).join("");
		return s;
	};
	var plotmap = function() {
		var m = map.join("\n").split("\n");
		m[Math.floor(current.y)] = m[Math.floor(current.y)].replaceAt(current.x, "X");
		document.getElementById("map").innerHTML = m.join("\n");
		document.getElementById("compass").style.webkitTransform = "rotate(" + ((current.o + 90) % 360) + "deg)";
	};

	var getAt = function(x, y, rad) {
		var dX = Math.cos(rad),
			dY = Math.sin(rad);
		
		for (var distance = 1; distance < 20; distance++) {
			var tX = Math.floor(distance * dX),
				tY = Math.floor(distance * dY);
			if (0 === tX && 0 === tY) continue;
			
			var sprite = map[Math.floor(y) + tY][Math.floor(x) + tX] || "";
			if (sprites[sprite].solid) return addAlphaToSprite(sprites[sprite], distance);
		}
		return addAlphaToSprite(sprites[""], distance);
	};

	var panorama = function(x, y, direction) {
		var out = [];
		var last = false, cur;
		for (var angleRad = direction - 1.48; angleRad < direction + 1.48; angleRad += 0.0592) {
			cur = getAt(x, y, angleRad);
			if (last && cur.distance < last.distance + 1) {
				out.splice(out.length - 1, 1, cur);
			}
			out.push(cur);
		}
		return out;
	};

	var director = (function() {
		var sprite_w = 18;
		return function() {
			canvas.clearRect(0,0,900,480);
			// enemy.seek(current);
			canvas.fillStyle="#9af";
			canvas.fillRect(0, 0, 900, 80);
			canvas.fillStyle="#888";
			canvas.fillRect(0,80, 900, 400);
			var oldX = 0, oldY0 = 0, oldY1 = 480;
			panorama(current.x, current.y, deg2rad(current.o)).map(function(sprite, index) {
				var indent = 3 * Math.floor(Math.min((25 - Math.abs(index - 25)), (25 - Math.abs(index - 24)))/3);
				var newY0 = indent,
					newY1 = 480 - newY0 - sprite.distance * 35,
					newX = (index+1) * sprite_w;
				if (newY1 < newY0) newY1 = newY0 + 10;
				canvas.fillStyle = sprite.color;
				canvas.beginPath();
				canvas.moveTo(oldX, oldY0);
				canvas.lineTo(newX, newY0);
				canvas.lineTo(newX, newY1);
				canvas.lineTo(oldX, oldY1);
				canvas.closePath();
				canvas.fill();
				oldX = newX;
				oldY0 = newY0;
				oldY1 = newY1;
				// enemy.draw(canvas, current);
			});
			window.requestAnimFrame(director);
		};
	}).call();

	window.addEventListener("keypress", function(k) {
		var tx, ty;
		switch(k.keyCode) {
			case 'a'.charCodeAt(0):
				current.o -= 15;
				if (current.o < 0) current.o += 360;
				break;
			case 'd'.charCodeAt(0):
				current.o += 15;
				if (current.o >= 360 ) current.o -= 360;
				break;
			case 's'.charCodeAt(0):
				tx = current.x - Math.cos(current.o * Math.PI / 180);
				ty = current.y - Math.sin(current.o * Math.PI / 180);

				if (ty > 0 && ty < map.length - 1) current.y = ty;
				if (tx > 0 && tx < map[Math.floor(current.y)].length - 1) current.x = tx;

				break;
			case 'w'.charCodeAt(0):
				tx = current.x + Math.cos(current.o * Math.PI / 180);
				ty = current.y + Math.sin(current.o * Math.PI / 180);

				if (ty >= 1 && ty < map.length - 1 && !sprites[map[Math.floor(ty)][Math.floor(current.x)]].solid) current.y = ty;
				if (tx >= 1 && tx < map[Math.floor(current.y)].length - 1 &&  !sprites[map[Math.floor(current.y)][Math.floor(tx)]].solid) current.x = tx;

				break;
		}
		plotmap();
	});
	window.addEventListener("load", function() {
		domCanvas = document.getElementById("canvas");
		canvas = domCanvas.getContext("2d");
		director();
	});
}).call();