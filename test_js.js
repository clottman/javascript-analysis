// depends on esprima.js

// code: a string of javascript code to be tested
// whitelist_params: an array of strings representing something the javascript must contain
var whitelist = function(code_str, whitelist_params) {
	var code_tree = esprima.parse(code_str).body;

	var whitelist_length = whitelist_params.length;
	var num_found = 0;
	// hash of parameters initialized to false
	var whitelist_hash = {}
	for (var i = 0; i < whitelist_length; i++) {
		whitelist_hash[whitelist_params[i].toString()] = false;
	}
	
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
		i++;
	}

	return whitelist_hash;
}

