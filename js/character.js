/*
 * user-controlled player. 
 */

Pac.Character = function(name, options){
	
	this.name = name;
	
	this.attrs = {
		x: options.x,
		y: options.y,
		width: options.width,
		height: options.height
	};
	
	this.resourceName = options.resName;
	
	this.ctx = null; //injected by PAC
	
	//array of obj owned by the char
	this.items = [];
};

Pac.Obj.prototype.update = function() {
	//update object state
}

Pac.Obj.prototype.draw = function() {
	//draw image obj
}

