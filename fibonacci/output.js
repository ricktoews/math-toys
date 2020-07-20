//---------------------------------------------------------------------------------
// Fibonacci number toy.
// This is to play with the phenomenon that a fibonacci number can be expressed
// as the sum of products of two previous consecutive fibonacci numbers:
// Example: 21 is 2*3 + 3*5.
// However, the method is set up to demonstrate this rather than assume it.
// 
// You specify the size of the fibonacci list and the fibonacci number at which you
// want to begin the demonstration. Say you pick 5. A list is then constructed, so
// that each element after 5 is expressed as a sum containing only 5s and 3s, since
// 3 is the fibonacci number preceding 5.
// So 8 is built as a string '3 + 5', and the numbers that follow are built by concatenating
// previous strings. So:
// 3,
// 5, 
// '3 + 5', 
// '5 + 3 + 5', 
// '3 + 5 + 5 + 3 + 5', 
// &c.
// You can inspect each string to confirm its construction, and you can use the string
// to calculate its sum, to confirm that's the value that's expected, as well.
// Each string is also expressed as a sum of MxA + NxB, partly to give a compact
// representation, but more interestingly to illustrate that M and N are fibonacci
// numbers, just as A and B are. To build on the example above:
// '3 + 5' = '1x3 + 1x5',
// '5 + 3 + 5' = '1x3 + 2x5',
// '3 + 5 + 5 + 3 + 5' = '2x3 + 3x5',
// &c.
// 
// Ideally, the output will be displayed in a table for easy reading, selection of
// input values (size of fibonacci list and which one to start with, adding the
// above embellishments.
//---------------------------------------------------------------------------------

/*
fibList: Build and return a list of n fibonacci numbers.
*/
const fibList = n => {
	n += 2;
	var list = [1, 1];
	let [a, b] = list;
	for (; n > 0; n--) {
		[b, a] = [a, a+b];
		list.push(a);
	}
	return list;
}

/*
asProduct. Accept a string of integers separated by ' + '.
           Return a string formatted as "MxA + NxB", where A and B are the distinct integers in the string
           and M and N are the quantities of each.
           Example: "3 + 2 + 3" would return "1x2 + 2x3".
           It's expected that all integers (A, B, M, N) will be fibonacci numbers.
*/
const asProduct = str => {
	let list = (''+str).split(/\s*\+\s*/);
	list.sort();
	let item = {};
	list.forEach(n => {
		if (!item[n]) item[n] = 0;
		item[n]++;
	});
	let [a, b] = Object.keys(item);
	let prodA = `${item[a]}x${a}`;
	let product = prodA;
	if (b) {
		let prodB = `${item[b]}x${b}`;
		product += ` + ${prodB}`;
	}
	return product;
}

/*
sumParts. Accept strings a and b, where each is a string of integers separated by ' + ', such that
          the string can be evaluated to a sum.
          Each string is eval'd to get the sum, and each string is also passed to asProduct, to get
          the result described for that function.
          What is returned is an object containing the sum of A, the sum of B, the total, the
          sum of A exprssed as a product, and the sum of B expressed as a product.
*/
const sumParts = (a, b) => {
	var sumA = eval(a);
	var sumB = eval(b);
	var prodA = asProduct(a);
	var prodB = asProduct(b);
	return { prodA, prodB, sumA, sumB, sum: sumA + sumB };
}

/*
modDecorate. Accept a list of fibonacci numbers and the on to start with for gathering the extra data.
             The purpose is to illustrate how each fibonacci number beyond a certain one (n) can be expressed 
             as the sum of of n and the fibonacci number that preceded n.
             The extra data includes each such fibonacci number expressed as a sum, and each sum is also
             expressed compactly as MxA + NxB, as described above, for the asProduct function.
*/
const modDecorate = (n, list) => {
	var decor = [], parts = []; 
	let aSum, bSum;
	list.forEach((fib, ndx) => {
		if (fib > n) {
			let { prodA, prodB, sumA, sumB, sum } = sumParts(decor[ndx-2], decor[ndx-1]);
			parts.push({ a: decor[ndx-2], b: decor[ndx-1], prodA, prodB, sumA, sumB, sum });
			decor.push(`${decor[ndx-2]} + ${decor[ndx-1]}`);
		} else {
			decor.push(fib);
		}
	});
	return { parts };
}

var upTo = 12
var list = fibList(upTo);
var decorate = modDecorate(8, list);
console.log('Done', decorate);
