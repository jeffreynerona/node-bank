// Expose typechecks
module.exports = exports;
exports.typeOf = typeOf;
exports.nameOf = nameOf;
exports.argumentsOf = argumentsOf;
exports.argsOf = argumentsOf;

// Return the type of an object aka safe typeof
function typeOf(o) {
	return o && o.constructor ? o.constructor.name : Object.prototype.toString.call(o).match(/(\w+)\]/)[1];
}

// Return the name of a function aka class name
function nameOf(o) {
	return typeOf(o) == "Function"
		? Function.prototype.toString.call(o).match(/function\s?(\w*)\(/)[1]
		: false;
}

// Return the expected arguments of a function
function argumentsOf(o) {
	if(typeOf(o) == "Function") {
		var args = Function.prototype.toString.call(o).match(/\((.+)\)\s*{/);
		if(!!args && !!args[1]) return args[1].replace(/\s+/g, "").split(",");
		else return [];
	} else return false;
}