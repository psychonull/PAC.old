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
		walkPath,
		animations = {},
		currentAnimation = 'idle';
		
	this.update = function() {
		inventory.update();
	
		var cAn = animations[currentAnimation];
		if (cAn){
			if (!cAn.isRunning()) cAn.start();
			else cAn.update();
		}	
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
				currentAnimation = 'idle';
			}
		}
	};
	
	this.draw = function() {
		//draw image obj
		var ctx = Pac.getContext();
	  if (animations[currentAnimation])
	  	animations[currentAnimation].draw(attrs.x, attrs.y, attrs.width, attrs.height);
	  else ctx.drawImage(Pac.repository[resName], attrs.x, attrs.y, attrs.width, attrs.height);	
		
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
	
	this.addAnimation = function(name, opts) {
		if (!opts.resName) opts.resName = resName;
		
		animations[name] = new Pac.Animation(opts);
		return this;
	};
	
	this.onDirectionChange = function(dir){
		switch (dir){
			case Pac.direction.UP:
				currentAnimation = 'up';
				break;
			case Pac.direction.DOWN:
				currentAnimation = 'down';
				break;
			case Pac.direction.RIGHT:
				currentAnimation = 'right';
				break;
			case Pac.direction.LEFT:
				currentAnimation = 'left';
				break;
		}
	}

};

