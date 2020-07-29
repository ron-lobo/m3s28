
basics();
destructure();
varVsLet();
exercises();
gtnFetch();

function basics() {
    let s = 'hiya';
    console.log(s);
    console.log(typeof(s));
    console.log("s.length=" + s.length);

    for (let i = 0; i < s.length; i++) {
        console.log("S[" + i + "]=" + s[i] + " : " + s.charAt(i));
    }
}

function destructure() {

	let student = {
		name: 'ron',
		dob: '1/1/2000',
		start: '1/6/2020',
		course: 'CS',
		address: {
			number: 123,
			postcode: 'E1 abc',
		},
	};

	console.log('student=' + student);

	console.log('student.name=' + student.name + ', dob=' + student.dob + ', course=' + student.course);

	let name0 = student.name;
	let dob0 = student.dob;
	let start0 = student.start;
	let course0 = student.course;
	let number0 = student.address.number;
	let postcode0 = student.address.postcode;
	console.log('name0=' + name0 + ', dob0=' + dob0 + ', start0=' + start0 + ', course0=' + course0 +
		'number0=' + number0 + ', postcode0=' + postcode0);
	

	// JS destructuring

	let {name, dob, start, course, address:{number, postcode}} = student;
	console.log('name=' + name + ', dob=' + dob + ', start=' + start + ', course=' + course +
		', number=' + number + ', postcode=' + postcode);

	let {name: n, dob: d, start: s, course: c, address:{number: num, postcode: pc}} = student;
	console.log('n=' + n + ', d=' + d + ', s=' + s + ', c=' + c + ', num=' + num + ', pc=' + pc);

	let [name2, , , course2] = ['ron', '123', 'abc', 'CS'];
	console.log('name2=' + name2 + ', course2=' + course2);

	let {address:{number: num1, postcode: pc1}} = student;
	console.log('num1=' + num1 + ', pc1=' + pc1);

}

var tableHtmlStr;	// global variable - must use 'var'; (try to avoid)

function exercises() {

    let shares = [99.45, 185.34, 45.45];
    let result = sumNumArray(shares);
    console.log("sumNumArray(shares) result=" + result);


    shares = [
        {id: "123456", currency: "USD", symbol: "AAPL", exchangeName: "NMS", value: 99.45, price: 0.001},
        {id: "454534", currency: "USD", symbol: "FB", exchangeName: "NMS", value: 185.34},
        {id: "987646", currency: "USD",  symbol: "GOOG", exchangeName: "NMS", value: 45.45}
    ];
    result = sumSharePrices(shares);
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
	var v = 1;
	for (let i = 0; i < 5; i++) {
		var num = i;	// scope
	}
	var v = 2;	// redeclare var
	console.log("num=" + num); // 'num' is visible here, 'i' is not
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
	// obj.originalSet.forEach(function(item, index) {
		// newArray.push(obj.toReplace.includes(item) ? obj.newValue : item);
	// });
	obj.originalSet.forEach(item => newArray.push(obj.toReplace.includes(item) ? obj.newValue : item));
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

function gtn() {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		document.getElementById('showGames').innerHTML=this.responseText;
	};
	xhr.open("GET", "http://localhost:8080/api/game", true);
	xhr.send();
}

function gtnFetch() {
	fetch("http://localhost:8080/api/game")
	.then(response => response.json())
	.then(r => r.forEach(game => console.log(`${game.id}, ${game.answer}, ${game.finished}`)))
	.catch(err => console.log("fail: " + err));
}



