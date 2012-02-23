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
	
	var that = this;
	this.actions = {
		'lookAt': new Pac.Action({
				obj: this,
				removeOnRun: false,
				'consequences': [{type: 'showText'}] 
			})
	};
	
	Pac.events.attach(this, 'click');
};

Pac.Obj.prototype.onAction = function(action) {
	//TODO: if action typeof string -> add defaults.
	
	action.obj = this;
	this.actions[action.name] = new Pac.Action(action);
};

Pac.Obj.prototype.doAction = function() {
	if (!this.actions.hasOwnProperty(Pac.currentAction))
		Pac.commandBar.log('I cannot do that');
	else if (this.actions[Pac.currentAction].isLocked){
		Pac.commandBar.log(this.actions[Pac.currentAction].lockedMsg);
	} else	{
		this.actions[Pac.currentAction].run();
	}
};

Pac.Obj.prototype.setAction = function(action) {
	throw 'DEPRECATED: use onAction()';
	
	var that = this;
	
	switch(action){
		case 'pickUp':
			this.actions[action] = function(){
				Pac.getCharacter().pickUp(that);
				Pac.getCurrentScene().removeObj(that);
				delete that.actions[action];
			};
			break; 
	}
};

Pac.Obj.prototype.fireAction = function() {
	throw 'DEPRECATED: use doAction()';
	
	if (!this.actions.hasOwnProperty(Pac.currentAction))
		Pac.commandBar.log('I cannot do that');
	else {
		this.actions[Pac.currentAction]();
	}
};

Pac.Obj.prototype.update = function() {
	//update object state
};

Pac.Obj.prototype.draw = function() {
  var ctx = Pac.getContext();
  if (this.resName) {
    ctx.drawImage(Pac.Repository[this.resName], this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);	
  }
  
};

