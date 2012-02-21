
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
	
	Pac.events.attach(this, 'click');
}

Pac.CommandAction.prototype.update = function(){
	//maybe a hover for drawing
	
	this.color = 'blue';
	if (this.action === Pac.currentAction)
		this.color = 'red';
}

Pac.CommandAction.prototype.draw = function(){
	var ctx = Pac.getContext();
	ctx.save();
	ctx.textBaseline = 'top';
	ctx.fillStyle = this.color;
	ctx.font  = 'normal 20px sans-serif';
	ctx.fillText(this.name, this.attrs.x, this.attrs.y);
	ctx.restore();
}

Pac.CommandAction.prototype.fireAction = function(){
	Pac.currentAction = this.action;
	Pac.commandBar.log("Action [" + this.name + "] taked!");
}
