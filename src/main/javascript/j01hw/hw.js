
var s = 'hello world';
console.log(s);
console.log(typeof(s));
console.log("s.length=" + s.length);

for (let i = 0; i < s.length; i++) {
  console.log("S[" + i + "]=" + s[i] + " : " + s.charAt(i));
}

varVsLet();



function setTime() {
	document.getElementById('time').innerHTML=Date();
}


function toggleText(element, suffix, mesg1, mesg2) {
    let text = document.getElementById(element).innerHTML
    text = ((text.startsWith(mesg1)) ? mesg2 : mesg1) + " " + suffix;
    document.getElementById(element).innerHTML = text;
}


function varVsLet() {
	for (let i = 0; i < 5; i++) {
		var num = i; // global scope (within function)
	}
	console.log("num=" + num);
}
