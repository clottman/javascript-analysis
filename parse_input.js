$(document).ready(function() {

var whitelist_params = ["IfStatement", "ForStatement"];
var blacklist_params = ["WhileStatement"];

	
$('#javascript-area').keypress(function() {
	var text = $(this).val();
	var whitelist_answer = whitelist(text, whitelist_params);
	var blacklist_answer = blacklist(text, blacklist_params);
	var display = "";
	for (var key in whitelist_answer) {
		if (whitelist_answer.hasOwnProperty(key)) {
		  	if (whitelist_answer[key] == true) {
		  		display += "Good job using a(n) " + key + "<br>";
		  	} else {
		  		display += "Don't forget you need a(n): " + key + "<br>";
		  	}
	 	}
	}
	for (var key in blacklist_answer) {
		if (blacklist_answer.hasOwnProperty(key)) {
		  	if (blacklist_answer[key] == false) {
		  		display += "Oops! You used a(n) " + key + "<br>";
		  	} else {
		  		display += "Good job avoiding using a(n) " + key + "<br>";
		  	}
	 	}
	}
	// this could be a sign the user made a syntax error, or that they are not done typing
	// a better solution is to figure out which one;
	// for now, just don't update the display until there's something we can parse
	if (display != "") {
		$("#output").html(display);		
	}
});

});