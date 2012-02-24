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
	this.polygone = undefined;
	this.actions = {};
	
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
	//update object state
};

Pac.Obj.prototype.draw = function() {
  var ctx = Pac.getContext();
  if (this.resName) {
    ctx.drawImage(Pac.repository[this.resName], this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);	
  }
  
};

Pac.Obj.prototype.hasPoint = function(point) {
	if (!this.polygone) 
		return Pac.math.pointInRectangle(this.attrs, point);
	else return Pac.math.pointInPolygon(this.polygone, point);
};

Pac.Obj.prototype.fireEvent = function(type) {
	if (type === 'click')
		this.doAction();
}




