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
		zIndex = (options && options.zIndex) || 2,
		handItem = {},
		inventory = new Pac.Inventory(),
		walkPath,
		animations = {},
		currentAnimation = 'idle',
		hasDiagonals = (options !== undefined && options.hasDiagonals !== undefined) ? options.hasDiagonals : false,
		lastDirection = 'idle',
		isWalking = false,
		onStopWalking = function(){};
		
	this.update = function() {
		inventory.update();
	
		var cAn = animations[currentAnimation];
		if (cAn){
			if (!cAn.isRunning()) cAn.start();
			else cAn.update();
		}	
		
		if (isWalking){
			
			var p = {
				x: attrs.x + attrs.width/2,
				y: attrs.y + attrs.height
			};
			
			var p2 = walkPath.nextPoint(p, 1.5);
			
			attrs.x = p2.x - (attrs.width/2);
			attrs.y = p2.y - attrs.height;
			
			if (walkPath.isOnTarget(p2)){
				isWalking = false;

				var cAn = animations[currentAnimation];
				if (cAn){
					if (cAn.isRunning()) cAn.stop();
				}	
				currentAnimation = 'idle';
				
				if (onStopWalking)
					onStopWalking();
			}
		}
	};
	
	this.draw = function() {
		//draw image obj
		var ctx = Pac.getContext();
	  if (animations[currentAnimation])
	  	animations[currentAnimation].draw(attrs.x, attrs.y, attrs.width, attrs.height);
	  else ctx.drawImage(Pac.repository[resName], 0, 0, attrs.width, attrs.height, attrs.x, attrs.y, attrs.width, attrs.height);	
		
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

	this.setPath = function(path){
		walkPath = path;
	};
	
	this.moveTo = function(point, onFinish){
		isWalking = true;
		currentAnimation = lastDirection;
		walkPath.moveTo(point);
		onStopWalking = onFinish;
	}

	
	this.getPosition = function(){
		return {
			x: attrs.x + attrs.width/2,
			y: attrs.y + attrs.height
		};
	};
	
	this.setPosition = function(point){
			attrs.x = point.x - (attrs.width/2);
			attrs.y = point.y - attrs.height;
	};
	
	this.getZIndex = function(){
		return zIndex;
	};
	
	this.addAnimation = function(name, opts) {
		if (!opts.resName) opts.resName = resName;
		
		animations[name] = new Pac.Animation(opts);
		return this;
	};
	
	this.onDirectionChange = function(dir, dir2){
		var cAn = animations[currentAnimation];
		if (cAn){
			if (cAn.isRunning()) cAn.stop();
		}
		
		switch (dir){
			case Pac.direction.UP:
				currentAnimation = 'up';
				if (hasDiagonals){
					currentAnimation += (dir2 === Pac.direction.RIGHT) ? '-right' : '-left';
				}
				break;
			case Pac.direction.DOWN:
				currentAnimation = 'down';
				if (hasDiagonals){
					currentAnimation += (dir2 === Pac.direction.RIGHT) ? '-right' : '-left';
				}
				break;
			case Pac.direction.RIGHT:
				currentAnimation = 'right';
				if (hasDiagonals){
					currentAnimation = (dir2 === Pac.direction.UP) ? 'up-' + currentAnimation : 'down-' + currentAnimation;
				}
				break;
			case Pac.direction.LEFT:
				currentAnimation = 'left';
				if (hasDiagonals){
					currentAnimation = (dir2 === Pac.direction.UP) ? 'up-' + currentAnimation : 'down-' + currentAnimation;
				}
				break;
		}
		
		lastDirection = currentAnimation;
	}

};

