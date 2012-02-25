/*
 * Game objects. i.e. apple
 * Actions can be performed on an object.
 */

Pac.Obj = function(name, resName, options){
	
	this.name = name || 'Unknown Object';
	
	this.attrs = {
		x: (options && options.x) || (Math.floor(Math.random() * Pac.getWidth()) - 50),
		y: (options && options.y) || (Math.floor(Math.random() * Pac.getHeight()) - 50),
		width: (options && options.width) || 50,
		height: (options && options.height) || 50
	};
	
	this.resName = resName || '';
	
	this.polygon = (options && options.polygon) || undefined;
	this.circle = (options && options.circle) || undefined;
	
	this.actions = {};
	this.animations = {};
	this.currentAnimation = 'iddle';
	
	//Set Default Actions
	this.onAction('lookAt', { removeOnRun:false } );

	Pac.events.attach(this, 'click');
};

Pac.Obj.prototype.onAction = function(name, opts) {
	this.actions[name] = new Pac.Action(this, name, opts);
	return this.actions[name];
};

Pac.Obj.prototype.doAction = function() {
	if (!this.actions.hasOwnProperty(Pac.currentAction))
		Pac.commandBar.log('I cannot do that');
	else if (this.actions[Pac.currentAction].isLocked){
		Pac.commandBar.log(this.actions[Pac.currentAction].lockedMsg);
	} else	{
		this.actions[Pac.currentAction].execute();
	}
};

Pac.Obj.prototype.update = function() {
	var cAn = this.animations[this.currentAnimation];
	if (cAn){
		if (!cAn.running) cAn.start();
		cAn.update();
	}
};

Pac.Obj.prototype.draw = function() {
  var ctx = Pac.getContext();
  
  if (this.animations[this.currentAnimation])
  	this.animations[this.currentAnimation].draw(this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);
  else ctx.drawImage(Pac.repository[this.resName], this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);	
  
  if (this.polygon){
  	ctx.save();
  	ctx.fillStyle = 'rgba(250,0,0,0.5)';
		ctx.beginPath();
		ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
		
		for (var i=1; i < this.polygon.length; i++)
			ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
		
		ctx.closePath();
		ctx.fill();
		ctx.restore();
  }
  
};

Pac.Obj.prototype.hasPoint = function(point) {
	if (!this.polygon && !this.circle) 
		return Pac.math.pointInRectangle(this.attrs, point);
	else if(this.polygon) return Pac.math.pointInPolygon(this.polygon, point);
	else if(this.circle) return Pac.math.pointInCircle(this.circle, point);
};

Pac.Obj.prototype.fireEvent = function(type) {
	if (type === 'click')
		this.doAction();
}

Pac.Obj.prototype.addAnimation = function(name, opts) {
	if (!opts.resName) opts.resName = this.resName;
	opts.obj = this;
	this.animations[name] = new Pac.Animation(opts);
	return this;
};

Pac.Obj.prototype.setAnimation = function(animation) {
	this.animations[this.currentAnimation].stop();
	this.currentAnimation = animation;
};


