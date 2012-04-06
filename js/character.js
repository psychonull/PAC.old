/*
 * user-controlled player. 
 */

Pac.Character = function(nameChar, resNameChar, options){
	var name = nameChar,
		resName = resNameChar || '',
		
		attrs = {
			x: (options && options.x) || 0,
			y: (options && options.y) || 0,
			width: (options && options.width) || 50,
			height: (options && options.height) || 50
		},
	
		handItem = {},
		inventory = new Pac.Inventory();
		
	this.update = function() {
		inventory.update();
	};
	
	this.draw = function() {
		//draw image obj
		var ctx = Pac.getContext();
		if (resName) {
		  ctx.drawImage(Pac.repository[resName], attrs.x, attrs.y, attrs.width, attrs.height);	
		}
		
		inventory.draw();
	};
	
	this.pickUp = function(obj){
		inventory.add(obj);
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
		return inventory.getItems(); //TODO: maybe should return a clone for security
	};

};

