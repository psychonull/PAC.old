
/*
 * will be each button action inside the commandBar
 * it stores the name and action name.
 */

Pac.CommandAction = function(nameCmd, actionCmd, options){
	var name = nameCmd,
		action = actionCmd,
		color = 'blue',
		
		attrs = {
			x: (options && options.x) || 0,
			y: (options && options.y) || 0,
			width: (options && options.width) || 50,
			height: (options && options.height) || 50
		};
	
	Pac.events.attach(this, 'click');
	
	this.update = function(){
		//maybe a hover for drawing
		color = 'blue';
		if (action === Pac.currentAction)
			color = 'red';
	};
	
	this.draw = function(){
		var ctx = Pac.getContext();
		
		ctx.save();
		ctx.textBaseline = 'top';
		ctx.fillStyle = color;
		ctx.font  = 'normal 20px sans-serif';
		ctx.fillText(name, attrs.x, attrs.y);
		ctx.restore();
	};
	
	this.hasPoint = function(point) {
		return Pac.math.pointInRectangle(attrs, point);
	};
	
	this.fireEvent = function(e){
		if (e.type === 'click')
			Pac.currentAction = action;
	};

};
