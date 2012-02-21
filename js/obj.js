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
		'lookAt': function(){ Pac.commandBar.log(that.name); }
	};
	
	Pac.events.attach(this, 'click');
};

Pac.Obj.prototype.setAction = function(action) {
	var that = this;
	
	switch(action){
		case 'pickUp':
			this.actions[action] = function(){
				//delete this.actions[action];
				Pac.getCharacter().pickUp(that);
				//Pac.getCurrentScene().removeObj(this);
			};
			break; 
	}
}

Pac.Obj.prototype.fireAction = function() {
	if (!this.actions.hasOwnProperty(Pac.currentAction))
		Pac.commandBar.log('I cannot do that');
	else {
		this.actions[Pac.currentAction]();
	}
}

Pac.Obj.prototype.update = function() {
	//update object state
}

Pac.Obj.prototype.draw = function() {
  var ctx = Pac.getContext();
  if (!Pac.Repository[this.resName]) {
  	// don't draw but take into account for event handling  	
  }
  else {
    ctx.drawImage(Pac.Repository[this.resName], this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);	
  }
  
}
