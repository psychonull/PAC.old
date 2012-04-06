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
		inventory = new Pac.Inventory(),
		walkPath;
		
	this.update = function() {
		inventory.update();
	
		if (walkPath){
			
			var p = {
				x: attrs.x + attrs.width/2,
				y: attrs.y + attrs.height
			};
			
			var p2 = walkPath.nextPoint(p, 1.5);
			
			attrs.x = p2.x - (attrs.width/2);
			attrs.y = p2.y - attrs.height;
			
			if (walkPath.isOnTarget(p2)){
				walkPath = null;
			}
			
		}
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
		handIwalkTotem = obj;
	};
			
	this.clearHand = function(){
		handItem = null;
	};
	
	this.getInventory = function(){
		return inventory.getItems(); //TODO: maybe should return a clone for security
	};

	this.moveTo = function(path){
		walkPath = path;
		isWalking = true;
	}
	
	this.getPosition = function(){
		return {
			x: attrs.x + attrs.width/2,
			y: attrs.y + attrs.height
		};
	}

};

