/*
 * will be the bar in the bottom will handle actions, char's inventory, 
 * and maybe text outputs after actions are triggered
 */

Pac.TextManager = function(options){
	var currentText = '',
		elapsed = 0,
		currentDuration = 0,
		globalDuration = 0;

	var attrs = {
		x: (options && options.x) || 130,
		y: (options && options.y) || 380,
	};
	
	var font = options.font || 'normal 20px sans-serif';
	
	this.update = function(){
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
		currentText = message;
		currentDuration = duration;
	};
	this.clear = function(){
		currentText = '';
		currentDuration = 0;
		elapsed = 0;
	}
};
