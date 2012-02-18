/*
 * Game objects. i.e. apple
 * Actions can be performed on an object.
 */

Pac.Obj = function(name, options){
	
	this.name = name;
	
	this.attrs = {
		x: (options && options.x) || 0,
		y: (options && options.y) || 0,
		width: (options && options.width) || 0,
		height: (options && options.height) || 0
	};
	
	this.resourceName = (options && options.resName) || '';
	this.actions = {};
};

Pac.Obj.prototype.update = function() {
	//update object state
}

Pac.Obj.prototype.draw = function() {
	//draw image obj
}
