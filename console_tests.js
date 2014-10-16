
// facilitates unit testing for various conditions in the browser console
// for development purposes only

// checks the whitelist function; outputs to console
var console_whitelist_test = function(name, str, whitelist_params, expected_value, should_error) {
	var actual = whitelist(str, whitelist_params);
	var correct = test_correct(actual, whitelist_params, expected_value, should_error);
	console.log(name + ": " + correct);
}

// tests the blacklist function; outputs to console
var console_blacklist_test = function(name, str, blacklist_params, expected_value, should_error) {
	var actual = blacklist(str, blacklist_params);
	var correct = test_correct(actual, blacklist_params, expected_value, should_error);
	console.log(name + ": " + correct);
}

// Tests if each value in the actual result hash corresponds to the expected value provided in the expected values array
// actual: an object with keys and values
// hash_values: keys for actual
// expected_values: an array of what the values in actual are expected to be
// should_error: flag for if the test was intended to fail -- actual was false instead of an object, but this was intended
var test_correct = function(actual, hash_values, expected_values, should_error) {
	var correct = "ok";
	if (!should_error) {
		for (var i = 0; i< hash_values.length; i++) {
			if (actual[hash_values[i]] != expected_values[i]) {
				correct = "fail";
			}
		}
	} else {
		if (actual != false) {
			correct = "fail"
		}
	}
	return correct;
}

var test_if_in_for = "for (var i=0;i<12;i++) {if (i==2) {console.log('I is two');}}"
var test_if = "var x = 'value'; if (x == true) {console.log('statement')}";

// tests that the whitelist function finds a statement nested in two if statements
var for_in_nested_if = "var x=1; var y=2; if(x=2) { if (y=2) { for (var i=2; i>0; i--) {console.log('in here');} } }";
var too_many_brackets = "var x=1; var y=2; if(x=2) { if (y=2) { for (var i=2; i>0; i--) {console.log('in here');} } } }";
var function_expression = "var y = function(x) {console.log(x)}";
var function_expression_with_for = "var y = function(x) {for (var i=0;i<x;i++) {console.log(i)}}";
var function_declaration = "function sayHello() {console.log('hi');}"
var variable_declaration = "var x = 2"


// Whitelist tests 
console_whitelist_test("whitelist nested statements", test_if_in_for, ["IfStatement", "ForStatement"], [true, true]);
console_whitelist_test("whitelist single statement", test_if, ["IfStatement"], [true]);
console_whitelist_test("whitelist single not present", test_if, ["WhileStatement"], [false]);
console_whitelist_test("whitelist nested if", for_in_nested_if, ["ForStatement"], [true]);
console_whitelist_test("whitelist nested if not present", for_in_nested_if, ["WhileStatement"], [false]);
console_whitelist_test("whitelist with too many brackets", too_many_brackets, ["ForStatement"], [false], true);
console_whitelist_test('whitelist function expression', function_expression, ["FunctionExpression"], [true]);
console_whitelist_test('whitelist function declaration', function_declaration, ["FunctionDeclaration"], [true]);
console_whitelist_test('variable declaration', variable_declaration, ["VariableDeclaration"], [true]);


// Blacklist tests
console_blacklist_test("blacklist nested statements", test_if_in_for, ["IfStatement", "ForStatement"], [false, false]);
console_blacklist_test("blacklist single statement", test_if, ["IfStatement"], [false]);
console_blacklist_test("blacklist single not present", test_if, ["WhileStatement"], [true]);
console_blacklist_test("blacklist nested if", for_in_nested_if, ["ForStatement"], [false]);
console_blacklist_test("blacklist nested if not present", for_in_nested_if, ["WhileStatement"], [true]);

// since this code has an error, we expect for statment to be false since the function will return an error
// before the for is added to the hash
console_blacklist_test("blacklist with too many brackets", too_many_brackets, ["ForStatement"], [false], true);
console_blacklist_test('blacklist function expression', function_expression, ["FunctionExpression"], [false]);
console_blacklist_test('blacklist function declaration', function_declaration, ["FunctionDeclaration"], [false]);
console_blacklist_test('variable declaration', variable_declaration, ["VariableDeclaration"], [false]);
