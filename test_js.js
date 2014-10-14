// depends on esprima.js

// code: a string of javascript code to be tested
// ast_types: an array of strings representing something the javascript must contain or not contain
// should_contain: true to check if the ast_types are in the code_str, false to check whether they are not
// returns false if unable to parse code_str, a hash of whitelist params and whether they were in the code if not
var check_presence = function(code_str, ast_types, should_contain) {
	try {
		var code_tree = esprima.parse(code_str).body;
	} catch (e) {
		return false;
	}
	var types_length = ast_types.length;
	var num_found = 0;
	
	// hash of parameters initialized to false
	var types_hash = createHash(ast_types, false);
	
	// copy the code_tree into a queue
	var nodes = code_tree.slice();

	// start checking nodes, stop when out of nodes or all parameters have been found
	var i = 0;
	while (i < nodes.length ) {
		if (should_contain && num_found != types_length) {
			if (types_hash[nodes[i].type] == false) {
				types_hash[nodes[i].type] = true;
				num_found++;
			}
			// push child nodes onto queue to check at the end
			// uses breadth first search to check nodes
			pushChildren(nodes, nodes[i]);
			i++;
		} else {
			// if whitelisting types, break when you've found them all
			break;
		}
	}

	return types_hash;
}

var blacklist = function(code_str, blacklist_params) {
	var result = check_presence(code_str, blacklist_params, false);
	return result;	
}

// code_str: a string of javascript code to be tested
// whitelist_params: an array of strings representing something the javascript must contain
// returns false if unable to parse code_str, a hash of whitelist params and whether they were in the code if not
var whitelist = function(code_str, whitelist_params) {
	var result = check_presence(code_str, whitelist_params, true);
	return result;
}

// NOTE: Traversing the tree ended up being more complicated than I thought. Not all children are in node.body!
// For a more robust solution, I'd use something like https://www.npmjs.org/package/esprima-walk
// or https://github.com/Constellation/estraverse
var pushChildren = function(nodes, node) {
	if (node.consequent != undefined) {
		var new_nodes = node.consequent.body;
		new_nodes.push.apply(nodes, new_nodes);
	}
	if (node.body != undefined) {
		if (isArray(node.body)) {
			var new_nodes = node.body;
			new_nodes.push.apply(nodes, new_nodes);
		} else {
			nodes.push(node.body)
		}
	}
	if (node.declarations != undefined) {
		var new_nodes = node.declarations;
		new_nodes.push.apply(nodes, new_nodes);
	}
	if (node.type == "VariableDeclarator") {
		nodes.push(node.init);
	}
}

var isArray = function(o) {
  return Object.prototype.toString.call(o) === '[object Array]';
}

var createHash = function(params, initializer) {
	var hash = {}
	for (var i = 0; i < params.length; i++) {
		hash[params[i].toString()] = initializer;
	}
	return hash;
}