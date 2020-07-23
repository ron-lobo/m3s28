
basics();
varVsLet();
exercises();

function basics() {
    let s = 'hiya';
    console.log(s);
    console.log(typeof(s));
    console.log("s.length=" + s.length);

    for (let i = 0; i < s.length; i++) {
        console.log("S[" + i + "]=" + s[i] + " : " + s.charAt(i));
    }
}

var tableHtmlStr;

function exercises() {

    let shares = [99.45, 185.34, 45.45];
    var result = sumNumArray(shares);
    console.log("sumNumArray(shares) result=" + result);


    shares = [
        {id: "123456", currency: "USD", symbol: "AAPL", exchangeName: "NMS", value: 99.45, price: 0.001},
        {id: "454534", currency: "USD", symbol: "FB", exchangeName: "NMS", value: 185.34},
        {id: "987646", currency: "USD",  symbol: "GOOG", exchangeName: "NMS", value: 45.45}
    ];
    var result = sumSharePrices(shares);
    console.log("sumSharePrices(shares) result=" + result);


    let replacement = {
      originalSet: ["FRF", "USD", "GBP", "ITL", "FRF", "YEN", "USD", "FRF", "EUR", "YEN", "ITL", "DEM"],
      toReplace: ["ESP", "FRF", "ITL", "DEM"],
      newValue: "EUR"
    };
    let myNewArray = replaceInArray(replacement);
    console.log(myNewArray); // new array with replacements!
    console.log(replacement.originalSet); // not changed
    console.log(replacement); // not changed
	
	
	shares = [
	  {id: "123456", currency: "USD", symbol: "AAPL", exchangeName: "NMS", price: 350},
	  {id: "454534", currency: "USD", symbol: "FB", exchangeName: "NMS", price: 230},
	  {id: "987646", currency: "USD",  symbol: "GOOG", exchangeName: "NMS", price: 1500}
	];
	tableHtmlStr = createHtmlTable(shares);
	console.log(tableHtmlStr);
	// document.getElementById("shares").innerHTML = tableHtmlStr;
}


function setTime() {
	document.getElementById('time').innerHTML=Date();
}


function toggleText(element, suffix, mesg1, mesg2) {
    let text = document.getElementById(element).innerHTML
    text = ((text.startsWith(mesg1)) ? mesg2 : mesg1) + " " + suffix;
    document.getElementById(element).innerHTML = text;
}

function toggleShares() {
	toggleText("shares", "", " ", tableHtmlStr);
	toggleText("sharesButton", "shares", "show", "hide");
}


function varVsLet() {
	for (let i = 0; i < 5; i++) {
		var num = i;	// scope
	}
	console.log("num=" + num);
}

function sumNumArray(arr) {
	let sum = 0;
	for (let i=0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum;
}

function sumSharePrices(arr) {
	let sum = 0;
	for (let i=0; i < arr.length; i++) {
		let obj = arr[i];
		for (let prop in obj) {
			if (typeof(obj[prop]) == "number") {
				sum += obj[prop]
			}
		}
	}
	return sum;	
}

function replaceInArray(obj) {
	let newArray = [];
	obj.originalSet.forEach(function(item, index) {
		newArray.push(obj.toReplace.includes(item) ? obj.newValue : item);
	});
	return newArray;
}

function createHtmlTable(array) {
	let tblString = "<table><tr><th>ID</th><th>Currency</th><th>Symbol</th><th>Exchange</th><th>Price</th></tr>";
	array.forEach(function(item, index) {
		tblString += `
		<tr id="${item.id}" class="share">
			<td>${item.id}</td>
			<td class="currency">${item.currency}</td>
			<td class="symbol">${item.symbol}</td>
			<td class="exchangeName">${item.exchangeName}</td>
			<td class="price">\$${item.price}</td>
		</tr>`;
	});
	tblString += "</table>";
	return tblString;
}

