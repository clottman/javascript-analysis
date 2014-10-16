javascript-analysis
===================
Project submission to Khan Academy as an internship interview stage.

## Files
-Test_js.js: Implements 2 API methods, whitelist and blacklist, which parse a provided string as javascript and determine whether certain code elements are present
-Console_tests.js: Browser-console unit tests for the API methods
-Parse_input.js: Apply the whitelist and blacklist API methods to a text field
-Test.html: A basic HTML page that includes all the necessary files to run the console tests and demo the API functionality.
-Esprima_vs_acorn.txt: A justification for the choice of Esprima as the project's Javascript parser

### External Libraries
Esprima -- see esprima_vs_acorn.txt for why
JQuery, because everything includes JQuery. (But really, only to catch the keypress event in the test textarea)
