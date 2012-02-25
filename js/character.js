/*
 * user-controlled player. 
 */

Pac.Character = function(name, resName, options){
	
	this.name = name;
	
	this.attrs = {
		x: (options && options.x) || 0,
		y: (options && options.y) || 0,
		width: (options && options.width) || 50,
		height: (options && options.height) || 50
	};
	
	this.resName = resName || '';
	
	//array of obj owned by the char
	this.items = [];
	
	this.handItem = {};
};

Pac.Character.prototype.update = function() {
	//update object state
};

Pac.Character.prototype.draw = function() {
	//draw image obj
	var ctx = Pac.getContext();
	if (this.resName) {
	  ctx.drawImage(Pac.repository[this.resName], this.attrs.x, this.attrs.y, this.attrs.width, this.attrs.height);	
	}
	for(var i=0; i< this.items.length; i++){
		this.items[i].draw();
	}
};

Pac.Character.prototype.pickUp = function(obj){
	//TODO: changing position, etc. should be part of the item.update() method
	if (this.items.indexOf(obj) !== -1){
		Pac.commandBar.log('Ya lo tengo...');
		return;
	}
	var lastX = (this.items.length * 50) + 20;
	
	obj.attrs.x = lastX + 50;
	obj.attrs.y = Pac.getHeight() - 60;
	obj.attrs.width = 50;
	obj.attrs.height = 50;
	this.items.push(obj);
};

Pac.Character.prototype.getHand = function(){
	return this.handItem;
};

Pac.Character.prototype.setHand = function(obj){
	this.handItem = obj;
};

Pac.Character.prototype.clearHand = function(){
	this.handItem = null;
};






