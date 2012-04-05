/*
 * user-controlled player. 
 */

Pac.Character = function(nameChar, resNameChar, options){
	var name = nameChar,
		resName = resNameChar || '',
		
		//array of obj owned by the char
		items = [],
		
		attrs = {
			x: (options && options.x) || 0,
			y: (options && options.y) || 0,
			width: (options && options.width) || 50,
			height: (options && options.height) || 50
		},
	
		handItem = {};
		
	this.update = function() {
		//update object state
	};
	
	this.draw = function() {
		//draw image obj
		var ctx = Pac.getContext();
		if (resName) {
		  ctx.drawImage(Pac.repository[resName], attrs.x, attrs.y, attrs.width, attrs.height);	
		}
		for(var i=0; i< items.length; i++){
			items[i].draw();
		}
	};
	
	this.pickUp = function(obj){
		//TODO: changing position, etc. should be part of the item.update() method
		if (items.indexOf(obj) !== -1){
			Pac.commandBar.log('Ya lo tengo...');
			return;
		}
		
		var lastX = (items.length * 50) + 20;
		
		obj.attrs.x = lastX + 50;
		obj.attrs.y = Pac.getHeight() - 60;
		obj.attrs.width = 50;
		obj.attrs.height = 50;
		
		items.push(obj);
	};
	
	this.getHand = function(){
		return handItem;
	};
	
	this.setHand = function(obj){
		handItem = obj;
	};
	
	this.clearHand = function(){
		handItem = null;
	};
	
	this.getInventory = function(){
		return items; //TODO: maybe should return a clone for security
	};

};

