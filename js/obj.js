/*
 * Game objects. i.e. apple
 * Actions can be performed on an object.
 */

Pac.Obj = function(name, resName, options){
	
	this.name = name || 'Unknown Object';
	
	this.attrs = {
		x: (options && options.x) || Math.floor(Math.random() * Pac.getWidth),
		y: (options && options.y) || Math.floor(Math.random() * Pac.getHeight),
		width: (options && options.width) || 50,
		height: (options && options.height) || 50
	};
	
	this.resName = resName || '';
	this.actions = {
		'lookAt': function(){ Pac.commandBar.log(this.name); }
	};
	
	Pac.events.attach(this, 'click');
};

Pac.Obj.prototype.setAction = function(action) {
	this.actions[action] = {};
}

Pac.Obj.prototype.fireAction = function(action) {
	this.actions[action]();
}

Pac.Obj.prototype.update = function() {
	//update object state
}

Pac.Obj.prototype.draw = function() {
	//draw image obj
}
