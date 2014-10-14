// depends on esprima.js

// code: a string of javascript code to be tested
// whitelist_params: an array of strings representing something the javascript must contain
// returns false if unable to parse code_str, a hash of whitelist params and whether they were in the code if not
var whitelist = function(code_str, whitelist_params) {
	try {
		var code_tree = esprima.parse(code_str).body;
	} catch (e) {
		return false;
	}
	var whitelist_length = whitelist_params.length;
	var num_found = 0;
	
	// hash of parameters initialized to false
	var whitelist_hash = createHash(whitelist_params, false);
	
	// copy the code_tree into a queue
	var nodes = code_tree.slice();

	// start checking nodes, stop when out of nodes or all parameters have been found
	var i = 0;
	while (num_found != whitelist_length && i < nodes.length ) {
		if (whitelist_hash[nodes[i].type] == false) {
			whitelist_hash[nodes[i].type] = true;
			num_found++;
		}

		// push child nodes onto queue to check at the end
		// uses breadth first search to check nodes
		if (nodes[i].consequent != undefined) {
			var new_nodes = nodes[i].consequent.body;
			new_nodes.push.apply(nodes, new_nodes);
		}
		if (nodes[i].body != undefined) {
			if (isArray(nodes[i].body)) {
				var new_nodes = nodes[i].body;
				new_nodes.push.apply(nodes, new_nodes);
			} else {
				nodes.push(nodes[i].body)
			}
		}
		if (nodes[i].declarations != undefined) {
			var new_nodes = nodes[i].declarations;
			new_nodes.push.apply(nodes, new_nodes);
		}
		if (nodes[i].type == "VariableDeclarator") {
			nodes.push(nodes[i].init);
		}
		i++;
	}

	return whitelist_hash;
}

var blacklist = function(code_str, blacklist_params) {
	
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