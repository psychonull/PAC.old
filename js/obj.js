/*
 * Game objects. i.e. apple
 * Actions can be performed on an object.
 */

Pac.Obj = function(nameObj, resNameObj, options){
	var name = nameObj || 'Unknown Object',
	
		attrs = {
			x: (options && options.x) || (Math.floor(Math.random() * Pac.getWidth()) - 50),
			y: (options && options.y) || (Math.floor(Math.random() * Pac.getHeight()) - 50),
			width: (options && options.width) || 50,
			height: (options && options.height) || 50
		},
	
		resName = resNameObj || '',
	
		polygon = (options && options.polygon) || undefined,
		circle = (options && options.circle) || undefined,
	
		actions = {},
		animations = {},
		currentAnimation = 'iddle';

	Pac.events.attach(this, 'click');
	
	this.onAction = function(name, opts) {
		actions[name] = new Pac.Action(this, name, opts);
		return actions[name];
	};
	
	this.doAction = function() {
		if (!actions.hasOwnProperty(Pac.currentAction))
			Pac.commandBar.log('I cannot do that');
		else if (actions[Pac.currentAction].lock()){
			Pac.commandBar.log(actions[Pac.currentAction].getLockedMsg());
		} else	{
			actions[Pac.currentAction].execute();
		}
	};
	
	this.update = function() {
		var cAn = animations[currentAnimation];
		if (cAn){
			if (!cAn.isRunning()) cAn.start();
			else cAn.update();
		}
	};
	
	this.draw = function() {
	  var ctx = Pac.getContext();
	  
	  if (animations[currentAnimation])
	  	animations[currentAnimation].draw(attrs.x, attrs.y, attrs.width, attrs.height);
	  else ctx.drawImage(Pac.repository[resName], attrs.x, attrs.y, attrs.width, attrs.height);	
	  
	  if (polygon){
	  	ctx.save();
	  	ctx.fillStyle = 'rgba(250,0,0,0.5)';
			ctx.beginPath();
			ctx.moveTo(polygon[0].x, polygon[0].y);
			
			for (var i=1; i < polygon.length; i++)
				ctx.lineTo(polygon[i].x, polygon[i].y);
			
			ctx.closePath();
			ctx.fill();
			ctx.restore();
	  }
	  
	};
	
	this.hasPoint = function(point) {
		if (!polygon && !circle) 
			return Pac.math.pointInRectangle(attrs, point);
		else if(polygon) return Pac.math.pointInPolygon(polygon, point);
		else if(circle) return Pac.math.pointInCircle(circle, point);
	};
	
	this.fireEvent = function(type) {
		if (type === 'click')
			this.doAction();
	}
	
	this.addAnimation = function(name, opts) {
		if (!opts.resName) opts.resName = resName;
		opts.endCallback = function(){
			if (currentAnimation != 'iddle')
				currentAnimation = 'iddle';
		};
		
		animations[name] = new Pac.Animation(opts);
		return this;
	};
	
	this.setAnimation = function(animation) {//TODO: change this method name
		animations[currentAnimation].stop();
		currentAnimation = animation;
	};

	this.name = function(){
		return name;//TODO: remove this method
	};
	
	this.getActions = function(){
		return actions;//TODO: remove this method
	};
	
	this.removeAction = function(action){
		for (var act in actions){
			if (actions[act] === action){
				delete actions[act];
				break;
			}
		}
		
	};
	
	this.getAttrs = function(){
		return attrs;//TODO: remove this method
	};
	
	//Set Default Actions
	this.onAction('lookAt', { removeOnRun:false } );
};
