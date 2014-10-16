$(document).ready(function() {

var params = ["IfStatement", "ForStatement"];

	
$('#javascript-area').keypress(function() {
	var answer = whitelist($(this).val(), params);
	var display = "";
	for (var key in answer) {
		if (answer.hasOwnProperty(key)) {
		  	if (answer[key] == true) {
		  		display += "Used a(n) " + key + "<br>";
		  	} else {
		  		display += "Still need a(n): " + key + "<br>";
		  	}
	 	}
	}
	if (display == "") {
		display = "Finish typing, or fix your syntax errors to validate."
	}
	$("#output").html(display);
});

});