/*
 * will be the bar in the bottom will handle actions, char's inventory, 
 * and maybe text outputs after actions are triggered
 */

Pac.TextManager = function(options){
	var currentText = '',
		elapsed = 0,
		currentDuration = 0,
		globalDuration = 0,
		writes = [],
		currDef = null,
		currentWrite = 0;

	var attrs = {
		x: (options && options.x) || 130,
		y: (options && options.y) || 380,
	};
	
	var font = options.font || 'normal 20px sans-serif';
	
	var newDeferred = function(){
		currDef = new Deferred();
		currDef.then(function(){
			currentWrite++;
		});
	};
	
	this.update = function(){
		if (writes[currentWrite]){
			currentText = writes[currentWrite].message;
			currentDuration = writes[currentWrite].duration;
		
			if(currentDuration){
				elapsed++;
				if (elapsed >= currentDuration){
					this.clear();
				}
			}
			else if(globalDuration){
				elapsed++;
				if (elapsed >= currentDuration){
					this.clear();
				}
			}	
		}
	};
	this.draw = function(){
		var ctx = Pac.getContext();
		ctx.save();
		ctx.fillStyle = 'black';
		ctx.textBaseline = 'top';
		ctx.font  = font;
		ctx.fillText(currentText, attrs.x + 20, attrs.y + 5);
		ctx.restore();
	};
	this.write = function(message, duration, options){
		writes = [];
		currentWrite = 0;
		
		newDeferred();
		return this.then(message, duration);
	};
	this.then = function(message, duration, options){
		writes.push({message: message, duration: duration});
		return this;
	};
	this.clear = function(){
		currentText = '';
		currentDuration = 0;
		elapsed = 0;

		if (currDef)
			currDef.resolve();
		
		if (currentWrite < writes.length) {
			newDeferred();
		}
	}
};
