
/*
 * will be each button action inside the commandBar
 * it stores the name and action name.
 */

Pac.CommandAction = function(name, action, options){
	this.name = name;
	this.action = action;
	
	this.attrs = {
		x: (options && options.x) || 0,
		y: (options && options.y) || 0,
		width: (options && options.width) || 50,
		height: (options && options.height) || 50
	};
	
	this.color = 'blue';
	
	Pac.Events.attach(this, 'click');
}

Pac.CommandAction.prototype.update = function(action){
	//maybe a hover for drawing
	
	this.color = 'blue';
	if (this.action === Pac.CurrentAction)
		this.color = 'red';
}

Pac.CommandAction.prototype.draw = function(action){
	//TODO: draw action (text)
}

Pac.CommandAction.prototype.fireAction = function(action){
	Pac.CurrentAction = action;
}
