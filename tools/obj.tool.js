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
	this.isTemp = true;
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
  var ctx = Pac.getContext();
  if (this.resName) {
    ctx.drawImage(Pac.Repository[this.resName],this.attrs.x,this.attrs.y, this.attrs.width, this.attrs.height);	
  }
    ctx.strokeStyle = "rgb(200,0,0)";  
 	ctx.strokeRect (this.attrs.x,this.attrs.y, this.attrs.width, this.attrs.height);  
  
}
