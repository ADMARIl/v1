//I annoy Vinnie
for (var i = 0; i < 3; i++) {
	var first = parseInt(prompt("Base number " + (i + 1) + ":", "0"));
    var second = parseInt(prompt("Product number " + (i + 1) + ":", "0"));
	nopeLogic(first, second);
}

function logicals(base, product, count) {
	if (isNaN(base) == true || isNaN(product) == true) {
		return false;
	}
	if (base == 1 && product != 1) {
		return false;
	}
	if (typeof count === "undefined") {
		count = 1;
	}
	
	if(product == base || product == 1)
	{
		return count;
	}
	else if(product < base) 
	{
		return false;
	}
	else
	{
		count = count + 1;
		return logicals(base, product / base, count);
	}
}

function nopeLogic(first, second)
{
	var innerLogic = logicals(first, second);
	
	if (innerLogic !== false) {
		document.getElementById("output").innerHTML += "<tr><td>" + first + "</td><td>" + second + "</td><td>" + innerLogic + "</td><td>Its a power</td></tr>";
		console.log(i+1 + ": " + "first: " + first + " second: " + second + " expo: " + innerLogic);
		return "Its a power";
		
	}
	else {
		document.getElementById("output").innerHTML += "<tr><td>" + first + "</td><td>" + second + "</td><td>" + innerLogic + "</td><td>Its not a power</td></tr>";
		console.log(i+1 + ": " + "first: " + first + " second: " + second + " expo: " + innerLogic);
		return "Not a power";
	}
}